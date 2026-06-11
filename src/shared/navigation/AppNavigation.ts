import {
	StackActions,
	type NavigationContainerRef,
} from '@react-navigation/native';
import { NavigationReadyError } from './NavigationReadyError.ts';
import type {
	AppRouteParamList,
	AuthNavigationStackParamList,
	MainNavigationStackParamList,
	RootStackParamList,
} from './navigationStackParamList';

type Navigation = NavigationContainerRef<RootStackParamList>;
type RootStackName = keyof RootStackParamList;

type NestedStackParamList = {
	Auth: AuthNavigationStackParamList;
	Main: MainNavigationStackParamList;
};

const ROOT_STACKS: ReadonlySet<string> = new Set(['Auth', 'Main']);

const isRootStackName = (value: string): value is RootStackName =>
	ROOT_STACKS.has(value);

/**
 * Сервис глобальной навигации приложения.
 *
 * Позволяет выполнять навигацию из любого места кодовой базы — thunks, features,
 * entities, утилиты — без использования React-хуков (`useNavigation`).
 *
 * Работает через ref корневого {@link NavigationContainer}, который устанавливается
 * один раз в `App.tsx` через {@link AppNavigation.setNavigationRef}.
 *
 * Структура навигации приложения:
 * ```
 * Root (Auth | Main)
 *   ├── Auth → LogIn, ...
 *   └── Main → Home, ...
 * ```
 *
 * Все публичные методы типизированы на основе `RootStackParamList` и вложенных
 * стеков `AuthNavigationStackParamList` / `MainNavigationStackParamList`.
 *
 * @example
 * ```ts
 * import { appNavigation } from '@shared/navigation/AppNavigation';
 *
 * // После успешного логина
 * appNavigation.replace('Main', 'Home');
 *
 * // Logout
 * appNavigation.reset('Auth', 'LogIn');
 * ```
 */
class AppNavigation {
	private navigation: Navigation | undefined;

	/**
	 * Привязывает ref корневого `NavigationContainer` к сервису.
	 *
	 * Вызывается один раз при монтировании `RootNavigator` в `App.tsx`.
	 * Без установленного ref любой вызов навигационных методов выбросит
	 * {@link NavigationReadyError}.
	 *
	 * @param navigationRef - Ref из `NavigationContainer` или `null` при размонтировании.
	 * При передаче `null` ref не сбрасывается — сохраняется последний валидный ref.
	 *
	 * @example
	 * ```tsx
	 * <RootNavigator
	 *   ref={ref => {
	 *     appNavigation.setNavigationRef(ref);
	 *   }}
	 * />
	 * ```
	 */
	setNavigationRef(
		navigationRef: NavigationContainerRef<RootStackParamList> | null,
	) {
		if (navigationRef) {
			this.navigation = navigationRef;
		}
	}

	/**
	 * Переходит на указанный экран, **добавляя** его в историю навигации.
	 *
	 * Поддерживает два режима вызова:
	 *
	 * **1. Навигация внутри текущего root-стека** — передаётся только имя экрана.
	 * Активный стек (`Auth` или `Main`) определяется автоматически через
	 * {@link AppNavigation.getCurrentRootStack}.
	 *
	 * **2. Явная навигация в конкретный root-стек** — передаётся стек, экран
	 * и опционально параметры.
	 *
	 * В отличие от {@link AppNavigation.replace}, текущий экран остаётся в истории
	 * и пользователь может вернуться назад через {@link AppNavigation.goBack}.
	 *
	 * @throws {NavigationReadyError} Если навигация не готова (`ref` не установлен
	 * или `isReady() === false`), либо текущий root-стек не определён (режим 1).
	 *
	 * @overload Навигация внутри текущего активного стека.
	 * @example
	 * ```ts
	 * // Если сейчас активен Main-стек
	 * appNavigation.navigate('Home');
	 *
	 * // Если сейчас активен Auth-стек
	 * appNavigation.navigate('LogIn');
	 * ```
	 *
	 * @overload Явная навигация в указанный root-стек и экран.
	 * @example
	 * ```ts
	 * // Перейти на LogIn, сохранив Main в истории (можно вернуться назад)
	 * appNavigation.navigate('Auth', 'LogIn');
	 *
	 * // Перейти на Home из любого места
	 * appNavigation.navigate('Main', 'Home');
	 * ```
	 */
	navigate<T extends keyof AppRouteParamList>(
		screen: T,
		params?: AppRouteParamList[T],
	): void;
	navigate<
		Stack extends RootStackName,
		Screen extends keyof NestedStackParamList[Stack],
	>(
		stack: Stack,
		screen: Screen,
		params?: NestedStackParamList[Stack][Screen],
	): void;
	navigate(
		screenOrStack: keyof AppRouteParamList | RootStackName,
		screenOrParams?: keyof AppRouteParamList | object,
		params?: object,
	): void {
		const navigation = this.getNavigation();

		if (isRootStackName(screenOrStack)) {
			const stack = screenOrStack;
			const screen =
				screenOrParams as keyof NestedStackParamList[typeof stack];
			const screenParams = params;

			if (screenParams !== undefined) {
				navigation.navigate(stack, {
					screen,
					params: screenParams,
				} as never);
			} else {
				navigation.navigate(stack, { screen } as never);
			}

			return;
		}

		const stack = this.getCurrentRootStack();

		if (!stack) {
			throw new NavigationReadyError(
				new Error('Current root stack is not defined'),
			);
		}

		const screen = screenOrStack;
		const screenParams = screenOrParams;

		if (screenParams !== undefined) {
			navigation.navigate(stack, {
				screen,
				params: screenParams,
			} as never);
		} else {
			navigation.navigate(stack, { screen } as never);
		}
	}

	/**
	 * Заменяет текущий экран **без добавления** в историю навигации.
	 *
	 * Поддерживает два режима вызова:
	 *
	 * **1. Замена экрана внутри текущего nested-стека** — передаётся только имя
	 * экрана. Замена выполняется внутри активного стека (`Auth` или `Main`),
	 * root-уровень не меняется.
	 *
	 * **2. Замена root-стека целиком** — передаётся имя стека (`Auth` / `Main`),
	 * целевой экран и опционально параметры. Текущий root-экран удаляется
	 * из истории — вернуться на него через `goBack()` нельзя.
	 *
	 * Типичные сценарии:
	 * - `replace('Main', 'Home')` — после логина, чтобы нельзя было вернуться на Auth.
	 * - `replace('LogIn')` — замена экрана внутри Auth-стека (если он активен).
	 *
	 * @throws {NavigationReadyError} Если навигация не готова, текущий root-стек
	 * не определён (режим 1) или не найден key вложенного навигатора (режим 1).
	 *
	 * @overload Замена экрана внутри текущего активного nested-стека.
	 * @example
	 * ```ts
	 * // Заменить текущий экран Auth-стека на LogIn
	 * appNavigation.replace('LogIn');
	 * ```
	 *
	 * @overload Замена root-стека с переходом на указанный экран.
	 * @example
	 * ```ts
	 * // После логина: Main/Home вместо Auth, без возможности вернуться назад
	 * appNavigation.replace('Main', 'Home');
	 * ```
	 */
	replace<T extends keyof AppRouteParamList>(
		screen: T,
		params?: AppRouteParamList[T],
	): void;
	replace<
		Stack extends RootStackName,
		Screen extends keyof NestedStackParamList[Stack],
	>(
		stack: Stack,
		screen: Screen,
		params?: NestedStackParamList[Stack][Screen],
	): void;
	replace(
		screenOrStack: keyof AppRouteParamList | RootStackName,
		screenOrParams?: keyof AppRouteParamList | object,
		params?: object,
	): void {
		const navigation = this.getNavigation();

		if (isRootStackName(screenOrStack)) {
			const stack = screenOrStack;
			const screen =
				screenOrParams as keyof NestedStackParamList[typeof stack];
			const screenParams = params;

			if (screenParams !== undefined) {
				navigation.dispatch(
					StackActions.replace(stack, {
						screen,
						params: screenParams,
					}),
				);
			} else {
				navigation.dispatch(StackActions.replace(stack, { screen }));
			}

			return;
		}

		const stack = this.getCurrentRootStack();

		if (!stack) {
			throw new NavigationReadyError(
				new Error('Current root stack is not defined'),
			);
		}

		const targetKey = this.getNestedNavigatorKey(stack);

		if (!targetKey) {
			throw new NavigationReadyError(
				new Error('Nested navigator key is not defined'),
			);
		}

		const screen = screenOrStack;
		const screenParams = screenOrParams as object | undefined;

		navigation.dispatch({
			...(screenParams !== undefined
				? StackActions.replace(screen, screenParams)
				: StackActions.replace(screen)),
			target: targetKey,
		});
	}

	/**
	 * Возвращает пользователя на предыдущий экран в истории навигации.
	 *
	 * Делегирует вызов `navigation.goBack()` корневому `NavigationContainer`.
	 * Поведение зависит от текущей истории: может вернуть на предыдущий экран
	 * внутри nested-стека или на предыдущий root-стек.
	 *
	 * Если истории нет, React Navigation проигнорирует действие без ошибки.
	 *
	 * @throws {NavigationReadyError} Если навигация не готова.
	 *
	 * @example
	 * ```ts
	 * appNavigation.goBack();
	 * ```
	 */
	goBack() {
		this.getNavigation().goBack();
	}

	/**
	 * Полностью сбрасывает дерево навигации и устанавливает единственный маршрут.
	 *
	 * Вся предыдущая история удаляется — пользователь не сможет вернуться
	 * ни на один из ранее посещённых экранов через `goBack()`.
	 *
	 * Типичный сценарий: **logout** — сброс на `Auth` с экраном `LogIn`.
	 *
	 * @param stack - Root-стек, который станет единственным в дереве навигации (`Auth` или `Main`).
	 * @param screen - Опционально: конкретный экран внутри nested-стека.
	 * Если не указан, откроется `initialRouteName` навигатора (`LogIn` для Auth, `Home` для Main).
	 * @param params - Опционально: типизированные параметры целевого экрана.
	 *
	 * @throws {NavigationReadyError} Если навигация не готова.
	 *
	 * @example
	 * ```ts
	 * // Logout: полный сброс на экран входа
	 * appNavigation.reset('Auth', 'LogIn');
	 *
	 * // Сброс на Main со стартовым экраном Home (initialRouteName)
	 * appNavigation.reset('Main');
	 * ```
	 */
	reset<
		Stack extends RootStackName,
		Screen extends keyof NestedStackParamList[Stack],
	>(
		stack: Stack,
		screen?: Screen,
		params?: NestedStackParamList[Stack][Screen],
	) {
		const navigation = this.getNavigation();

		if (screen !== undefined) {
			const routeParams =
				params !== undefined ? { screen, params } : { screen };

			navigation.resetRoot({
				index: 0,
				routes: [{ name: stack, params: routeParams }],
			});

			return;
		}

		navigation.resetRoot({
			index: 0,
			routes: [{ name: stack }],
		});
	}

	/**
	 * Возвращает имя текущего активного root-стека.
	 *
	 * Читает состояние корневого навигатора через `getRootState()` и возвращает
	 * `name` активного route верхнего уровня.
	 *
	 * Метод **не выполняет навигацию** — только читает состояние.
	 * Безопасен для вызова из бизнес-логики для условных проверок.
	 *
	 * @returns `'Auth'` — активен auth-флоу; `'Main'` — активен main-флоу;
	 * `undefined` — навигация ещё не готова (`ref` не установлен или `isReady() === false`).
	 *
	 * @example
	 * ```ts
	 * const stack = appNavigation.getCurrentRootStack();
	 *
	 * if (stack === 'Auth') {
	 *   // пользователь не авторизован
	 * }
	 * ```
	 */
	getCurrentRootStack(): RootStackName | undefined {
		if (!this.navigation?.isReady()) {
			return undefined;
		}

		const state = this.navigation.getRootState();
		const route = state.routes[state.index ?? 0];
		const name = route?.name;

		if (!name || !isRootStackName(name)) {
			return undefined;
		}

		return name;
	}

	/**
	 * Возвращает готовый к использованию ref навигации.
	 *
	 * @throws {NavigationReadyError} Если ref не установлен или `isReady() === false`.
	 */
	private getNavigation(): Navigation {
		if (!this.navigation?.isReady()) {
			throw new NavigationReadyError(
				new Error('Navigation is not ready'),
			);
		}

		return this.navigation;
	}

	/**
	 * Возвращает `key` вложенного навигатора для указанного root-стека.
	 *
	 * Используется в {@link AppNavigation.replace} для dispatch replace-действия
	 * внутри nested-стека (а не на root-уровне).
	 *
	 * @param stack - Имя root-стека (`Auth` или `Main`).
	 * @returns Key вложенного навигатора или `undefined`, если стек не найден в state.
	 */
	private getNestedNavigatorKey(stack: RootStackName): string | undefined {
		const state = this.getNavigation().getRootState();
		const route = state.routes.find(({ name }) => name === stack);

		return route?.state?.key;
	}
}

/**
 * Singleton-экземпляр {@link AppNavigation} для использования по всему приложению.
 *
 * Импортируйте напрямую там, где нужна навигация вне React-компонентов:
 * thunks, middleware, сервисы, утилиты.
 *
 * @example
 * ```ts
 * import { appNavigation } from '@shared/navigation/AppNavigation';
 *
 * appNavigation.navigate('Auth', 'LogIn');
 * ```
 */
export const appNavigation = new AppNavigation();

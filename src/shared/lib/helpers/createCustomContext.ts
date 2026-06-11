import { Context, createContext, Provider, useContext } from 'react';

/**
 * Создаёт типизированный хук для чтения переданного React-контекста.
 * Выбрасывает ошибку, если хук вызван вне `Provider`.
 *
 * @typeParam T - Тип значения контекста
 * @param context - React-контекст, созданный через `createContext`
 * @returns Хук, возвращающий значение контекста
 */
export const createContextGetter = <T>(context: Context<T | undefined>) => {
	return (): T => {
		const contextValue = useContext(context);

		if (!contextValue) {
			throw new Error(
				`this hook must be used with ${context.displayName || 'proper context'}`,
			);
		}

		return contextValue;
	};
};

/**
 * Создаёт типизированный React-контекст с `Provider` и хуком для чтения значения.
 *
 * @typeParam T - Тип значения контекста
 * @returns Кортеж `[Provider, useContext]`. Оборачивайте потомков в `Provider`,
 * затем вызывайте хук для получения значения контекста.
 *
 * @example
 * const [ThemeProvider, useTheme] = createCustomContext<'light' | 'dark'>();
 *
 * <ThemeProvider value="dark">
 *   <Screen />
 * </ThemeProvider>
 */
export const createCustomContext = <T>(): [Provider<T>, () => T] => {
	const context = createContext<T | undefined>(undefined);
	const useContextGetter = createContextGetter(context);

	return [context.Provider, useContextGetter] as [Provider<T>, () => T];
};

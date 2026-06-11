import {
	useNavigation,
	useRoute,
	type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
	AppRouteParamList,
	AuthNavigationStackParamList,
	MainNavigationStackParamList,
	RootStackParamList,
} from 'src/shared/navigation/navigationStackParamList';

type AppStackParamListMap = {
	auth: AuthNavigationStackParamList;
	main: MainNavigationStackParamList;
};

type AppStackName = keyof AppStackParamListMap;

const useAppNavigation = <T extends AppStackName>(
	_stack: T,
): NativeStackNavigationProp<AppStackParamListMap[T]> =>
	useNavigation<NativeStackNavigationProp<AppStackParamListMap[T]>>();

// Navigation hooks

/**
 * Navigation hook for the auth stack.
 * Use inside screens rendered by `AuthNavigator`.
 *
 * @example
 * const { navigate } = useAuthNavigation();
 * navigate('LogIn');
 */
export const useAuthNavigation = () => useAppNavigation('auth');

/**
 * Navigation hook for the main stack.
 * Use inside screens rendered by `MainNavigator`.
 *
 * @example
 * const { navigate } = useMainNavigation();
 * navigate('Home');
 */
export const useMainNavigation = () => useAppNavigation('main');

/**
 * Navigation hook for the root stack.
 * Use when switching between `Auth` and `Main` navigators.
 *
 * @example
 * const { navigate } = useRootNavigation();
 * navigate('Auth', { screen: 'LogIn' });
 */
export const useRootNavigation =
	(): NativeStackNavigationProp<RootStackParamList> =>
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

/**
 * Route hook with typed screen params.
 * Pass the current screen name as a generic.
 *
 * @typeParam T - Screen name from `AppRouteParamList`
 *
 * @example
 * const { params } = useAppRoute<'LogIn'>();
 */
export const useAppRoute = <T extends keyof AppRouteParamList>() => {
	return useRoute<RouteProp<AppRouteParamList, T>>();
};

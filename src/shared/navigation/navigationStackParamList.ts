import type { NavigatorScreenParams } from '@react-navigation/native';

// Params

export type AppRouteParamList = AuthNavigationStackParamList
	& MainNavigationStackParamList;

// Root

export type RootStackParamList = {
	Auth: NavigatorScreenParams<AuthNavigationStackParamList>;
	Main: NavigatorScreenParams<MainNavigationStackParamList>;
};

// Auth

export type AuthNavigationStackParamList = {
	LogIn: undefined;
};

// Main

export type MainNavigationStackParamList = {
	Home: undefined;
};

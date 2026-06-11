import { ComponentType } from 'react';
import { RootStackParamList } from '@shared/navigation/navigationStackParamList';
import { AuthNavigator } from '../auth/AuthNavigator';
import { MainNavigator } from '../main/MainNavigator';

type IRootRoute = {
	name: keyof RootStackParamList;
	component: ComponentType;
};

export const rootRoutes: IRootRoute[] = [
	{
		name: 'Auth',
		component: AuthNavigator,
	},
	{
		name: 'Main',
		component: MainNavigator,
	},
];

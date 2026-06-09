import { ComponentType } from 'react';
import { RootStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { AuthNavigator } from '../auth/AuthNavigator.tsx';
import { MainNavigator } from '../main/MainNavigator.tsx';

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

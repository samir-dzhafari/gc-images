import { ComponentType } from 'react';
import { MainNavigationStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { AuthNavigator } from '../auth/AuthNavigator.tsx';

type IMainRoute = {
	name: keyof MainNavigationStackParamList;
	component: ComponentType;
};

export const mainRoutes: IMainRoute[] = [
	{
		name: 'Home',
		component: AuthNavigator,
	},
];

import { ComponentType } from 'react';
import { MainNavigationStackParamList } from '@shared/navigation/navigationStackParamList';
import { AuthNavigator } from '../auth/AuthNavigator';

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

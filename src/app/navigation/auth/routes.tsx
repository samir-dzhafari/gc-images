import { ComponentType } from 'react';
import { AuthNavigationStackParamList } from '@shared/navigation/navigationStackParamList';
import { AuthNavigator } from '../auth/AuthNavigator';

type IAuthRoute = {
	name: keyof AuthNavigationStackParamList;
	component: ComponentType;
};

export const authRoutes: IAuthRoute[] = [
	{
		name: 'LogIn',
		component: AuthNavigator,
	},
];

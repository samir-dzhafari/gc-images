import { ComponentType } from 'react';
import { AuthNavigationStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { AuthNavigator } from '../auth/AuthNavigator.tsx';

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

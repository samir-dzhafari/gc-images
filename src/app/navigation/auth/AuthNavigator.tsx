import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigationStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { authRoutes } from './routes.tsx';

const Stack = createNativeStackNavigator<AuthNavigationStackParamList>();

export function AuthNavigator() {
	return (
		<Stack.Navigator initialRouteName='LogIn'>
			{authRoutes.map(route => (
				<Stack.Screen
					key={route.name}
					{...route}
				/>
			))}
		</Stack.Navigator>
	);
}

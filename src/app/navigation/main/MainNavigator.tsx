import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainNavigationStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { mainRoutes } from './routes.tsx';

const Stack = createNativeStackNavigator<MainNavigationStackParamList>();

export function MainNavigator() {
	return (
		<Stack.Navigator initialRouteName='Home'>
			{mainRoutes.map(route => (
				<Stack.Screen
					key={route.name}
					{...route}
				/>
			))}
		</Stack.Navigator>
	);
}

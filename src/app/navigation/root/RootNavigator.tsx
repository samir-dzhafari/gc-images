import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/navigation/navigationStackParamList.ts';
import { rootRoutes } from './routes.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Main'
				screenOptions={{ headerShown: false }}
			>
				{rootRoutes.map(route => (
					<Stack.Screen
						key={route.name}
						{...route}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

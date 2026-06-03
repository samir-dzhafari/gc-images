import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@app/navigation/types';
import { HomeScreen } from '@pages/home/HomeScreen';
import { LogIn } from '@pages/auth/LogIn/LogIn';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
			<Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Вход' }} />
		</Stack.Navigator>
	);
}

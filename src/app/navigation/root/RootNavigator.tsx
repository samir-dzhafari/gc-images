import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/navigation/navigationStackParamList';
import { rootRoutes } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: ForwardRefRenderFunction<
	NavigationContainerRef<RootStackParamList>
> = (_, ref) => {
	return (
		<NavigationContainer ref={ref}>
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
};

export default forwardRef(RootNavigator);

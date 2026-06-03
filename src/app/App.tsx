import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { RootNavigator } from '@app/navigation/RootNavigator';
import { AppProviders } from '@app/providers';

export function App() {
	return (
		<AppProviders>
			<NavigationContainer>
				<RootNavigator />
				<StatusBar barStyle='light-content' />
			</NavigationContainer>
		</AppProviders>
	);
}

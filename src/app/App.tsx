import { StyleSheet } from 'react-native';
import { appNavigation } from '@shared/navigation/AppNavigation';
import RootNavigator from './navigation/root/RootNavigator.tsx';
import { AppProviders } from './providers';

export function App() {
	return (
		<AppProviders>
			<RootNavigator
				ref={ref => {
					appNavigation.setNavigationRef(ref);
				}}
			/>
		</AppProviders>
	);
}

const styles = StyleSheet.create({});

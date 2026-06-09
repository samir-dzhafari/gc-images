import { RootNavigator } from './navigation/root/RootNavigator.tsx';
import { AppProviders } from './providers';

export function App() {
	return (
		<AppProviders>
			<RootNavigator />
		</AppProviders>
	);
}

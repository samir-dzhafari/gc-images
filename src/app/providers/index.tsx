import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import '@shared/lib/i18n';
import { store } from '../store/store';
import { I18nProvider } from './I18nProvider';
import { PersistProvider } from './PersistProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistProvider>
				<I18nProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</I18nProvider>
			</PersistProvider>
		</Provider>
	);
};

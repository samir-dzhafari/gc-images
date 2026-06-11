import { AppTheme, StorageTheme } from '../../../styles/themes';
import { createCustomContext } from '../../helpers/createCustomContext';

export interface ThemeContext {
	theme: AppTheme;
	changeTheme: (theme: StorageTheme) => void;
	toggleTheme: () => void;
	storageTheme: StorageTheme;
}

export const [ContextProvider, useAppTheme] =
	createCustomContext<ThemeContext>();

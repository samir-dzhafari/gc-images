import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';
import {
	selectSettingsTheme,
	setTheme,
} from '@entities/settings/model/settingsSlice.ts';
import { ContextProvider } from '@shared/lib/providers/theme/themeContext.ts';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks.ts';
import type { AppTheme, StorageTheme } from '@shared/styles/themes';

const getDefaultTheme = (theme: ColorSchemeName) =>
	theme === 'dark' ? 'dark' : 'light';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const storageTheme = useAppSelector(selectSettingsTheme);
	const colorScheme = useColorScheme();

	const theme: AppTheme =
		storageTheme === 'system'
			? getDefaultTheme(colorScheme)
			: (storageTheme as AppTheme);

	const changeTheme = useCallback(
		(nextTheme: StorageTheme) => {
			dispatch(setTheme(nextTheme));
		},
		[dispatch],
	);

	const toggleTheme = useCallback(() => {
		dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
	}, [dispatch, theme]);

	const value = useMemo(
		() => ({
			theme,
			storageTheme,
			changeTheme,
			toggleTheme,
		}),
		[theme, storageTheme, changeTheme, toggleTheme],
	);

	return <ContextProvider value={value}>{children}</ContextProvider>;
};

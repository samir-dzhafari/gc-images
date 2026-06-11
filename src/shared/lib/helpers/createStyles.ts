import { useMemo } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, themes } from '../../styles/themes.ts';
import { useAppTheme } from '../providers/theme/themeContext.ts';

type StyleOptions = {
	theme: Theme;
	insets: EdgeInsets;
};

type FunctionStyles<T> = (theme: StyleOptions, ...args: any[]) => T;
type UseStyles<T> = (...args: any[]) => T;

export const createStyles = <T extends Object>(
	stylesCb: FunctionStyles<T>,
): UseStyles<T> => {
	return (...args) => {
		const { theme } = useAppTheme();
		const insets = useSafeAreaInsets();

		return useMemo(() => {
			return stylesCb(
				{
					theme: theme === 'dark' ? themes.dark : themes.light,
					insets,
				},
				...args,
			);
		}, [theme, insets, args]);
	};
};

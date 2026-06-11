// Types

export type Theme = {
	background: {
		primary: string;
	};
	text: {
		primary: string;
		secondary: string;
		dark: string;
		hint: string;
	};
	divider: string;
};

export type AppTheme = 'light' | 'dark';
export type StorageTheme = AppTheme | 'system';

// Static colors

const staticColors = {
	black: '#000000',
	white: '#ffffff',
} as const;

export type StaticColors = typeof staticColors;

export type Themes = {
	light: Theme;
	dark: Theme;
	static: {
		color: StaticColors;
	};
};

// Theme

const lightTheme: Theme = {
	background: {
		primary: '#FFFFFF',
	},
	text: {
		primary: '#364152',
		secondary: '#697586',
		dark: '#121926',
		hint: '#EEF2F6',
	},
	divider: '#E3E8EF',
};

const darkTheme: Theme = {
	background: {
		primary: '#FFFFFF',
	},
	text: {
		primary: '#364152',
		secondary: '#697586',
		dark: '#121926',
		hint: '#EEF2F6',
	},
	divider: '#E3E8EF',
};

export const themes = {
	light: lightTheme,
	dark: darkTheme,
	static: {
		color: staticColors,
	},
} satisfies Themes;

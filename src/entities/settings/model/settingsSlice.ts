import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { defaultLocale, type AppLocale } from '@shared/lib/i18n/types';
import { RootState } from '@shared/store/hooks';
import type { StorageTheme } from '@shared/styles/themes';

type SettingsState = {
	theme: StorageTheme;
	locale: AppLocale;
};

const initialState: SettingsState = {
	theme: 'light',
	locale: defaultLocale,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<StorageTheme>) {
			state.theme = action.payload;
		},
		setLocale(state, action: PayloadAction<AppLocale>) {
			state.locale = action.payload;
		},
	},
	// extraReducers: builder => {
	// 	builder.addCase('authSlice/logOut', () => {
	// 		return initialState;
	// 	});
	// },
});

// Actions
export const { setTheme, setLocale } = settingsSlice.actions;

// Selectors
export const selectSettingsTheme = (state: RootState) =>
	state.settingsSlice.theme;
export const selectSettingsLocale = (state: RootState) =>
	state.settingsSlice.locale;

// Reducer
export default settingsSlice.reducer;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import { defaultLocale } from './types';

void i18n.use(initReactI18next).init({
	resources: {
		ru: { translation: ru },
		en: { translation: en },
	},
	lng: defaultLocale,
	fallbackLng: defaultLocale,
	interpolation: {
		escapeValue: false,
	},
	compatibilityJSON: 'v4',
});

export { i18n };
export { useTranslation } from 'react-i18next';
export {
	defaultLocale,
	supportedLocales,
	type AppLocale,
	type TranslationResources,
} from './types';

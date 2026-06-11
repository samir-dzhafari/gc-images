import type ru from './locales/ru.json';

export const defaultLocale = 'ru' as const;
export const supportedLocales = ['ru', 'en'] as const;

export type AppLocale = (typeof supportedLocales)[number];
export type TranslationResources = typeof ru;

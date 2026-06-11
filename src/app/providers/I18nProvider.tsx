import { FC, PropsWithChildren, useEffect } from 'react';
import { selectSettingsLocale } from '@entities/settings/model/settingsSlice';
import { i18n } from '@shared/lib/i18n';
import { useAppSelector } from '@shared/store/hooks';

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
	const locale = useAppSelector(selectSettingsLocale);

	useEffect(() => {
		if (i18n.language !== locale) {
			void i18n.changeLanguage(locale);
		}
	}, [locale]);

	return children;
};

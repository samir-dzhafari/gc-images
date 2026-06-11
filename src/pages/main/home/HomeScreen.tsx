import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@shared/lib/i18n';
import { useAppTheme } from '@shared/lib/providers/theme/themeContext';
import { themes } from '@shared/styles/themes';

export function HomeScreen() {
	const { t } = useTranslation();
	const { theme, storageTheme, changeTheme, toggleTheme } = useAppTheme();

	themes.static.color;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{t('home.editHint')}</Text>
			<Text style={styles.text}>{t('home.title')}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
	},
});

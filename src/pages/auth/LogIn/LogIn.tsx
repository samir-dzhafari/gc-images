import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@shared/lib/i18n';
import { useAuthNavigation } from '@shared/navigation/navigationHooks';

export function LogIn() {
	const { t } = useTranslation();
	const { navigate } = useAuthNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{t('common.login')}</Text>
			<Pressable onPress={() => navigate('LogIn')}>
				<Text style={styles.text}>{t('common.goToRegister')}</Text>
			</Pressable>
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

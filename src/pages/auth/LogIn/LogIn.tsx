import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuthNavigation } from '@shared/navigation/appNavigation.tsx';

export function LogIn() {
	const { navigate } = useAuthNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Log in</Text>
			<Pressable onPress={() => navigate('LogIn')}>
				Go to Register
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

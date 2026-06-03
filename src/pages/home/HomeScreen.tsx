import { StyleSheet, Text, View } from 'react-native';

export function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text>Edit src/pages/home/HomeScreen.tsx to edit this screen.</Text>
			<Text style={styles.text}>Home screen</Text>
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

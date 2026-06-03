module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					'@app': './src/app',
					'@pages': './src/pages',
					'@widgets': './src/widgets',
					'@features': './src/features',
					'@entities': './src/entities',
					'@shared': './src/shared',
					'@assets': './assets',
				},
				extensions: [
					'.ios.js',
					'.android.js',
					'.js',
					'.jsx',
					'.ts',
					'.tsx',
					'.json',
				],
			},
		],
		'react-native-reanimated/plugin',
	],
};

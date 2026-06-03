import baseConfig from '@ssheverev/eslint-config';

export default [
	{
		ignores: [
			'android/**',
			'ios/**',
			'node_modules/**',
			'coverage/**',
			'babel.config.js',
			'metro.config.js',
			'jest.config.js',
			'index.js',
		],
	},
	...baseConfig,
];

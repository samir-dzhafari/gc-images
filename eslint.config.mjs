import baseConfig from '@ssheverev/eslint-config';
import { fsdBoundariesConfig } from './eslint/fsd-boundaries.mjs';
import { sameAliasRelativeConfig } from './eslint/same-alias-relative.mjs';
import { typescriptConfig } from './eslint/typescript.mjs';

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
	...typescriptConfig,
	...fsdBoundariesConfig,
	...sameAliasRelativeConfig,
	{
		rules: {
			'simple-import-sort/imports': 'off',
		},
	},
];

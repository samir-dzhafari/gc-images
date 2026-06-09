import tsParser from '@typescript-eslint/parser';

/** TS/TSX: parser + relax import rules that break on react-native Flow types. */
export const typescriptConfig = [
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			'import/no-deprecated': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'stylistic/jsx-quotes': 'off',
		},
	},
];

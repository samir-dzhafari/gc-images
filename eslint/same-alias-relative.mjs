/** @type {import('eslint').Linter.Config[]} */
export const sameAliasRelativeConfig = [
	'app',
	'pages',
	'widgets',
	'features',
	'entities',
	'shared',
	'assets',
].map(layer => ({
	files: [`src/${layer}/**/*.{ts,tsx}`],
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: [`@${layer}`, `@${layer}/*`],
						message: `Use relative imports within the @${layer} layer.`,
					},
				],
			},
		],
	},
}));

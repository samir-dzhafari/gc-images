import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import boundaries from 'eslint-plugin-boundaries';

const rootPath = resolve(fileURLToPath(new URL('..', import.meta.url)));

/**
 * FSD layer import boundaries.
 * `pages` follows classic FSD: may use widgets and below (not app).
 */
/** @type {import('eslint').Linter.Config[]} */
export const fsdBoundariesConfig = [
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		plugins: {
			boundaries,
		},
		settings: {
			'boundaries/root-path': rootPath,
			'boundaries/include': ['src/**/*', 'assets/**/*'],
			// Resolve @app/* etc. from tsconfig paths (otherwise aliases count as "external")
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: `${rootPath}/tsconfig.json`,
				},
			},
			'boundaries/flag-as-external': {
				unresolvableAlias: false,
			},
			'boundaries/elements': [
				{
					type: 'app',
					pattern: 'src/app/**/*',
					mode: 'file',
				},
				{
					type: 'pages',
					pattern: 'src/pages/**/*',
					mode: 'file',
				},
				{
					type: 'widgets',
					pattern: 'src/widgets/**/*',
					mode: 'file',
				},
				{
					type: 'features',
					pattern: 'src/features/**/*',
					mode: 'file',
				},
				{
					type: 'entities',
					pattern: 'src/entities/**/*',
					mode: 'file',
				},
				{
					type: 'shared',
					pattern: 'src/shared/**/*',
					mode: 'file',
				},
				{
					type: 'assets',
					pattern: 'assets/**/*',
					mode: 'file',
				},
			],
		},
		rules: {
			'boundaries/element-types': [
				'error',
				{
					default: 'disallow',
					rules: [
						{
							from: 'shared',
							allow: ['shared', 'assets'],
						},
						{
							from: 'entities',
							allow: ['entities', 'shared', 'assets'],
						},
						{
							from: 'features',
							allow: ['features', 'entities', 'shared', 'assets'],
						},
						{
							from: 'widgets',
							allow: [
								'widgets',
								'features',
								'entities',
								'shared',
								'assets',
							],
						},
						{
							from: 'pages',
							allow: [
								'pages',
								'widgets',
								'features',
								'entities',
								'shared',
								'assets',
							],
						},
						{
							from: 'app',
							allow: [
								'app',
								'pages',
								'widgets',
								'features',
								'entities',
								'shared',
								'assets',
							],
						},
					],
				},
			],
		},
	},
];

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

export default [
	{
		ignores: [
			'.netlify/**',
			'.svelte-kit/**',
			'build/**',
			'node_modules/**',
			'package/**',
		],
	},
	{
		files: ['**/*.{js,cjs,mjs,ts}'],
		languageOptions: {
			ecmaVersion: 'latest',
			parser: tsParser,
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
	{
		files: ['**/*.cjs'],
		languageOptions: {
			sourceType: 'commonjs',
		},
	},
	prettierConfig,
];

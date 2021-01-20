const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	bail: false,
	verbose: true,
	preset: 'ts-jest/presets/js-with-ts',
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	transform: {
		'^.+\\.svelte$': [
			'jest-transform-svelte',
			{ preprocess: sveltePreprocess() },
		],
		'^.+\\.(js|ts)': 'ts-jest',
	},
	moduleFileExtensions: ['svelte', 'js', 'ts'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testPathIgnorePatterns: ['/static/', '/node_modules/'],
};

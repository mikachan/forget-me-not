module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	transform: {
		'^.+\\.svelte': [
			'svelte-jester',
			{
				preprocess: true,
			},
		],
		'^.+\\.(js|ts)': 'ts-jest',
	},
	moduleFileExtensions: ['svelte', 'js', 'ts'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testPathIgnorePatterns: ['/static/', '/node_modules/'],
};

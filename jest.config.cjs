module.exports = {
	transform: {
		'^.+\\.svelte$': [
			'./jest-svelte-transformer.mjs',
			{
				preprocess: './jest.config.test.cjs',
			},
		],
		'^.+\\.svelte\\.[jt]s$': './jest-svelte-transformer.mjs',
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
		'^.+\\.js$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	transformIgnorePatterns: [
		'/node_modules/(?!@testing-library/svelte-core/)',
	],
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	extensionsToTreatAsEsm: ['.svelte', '.ts'],
	moduleNameMapper: {
		'^\\$app/stores$': '<rootDir>/src/lib/__mocks__/app-stores.ts',
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
		'^\\$app(.*)$': [
			'<rootDir>/.svelte-kit/dev/runtime/app$1',
			'<rootDir>/.svelte-kit/build/runtime/app$1',
		],
	},
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	testEnvironment: 'jsdom',
};

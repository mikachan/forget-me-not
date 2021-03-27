const cssnano = require('cssnano')({
	preset: 'default',
});

const purgecss = require('@fullhuman/postcss-purgecss')({
	content: ['./**/**/*.html', './**/**/*.svelte'],
	whitelistPatterns: [/svelte-/],
	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
	plugins: [
		...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []),
	],
};

/** @type {import('@sveltejs/kit').Config} */
const pkg = require('./package.json');
const postcssConfig = require('./postcss.config.cjs');
const adapter = require(process.env.ADAPTER || '@sveltejs/adapter-static');
const options = JSON.stringify(process.env.OPTIONS || '{}');
const sveltePreprocess = require('svelte-preprocess');
const svelteImage = require('svelte-image');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const production = mode === 'production';

const preprocess = sveltePreprocess({
	defaults: {
		script: 'typescript',
		style: 'postcss',
	},
	sourceMap: !production,
	postcss: postcssConfig,
	postcss: true,
	...svelteImage(),
});

module.exports = {
	preprocess: [preprocess],
	kit: {
		adapter: { adapt: adapter(options) },
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
			plugins: [require('vite-plugin-windicss').default()],
		},
	},
};

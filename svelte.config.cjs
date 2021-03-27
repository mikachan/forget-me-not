/** @type {import('@sveltejs/kit').Config} */
const adapter = require(process.env.ADAPTER || '@sveltejs/adapter-static');
const options = JSON.stringify(process.env.OPTIONS || '{}');
const sveltePreprocess = require('svelte-preprocess');
const svelteImage = require('svelte-image');
const windiCSS = require('vite-plugin-windicss');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const production = !process.env.ROLLUP_WATCH;

const preprocess = sveltePreprocess({
	defaults: {
		script: 'typescript',
		style: 'postcss',
	},
	sourceMap: !production,
	postcss: true,
	...svelteImage(),
});

module.exports = {
	kit: {
		adapter: { adapt: adapter(options) },
		vite: () => ({ plugins: [windiCSS] }),
	},
	preprocess: [preprocess],
};

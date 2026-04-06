import { createRequire } from 'node:module';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';

const require = createRequire(import.meta.url);
const svelteImage = require('svelte-image');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({
			postcss: true,
			...svelteImage(),
		}),
	],
	kit: {
		adapter: adapter({
			edge: false,
			split: true,
		}),
		prerender: {
			handleHttpError: ({ status, message }) => {
				if (status === 404) {
					return;
				}
				throw new Error(message);
			},
		},
	},
};

export default config;

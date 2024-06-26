import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import svelteImage from 'svelte-image';

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
	},
};

export default config;

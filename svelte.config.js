import { vitePreprocess } from '@sveltejs/kit/vite';
//import adapter from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-auto';
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
		adapter: adapter(),
	},
};

export default config;

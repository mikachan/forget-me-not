import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({
			postcss: true,
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

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */ const config = {
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: [vitePreprocess()],
			adapter: adapter({ edge: false, split: true }),
			prerender: {
				handleHttpError: ({ status, message }) => {
					if (status === 404) {
						return;
					}

					throw new Error(message);
				},
			},
		}),
	],
};

export default config;

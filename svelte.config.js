import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import svelteImage from 'svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			...svelteImage(),
		}),
	],
	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['blurhash'],
				exclude: ['sharp'],
			},
			ssr: {
				external: ['sharp'],
				noExternal: ['svelte-image'],
			},
		},
	},
};

export default config;

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import svelteImage from 'svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
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
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			...svelteImage(),
		}),
	],
};

export default config;

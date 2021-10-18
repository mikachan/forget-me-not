import preprocess from 'svelte-preprocess';
import svelteImage from 'svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		svelteImage()
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			optimizeDeps: {
				include: ['blurhash']
			},
			ssr: {
				noExternal: ['svelte-image']
			}
		}
	}
};

export default config;

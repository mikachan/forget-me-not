import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['blurhash'],
		exclude: ['sharp'],
	},
	ssr: {
		external: ['sharp'],
		noExternal: ['svelte-image'],
	},
};

export default config;

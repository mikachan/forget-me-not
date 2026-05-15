import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			// Package `main` points at the CJS preprocessor; resolve the component for app imports.
			'svelte-image': path.resolve(
				__dirname,
				'node_modules/svelte-image/src/Image.svelte'
			),
			// Prebuilt `dist` is legacy Svelte 3; compile source for Svelte 5 / SSR.
			'svelte-waypoint': path.resolve(
				__dirname,
				'node_modules/svelte-waypoint/src/Waypoint.svelte'
			),
		},
	},
	optimizeDeps: {
		include: ['blurhash'],
		exclude: ['sharp'],
	},
	ssr: {
		external: ['sharp'],
	},
};

export default config;

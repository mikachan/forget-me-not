/// <reference types="@sveltejs/kit" />

declare module '@beyonk/svelte-google-analytics' {
	import type { Component } from 'svelte';

	export const GoogleAnalytics: Component<{ properties: string[] }>;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

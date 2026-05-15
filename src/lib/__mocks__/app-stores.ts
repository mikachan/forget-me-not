import { writable } from 'svelte/store';

function createPage(pathname = '/') {
	return {
		url: new URL(pathname, 'https://example.com'),
	};
}

export const page = writable(createPage());
export const navigating = writable(null);
export const updated = {
	subscribe: writable(false).subscribe,
	check: async () => false,
};

export function setPage(pathname: string) {
	page.set(createPage(pathname));
}

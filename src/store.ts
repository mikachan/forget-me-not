import { writable } from 'svelte/store';

function createTitle() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (value: string) => {
			set(`${value} • Forget-me-not: a You fansite`);
		},
		clear: () => {
			set('Forget-me-not: a You fansite');
		},
	};
}

export const title = createTitle();

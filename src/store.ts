import { writable } from 'svelte/store';

function createTitle() {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		set: (value) => {
			set(`${value} • Forget-me-not: a You fansite`);
		},
		clear: () => {
			set('Forget-me-not: a You fansite');
		}
	};
}

export const title = createTitle();

const afterNavigateCallbacks = new Set<() => void>();

export function afterNavigate(callback: () => void) {
	afterNavigateCallbacks.add(callback);
}

export function runAfterNavigateCallbacks() {
	for (const callback of afterNavigateCallbacks) {
		callback();
	}
}

export function resetNavigationCallbacks() {
	afterNavigateCallbacks.clear();
}

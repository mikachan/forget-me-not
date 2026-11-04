function createUrl(pathname = '/') {
	return new URL(pathname, 'https://example.com');
}

export const page = {
	url: createUrl(),
};

export function setPage(pathname: string) {
	page.url = createUrl(pathname);
}

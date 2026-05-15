import NavContent from '../NavContent.svelte';
import { render } from '@testing-library/svelte';
import { setPage } from '../__mocks__/app-stores';

beforeEach(() => {
	setPage('/');
});

test('renders home link in nav with active class', () => {
	const { getByText } = render(NavContent);
	const homeLink = getByText('Home').parentElement;

	expect(homeLink).toBeInTheDocument();
	expect(homeLink).toHaveClass('active');
});

test('sets aria-current and active class when home is not the current page', () => {
	setPage('/about-you');
	render(NavContent);
	const currentMenuItem = document.querySelector('[aria-current="page"]');

	expect(currentMenuItem).toBeInTheDocument();
	expect(currentMenuItem.innerHTML).toContain('About YOU');
	expect(currentMenuItem).toHaveClass('active');
});

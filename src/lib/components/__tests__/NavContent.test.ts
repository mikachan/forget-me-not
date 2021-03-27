import '@testing-library/jest-dom/extend-expect';

import NavContent from '../NavContent.svelte';
import { render } from '@testing-library/svelte';

test('renders home link in nav with active class', () => {
	const { getByText } = render(NavContent, { segment: undefined });
	const homeLink = getByText('Home').parentElement;

	expect(homeLink).toBeInTheDocument();
	expect(homeLink).toHaveClass('active');
});

test('sets aria-current and active class when home is not the current page', () => {
	render(NavContent, { segment: 'about-you' });
	const currentMenuItem = document.querySelector('[aria-current="page"]');

	expect(currentMenuItem).toBeInTheDocument();
	expect(currentMenuItem.innerHTML).toContain('About YOU');
	expect(currentMenuItem).toHaveClass('active');
});
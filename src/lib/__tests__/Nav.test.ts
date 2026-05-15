import Nav from '../Nav.svelte';
import { render } from '@testing-library/svelte';
import {
	resetNavigationCallbacks,
	runAfterNavigateCallbacks,
} from '../__mocks__/app-navigation';

beforeEach(() => {
	resetNavigationCallbacks();
});

test('renders Nav with Menu title', () => {
	const { getAllByText, getByLabelText } = render(Nav);

	expect(getByLabelText('Menu')).toBeInTheDocument();
	expect(getAllByText('Home').length).toBeGreaterThan(0);
});

test('closes mobile nav after page navigation', () => {
	const { baseElement } = render(Nav);
	const mobileNav = baseElement.querySelector('details');

	expect(mobileNav).toBeInstanceOf(HTMLDetailsElement);

	mobileNav!.open = true;
	runAfterNavigateCallbacks();

	expect(mobileNav).not.toHaveAttribute('open');
});

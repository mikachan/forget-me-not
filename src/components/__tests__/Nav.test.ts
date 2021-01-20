import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/svelte';

import Nav from '../Nav.svelte';

test('renders Nav with Menu title', () => {
	const { getByText } = render(Nav, { segment: '' });

	expect(getByText('Menu')).toBeInTheDocument();
});

// test('clicking button triggers openNav function', async () => {
// 	const { getByRole } = render(Nav, { segment: 'Home' });
// 	const button = getByRole('button');

// 	await fireEvent.click(button);

// 	expect(button).toHaveTextContent('Button Clicked');
// });

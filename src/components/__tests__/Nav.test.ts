import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/svelte';

import Nav from '../Nav.svelte';

test('shows proper heading when rendered', () => {
	const { getByText } = render(Nav, { segment: 'Home' });

	expect(getByText('Menu')).toBeInTheDocument();
});

// Note: This is as an async test as we are using `fireEvent`
// test('changes button text on click', async () => {
// 	const { getByText } = render(Nav, { segment: 'World' });
// 	const button = getByText('Button');

// 	// Using await when firing events is unique to the svelte testing library because
// 	// we have to wait for the next `tick` so that Svelte flushes all pending state changes.
// 	await fireEvent.click(button);

// 	expect(button).toHaveTextContent('Button Clicked');
// });

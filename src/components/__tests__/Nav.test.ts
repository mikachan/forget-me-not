import '@testing-library/jest-dom/extend-expect';

import Nav from '../Nav.svelte';
import { render } from '@testing-library/svelte';

test('renders Nav with Menu title', () => {
	const { getByText } = render(Nav, { segment: '' });

	expect(getByText('Menu')).toBeInTheDocument();
});

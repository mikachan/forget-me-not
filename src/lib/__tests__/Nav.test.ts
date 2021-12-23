import '@testing-library/jest-dom/extend-expect';

import Nav from '../Nav.svelte';
import { render } from '@testing-library/svelte';

test('renders Nav with Menu title', () => {
	const { getByText } = render(Nav);

	expect(getByText('Menu')).toBeInTheDocument();
});

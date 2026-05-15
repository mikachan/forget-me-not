import Nav from '../Nav.svelte';
import { render } from '@testing-library/svelte';

test('renders Nav with Menu title', () => {
	const { getAllByText, getByLabelText } = render(Nav);

	expect(getByLabelText('Menu')).toBeInTheDocument();
	expect(getAllByText('Home').length).toBeGreaterThan(0);
});

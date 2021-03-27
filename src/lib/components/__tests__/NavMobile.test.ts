import '@testing-library/jest-dom/extend-expect';

import NavMobile from '../NavMobile.svelte';
import { render } from '@testing-library/svelte';

test('renders NavMobile with close button', () => {
	const { getByRole } = render(NavMobile, { segment: '' });

	expect(getByRole('button')).toBeInTheDocument();
});

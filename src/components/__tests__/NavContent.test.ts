import '@testing-library/jest-dom/extend-expect';

import NavContent from '../NavContent.svelte';
import { render } from '@testing-library/svelte';

test('renders home link in nav', () => {
	const { getByText } = render(NavContent, { segment: '' });

	expect(getByText('Home')).toBeInTheDocument();
});

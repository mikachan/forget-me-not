import '@testing-library/jest-dom/extend-expect';

import Link from '../Link.svelte';
import { render } from '@testing-library/svelte';

test('renders a span tag if disabled is true', () => {
	const { getByRole } = render(Link, { disabled: true });

	expect(getByRole('span')).toBeInTheDocument();
});

test('renders an anchor link if disabled is false', () => {
	const { getByRole } = render(Link, { disabled: false });

	expect(getByRole('a')).toBeInTheDocument();
});

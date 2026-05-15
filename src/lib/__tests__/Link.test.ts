import Link from '../Link.svelte';
import { render } from '@testing-library/svelte';

test('renders a span tag if disabled is true', () => {
	const { getByRole } = render(Link, { props: { disabled: true } });

	expect(getByRole('link')).toHaveAttribute('aria-disabled');
});

test('renders an anchor link if disabled is false', () => {
	const { getByRole } = render(Link, { props: { disabled: false } });

	expect(getByRole('link')).toBeInTheDocument();
});

test('does not use a JavaScript URL when href is omitted', () => {
	const { getByRole } = render(Link, { props: { disabled: false } });

	expect(getByRole('link').getAttribute('href')).not.toMatch(/^javascript:/);
});

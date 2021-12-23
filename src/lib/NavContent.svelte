<script lang="ts">
	import { page } from '$app/stores';
</script>

<style lang="postcss">
	a {
		@apply block py-1 md:py-2 pl-1 align-middle text-gray-800 no-underline hover:text-green-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-green-500;
	}

	a.active {
		@apply block py-1 md:py-2 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-green-600;
	}

	li span {
		@apply pb-1 lg:pb-0 text-lg lg:text-base text-gray-300 md:text-gray-400 block lg:inline-block lowercase;
	}

	ul {
		@apply ml-0 mb-0;
	}

	ul li {
		@apply list-none lg:inline-block lg:pr-3;
	}
</style>

<nav>
	<ul>
		<li>
			<a aria-current="{$page.path === '/' ? 'page' : undefined}" class:active={$page.path == '/'} href=".">
				<span>Home</span>
			</a>
		</li>
		<li>
			<a aria-current="{$page.path === '/about-you' ? 'page' : undefined}" class:active={$page.path == '/about-you'} href="/about-you">
				<span>About YOU</span>
			</a>
		</li>
		<li>
			<a aria-current="{$page.path === '/music-career' ? 'page' : undefined}" class:active={$page.path == '/music-career'} href="/music-career">
				<span>Music Career</span>
			</a>
		</li>
		<li>
			<a aria-current="{$page.path === '/discography' ? 'page' : undefined}" class:active={$page.path == '/discography'} href="/discography">
				<span>Discography</span>
			</a>
		</li>
		<li>
			<a aria-current="{$page.path === '/where-to-buy' ? 'page' : undefined}" class:active={$page.path == '/where-to-buy'} href="/where-to-buy">
				<span>Where to Buy</span>
			</a>
		</li>
	</ul>
</nav>

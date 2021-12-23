<script lang="ts">
	export let segment: string;
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
			<a aria-current="{segment === '/' ? 'page' : undefined}" class="{segment === '/' ? 'active' : undefined}" href=".">
				<span>Home</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === '/about-you' ? 'page' : undefined}" class="{segment === '/about-you' ? 'active' : undefined}" href="/about-you">
				<span>About YOU</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === '/music-career' ? 'page' : undefined}" class="{segment === '/music-career' ? 'active' : undefined}" href="/music-career">
				<span>Music Career</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === '/discography' ? 'page' : undefined}" class="{segment === '/discography' ? 'active' : undefined}" href="/discography">
				<span>Discography</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === '/where-to-buy' ? 'page' : undefined}" class="{segment === '/where-to-buy' ? 'active' : undefined}" href="/where-to-buy">
				<span>Where to Buy</span>
			</a>
		</li>
	</ul>
</nav>

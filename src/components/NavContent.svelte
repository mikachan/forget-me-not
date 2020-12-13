<script lang="ts">
	export let segment: string;
</script>

<style>
	a {
		@apply block py-1 md:py-2 pl-1 align-middle text-gray-800 no-underline hover:text-green-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-green-500;
	}

	a.active {
		@apply block py-1 md:py-2 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-green-600;
	}

	li span {
		@apply pb-1 md:pb-0 text-xs md:text-base text-gray-300 md:text-gray-400 block md:inline-block lowercase;
	}

	ul li {
		@apply list-none;
	}
</style>

<nav>
	<ul>
		<li>
			<a aria-current="{segment === undefined ? 'page' : undefined}" class="{segment === undefined ? 'active' : undefined}" href=".">
				<span>Home</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'about-you' ? 'page' : undefined}" class="{segment === 'about-you' ? 'active' : undefined}" href="about-you">
				<span>About You</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'music-career' ? 'page' : undefined}" class="{segment === 'music-career' ? 'active' : undefined}" href="music-career">
				<span>Music Career</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'cains-feel' ? 'page' : undefined}" class="{segment === 'cains-feel' ? 'active' : undefined}" href="cains-feel">
				<span>CAINS:FEEL</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'appearances' ? 'page' : undefined}" class="{segment === 'appearances' ? 'active' : undefined}" href="appearances">
				<span>Appearances</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'trivia' ? 'page' : undefined}" class="{segment === 'trivia' ? 'active' : undefined}" href="trivia">
				<span>Trivia</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'birthday-2003' ? 'page' : undefined}" class="{segment === 'birthday-2003' ? 'active' : undefined}" href="birthday-2003">
				<span>Birthday 2003</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'gackt-you' ? 'page' : undefined}" class="{segment === 'gackt-you' ? 'active' : undefined}" href="gackt-you">
				<span>Gackt & You</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'sending-fanmail' ? 'page' : undefined}" class="{segment === 'sending-fanmail' ? 'active' : undefined}" href="sending-fanmail">
				<span>Sending Fanmail</span>
			</a>
		</li>
		<li>
			<a aria-current="{segment === 'shopping' ? 'page' : undefined}" class="{segment === 'shopping' ? 'active' : undefined}" href="shopping">
				<span>Shopping</span>
			</a>
		</li>
	</ul>
</nav>

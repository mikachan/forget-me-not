<script lang="ts">
	export let segment: string;
</script>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about-you' ? 'page' : undefined}" href="about-you">about you</a></li>
		<li><a aria-current="{segment === 'trivia' ? 'page' : undefined}" href="trivia">trivia</a></li>
		<li><a aria-current="{segment === 'appearances' ? 'page' : undefined}" href="appearances">appearances</a></li>
		<li><a aria-current="{segment === 'music-career' ? 'page' : undefined}" href="music-career">music career</a></li>
		<li><a aria-current="{segment === 'cains-feel' ? 'page' : undefined}" href="cains-feel">cains:feel</a></li>
		<li><a aria-current="{segment === 'birthday-2003' ? 'page' : undefined}" href="birthday-2003">birthday 2003</a></li>
		<li><a aria-current="{segment === 'gackt-you' ? 'page' : undefined}" href="gackt-you">Gackt & You</a></li>
		<li><a aria-current="{segment === 'sending-fanmail' ? 'page' : undefined}" href="sending-fanmail">Sending Fanmail</a></li>
		<li><a aria-current="{segment === 'shopping' ? 'page' : undefined}" href="shopping">Shopping</a></li>
	</ul>
</nav>

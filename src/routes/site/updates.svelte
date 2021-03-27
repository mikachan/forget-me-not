<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	import { title } from '../../store';
	export let pageTitle: string = 'Site Updates';
	title.set(pageTitle);
</script>

<style>
	hr {
		@apply mt-2 mb-4 border-green-400 opacity-25;
	}
</style>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
<h2>{pageTitle}</h2>

<p>
	<strong>16.02.21</strong>
	<br />
	Ded Chaplin and Luscious are streaming two live performances on 17th and
	18th February, from The Doors in Hatsudai. You can purchase tickets to watch
	the performances live through
	<Link href="https://twitcasting.tv/chachamaru_yfcz">TwitCasting</Link>
	, which also gives you access to watch the stream recording up to 2 weeks
	from the original broadcast. See
	<Link href="https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722">
		Chacha's Twitter
	</Link>
	for more info. Looking forward to it!
</p>

<hr class="border-b-1" />

<p>
	<strong>10.02.21</strong>
	<br />
	Happy birthday YOU! お誕生日おめでとう!
</p>

<hr class="border-b-1" />

<p>
	<strong>01.01.21</strong>
	<br />
	Happy New Year! 明けましておめでとうございます!
</p>

<hr class="border-b-1" />

<p>
	<strong>12.12.20</strong>
	<br />
	Guess who's back! After over 6 years I've decided to rebuild this fansite.
	I've restored most of the content but not many images yet, and I'm guessing
	loads of the information is now incorrect or wildy out of date. But it's
	back and I'd forgotten how much I enjoy fangirling over You!
</p>

<script lang="ts">
	import Image from 'svelte-image';

	import moonchild from '$lib/images/you/moonchild.jpg';

	import { title } from '../../store';
	export let pageTitle: string = 'Discography';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<h3>
	Full Discography
	<a href="discography/full-discography" class="text-sm">
		read more&nbsp;&rarr;
	</a>
</h3>

<p>
	View You's full discography including release dates, artist collaborations
	and credits.
</p>

<h3>
	Appearances
	<a href="discography/appearances" class="text-sm">read more&nbsp;&rarr;</a>
</h3>

<p>
	You has appeared in many videos, books, magazines and interviews, especially
	from working with Gackt. The highlight obviously being his acting skillz in
	<em>Moon Child</em>
	:
</p>

<figure>
	<Image
		alt="You in Moon Child"
		class="p-2 pt-0 mx-auto mb-2"
		src={moonchild}
		ratio="55%" />
</figure>

<script lang="ts">
	import Link from '$lib/Link.svelte';

	import { title } from "../../store";
	export let pageTitle: string = 'Site History';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>The site was first opened on 23rd March, 2004. I decided to make a You fan site because, at the time, there were no sites dedicated to him in English.</p>

<p>The site was named after the Gackt song, <em>Wasurenai kara</em> (忘れないから, 'I won't forget'). It was originally called <em>Silence and Motion</em> after the Final Fantasy VIII track of the same name.</p>

<p>You can view the site source on <Link href="https://github.com/mikachan/forget-me-not">GitHub</Link>.</p>

<p><a href="site/thanks">Thank you</a> to everyone who helped make this site possible over the years.</p>

<p>I'm <Link href="https://sekai.co.uk">Sarah</Link>, your average J-rock/anything-Japanese nerd from the UK.</p>
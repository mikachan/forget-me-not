<script lang="ts">
	import { title } from "../../store";
	export let pageTitle: string = 'GacktJob';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>The members of GacktJob have said that You is like a robot, with the exception of Gackt, who says he's half donkey, half horse.</p>

<p>They celebrated You's 30th birthday on Gackt's radio show together; I've dedicated a page to it <a href="/music-career/birthday-2003">here</a> since I had so much info about it.</p>

<p><em>More info coming soon.</em></p>

<p><a href="/music-career">&larr; Backt to Music Career</a></p>
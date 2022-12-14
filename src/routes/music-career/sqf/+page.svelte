<script lang="ts">
	import { title } from "../../../store";
	export let pageTitle: string = 'S.Q.F';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>Coming soon.</p>

<p><a href="/music-career">&larr; Backt to Music Career</a></p>

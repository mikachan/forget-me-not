<GoogleAnalytics {stores} id={ga_measurment_id}/>

<script lang="ts">
	import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
    import { stores } from "@sapper/app";
	import Nav from '../components/Nav.svelte';

	let ga_measurment_id = "UA-7281616-1";

	export let segment: string;
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
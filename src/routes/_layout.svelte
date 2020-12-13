<GoogleAnalytics {stores} id={ga_measurment_id} />

<script lang="ts">
	import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
    import { stores } from "@sapper/app";
	import Nav from '../components/Nav.svelte';

	let ga_measurment_id = "UA-7281616-1";

	export let segment: string;
</script>

<div class="flex md:flex-row-reverse flex-wrap">
	<main class="w-full md:w-4/5 bg-gray-100 md:h-screen">
		<div class="container bg-gray-100 pt-16 px-6">
			<slot></slot>
		</div>
	</main>

	<Nav {segment} />
</div>

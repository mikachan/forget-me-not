<GoogleAnalytics {stores} id={ga_measurment_id} />

<script lang="ts">
	import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
    import { stores } from "@sapper/app";
	import Nav from '../components/Nav.svelte';
	import NavMobile from '../components/NavMobile.svelte';

	let ga_measurment_id = "UA-7281616-1";

	export let segment: string;

    function openNav() {
        document.getElementById("navMobile").style.width = "100%";

        if (document.getElementById("main-container")) {
            document.getElementById("main-container").style.position = "fixed";
        }
    }
</script>

<nav class="fixed w-full z-20 flex items-center justify-between flex-wrap bg-white py-4 px-2 sm:px-6 border border-gray-200">
	<a href="/" class="no-underline flex items-center flex-no-shrink text-white mr-6">
		<h1 class="font-medium text-xl tracking-tighter text-gray-900 mb-0">Forget-me-not</h1>
	</a>
	<div class="block md:hidden">
		<button class="flex items-center px-3 py-2 border rounded text-gray-900 border-gray-400 hover:text-gray-600 hover:border-gray-600" on:click={openNav}>
			<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
				<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
			</svg>
		</button>
	</div>
</nav>

<NavMobile {segment} />

<div id="main-container" class="bg-gray-400est-100">
	<div class="flex mb-4 relative ">
		<Nav {segment} />

		<div class="w-48 p-4 hidden md:block"></div>

		<main class="flex w-full h-screen relative bg-gray-100">
			<div class="w-full lg:w-3/4 py-8 px-4 md:px-10 lg:px-16 xl:32 mt-20">
				<slot></slot>
			</div>
		</main>
	</div>
</div>
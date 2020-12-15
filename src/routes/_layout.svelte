<GoogleAnalytics {stores} id={ga_measurment_id} />

<script lang="ts">
	import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
    import { stores } from "@sapper/app";
	import Nav from '../components/Nav.svelte';
	import NavMobile from '../components/NavMobile.svelte';
	import bg from 'images/bg01.jpg';
	import you from 'images/you05.jpg';

	let ga_measurment_id = "UA-7281616-1";

	export let segment: string;
</script>

<NavMobile {segment} />

<div class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style="background-image:url({bg});">
	<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 lg:my-0">

		<Nav {segment} />

		<div class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll lg:overflow-y-visible">
			<div class="p-4 md:p-8">
				<div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style="background-image: url({you})"></div>

				<h1 class="text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left">Forget-me-not: a YOU fansite</h1>
				<div class="mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25"></div>
				
				<slot></slot>

				<div class="pt-6">
					<p class="italic text-xs text-center lg:text-left">&copy 2004-2020. <a href="https://sekai.co.uk" class="no-underline">Contact webmaster</a>.</p>
				</div>
			</div>
		</div>

		<div class="w-full lg:w-2/5">
			<figure>
				<img src="{you}" alt="You" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
			</figure>
		</div>
	</div>
</div>
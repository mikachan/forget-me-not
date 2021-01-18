{#if mode !== 'development'}
	<GoogleAnalytics {stores} id={ga_measurment_id} />
{/if}

<script lang="ts">
	import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
	import { stores } from "@sapper/app";
    import { onMount } from 'svelte';
	import Nav from '../components/Nav.svelte';
	import NavMobile from '../components/NavMobile.svelte';
	import Link from '../components/Link.svelte';

	import bg from 'images/bg02.jpg';
	import you01 from 'images/image-rotation/you01.jpg';
	import you02 from 'images/image-rotation/you02.jpg';
	import you03 from 'images/image-rotation/you03.jpg';
	import you04 from 'images/image-rotation/you04.jpg';
	import you05 from 'images/image-rotation/you05.jpg';
	import you06 from 'images/image-rotation/you06.jpg';
	import you07 from 'images/image-rotation/you07.jpg';
	import you08 from 'images/image-rotation/you08.jpg';
	import you09 from 'images/image-rotation/you09.jpg';
	import you10 from 'images/image-rotation/you10.jpg';
	import you11 from 'images/image-rotation/you11.jpg';
	import you12 from 'images/image-rotation/you12.jpg';
	import you13 from 'images/image-rotation/you13.jpg';
	import you14 from 'images/image-rotation/you14.jpg';
	import you15 from 'images/image-rotation/you15.jpg';
	import you16 from 'images/image-rotation/you16.jpg';

	const mode = process.env.NODE_ENV;
	let ga_measurment_id: string = "G-WN3BJ9W3N5";
	let mainImage: string = you01;
	let mainContent;

	function randomYouImage(): string {
		const youPics: string[] = [
			you01, you02, you03, you04, you05, you06, you07, you08,
			you09, you10, you11, you12, you13, you14, you15, you16
		];
		const randomIndex: number = Math.floor(Math.random() * youPics.length);
		return youPics[randomIndex];
	}

	onMount(() => {
		mainContent = document.querySelector('.main-content');
	});

	const { page } = stores();
	page.subscribe(({ path, params, query }) => {
		mainImage = randomYouImage();
		if (mainContent) mainContent.scrollTop = 0;
	});

	export let segment: string;
</script>

<NavMobile {segment} />

<div class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style="background-image:url({bg});">
	<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 px-6 lg:px-0 lg:my-0">

		<Nav {segment} />

		<div class="main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll">
			<div class="p-4 md:p-6">
				<div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top" style="background-image: url({mainImage})"></div>

				<h1 class="text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left">Forget-me-not: a YOU fansite</h1>
				<div class="mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25"></div>
				
				<slot></slot>

				<div class="pt-4">
					<p class="italic text-xs text-center lg:text-left">
						&copy; 2004-2021<br>
						<Link href="https://sekai.co.uk" class="no-underline">Contact webmaster</Link> &bullet; <Link href="https://github.com/mikachan/forget-me-not" class="no-underline">View on GitHub</Link>
					</p>
				</div>
			</div>
		</div>

		<div class="w-full lg:w-2/5">
			<figure>
				<img src="{mainImage}" alt="You" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
			</figure>
		</div>
	</div>
</div>
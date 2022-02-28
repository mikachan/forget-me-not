<script lang="ts">
	import { dev } from '$app/env';
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
	import Nav from '$lib/Nav.svelte';
	import NavMobile from '$lib/NavMobile.svelte';
	import Link from '$lib/Link.svelte';
	import Image from "svelte-image";

	import '../styles/tailwind-output.css';
	import '../app.css';

	import bg from '$lib/images/bg02.jpg';
	import you01 from '$lib/images/image-rotation/you01.jpg';
	import you02 from '$lib/images/image-rotation/you02.jpg';
	import you03 from '$lib/images/image-rotation/you03.jpg';
	import you04 from '$lib/images/image-rotation/you04.jpg';
	import you05 from '$lib/images/image-rotation/you05.jpg';
	import you06 from '$lib/images/image-rotation/you06.jpg';
	import you07 from '$lib/images/image-rotation/you07.jpg';
	import you08 from '$lib/images/image-rotation/you08.jpg';
	import you09 from '$lib/images/image-rotation/you09.jpg';
	import you10 from '$lib/images/image-rotation/you10.jpg';
	import you11 from '$lib/images/image-rotation/you11.jpg';
	import you12 from '$lib/images/image-rotation/you12.jpg';
	import you13 from '$lib/images/image-rotation/you13.jpg';
	import you14 from '$lib/images/image-rotation/you14.jpg';
	import you15 from '$lib/images/image-rotation/you15.jpg';
	import you16 from '$lib/images/image-rotation/you16.jpg';

	let mainImage: string = you01;
	let mainContent: HTMLElement;

	function randomYouImage(): string {
		const youPics: string[] = [
			you01, you02, you03, you04, you05, you06, you07, you08,
			you09, you10, you11, you12, you13, you14, you15, you16
		];
		const randomNum: number = Math.floor(Math.random() * youPics.length);
		return youPics[randomNum];
	}

	onMount(() => {
		mainContent = document.querySelector('.main-content');
	});

	page.subscribe(({ url, params, status }) => {
		mainImage = randomYouImage();
		if (mainContent) mainContent.scrollTop = 0;
	});
</script>

<style>	
	@media (min-width: 1024px) {
		.image-rotation figure {
			height: 500px;
		}
	}
</style>

{#if !dev}
	<GoogleAnalytics properties={[ 'G-WN3BJ9W3N5' ]} />
{/if}

<NavMobile />

<div class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style="background-image:url({bg});">
	<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-24 px-6 lg:px-0 lg:my-0">

		<Nav />

		<div class="main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll">
			<div class="p-4 md:p-6">
				<div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top" style="background-image: url({mainImage})"></div>

				<h1 class="text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left">Forget-me-not: a You fansite</h1>
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

		<div class="image-rotation w-full lg:w-2/5">
			<figure class="hidden lg:block">
				<Image src="{mainImage}" alt="You" class="rounded-none lg:rounded-lg shadow-2xl" ratio="141%" placeholderClass="rounded-none lg:rounded-lg" />
			</figure>
		</div>
	</div>
</div>
<script context="module" lang="ts">
	export const prerender = true;
	
	import Link from '$lib/Link.svelte';
	import Image from "svelte-image";
	
	import bracelet from '$lib/images/designs/bracelet.jpg';
	import earring from '$lib/images/designs/earring.jpg';
	import edhardy1 from '$lib/images/designs/edhardy01.jpg';
	import edhardy2 from '$lib/images/designs/edhardy03.jpg';
	import hdarts01 from '$lib/images/designs/hdarts01.jpg';
	import hdarts02 from '$lib/images/designs/hdarts02.jpg';
	import hdarts03 from '$lib/images/designs/hdarts03.jpg';
	import hdarts04 from '$lib/images/designs/hdarts04.jpg';

	import { title } from "../../../store";
	export let pageTitle: string = 'Designs';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<h3>Jewellery</h3>

<figure style="width: 120px;">
	<Image alt="Bracelet" class="p-2 pt-0" align="right" src="{bracelet}" ratio="70%" />
</figure>

<p>You has designed a couple of bracelets with Monkey-act-web. All You-related things could be found under the <em>WithMAD</em> section of the site. The last bracelet on the <Link href="http://www.monkey-act-web.com/you/youpage.html">this page</Link> he designed in 2003.</p>

<figure style="width: 100px;">
	<Image alt="Earring" class="p-2 pt-0" align="right" src="{earring}" ratio="90%" />
</figure>

<p>He also designed a silver earring and a pendant in 2004, also under the WithMAD branding.</p>

<p>You has made comments on the bracelets, saying they were his first collaboration with Monkey, and that it took a long time to design them.</p>

<p>He's also designed other pieces of jewelery for <em>h-Darts</em>, including earrings, bracelets and necklaces. His latest design is a bracelet titled "Earth", which can be seen <Link href="http://www.h-darts.com/original/order/image/g_you_model.jpg">here</Link>.</p>

<p>The best thing from the h-darts collab was this gorgeous but slightly awkward must-show-hands-and-wrists-in-all-shots photoshoot:</p>

<figure>
	<Image alt="h-darts" class="p-2 pt-0 inline-block" src="{hdarts01}" />
	<Image alt="h-darts" class="p-2 pt-0 inline-block" src="{hdarts02}" />
</figure>

<figure>
	<Image alt="h-darts" class="p-2 pt-0 inline-block" src="{hdarts03}" />
	<Image alt="h-darts" class="p-2 pt-0 inline-block" src="{hdarts04}" />
</figure>

<h3 class="mt-4">Clothing</h3>
<p>You collaborated with Ed Hardy in 2014 on a clothing range.</p>

<figure>
	<Image alt="Ed Hardy x You" class="p-2 pt-0" align="right" src="{edhardy1}" />
</figure>

<figure>
	<Image alt="Ed Hardy x You" class="p-2 pt-0 mb-4" align="right" src="{edhardy2}" ratio="50%" />
</figure>

<p><a href="/about-you">&larr; Back to About You</a></p>
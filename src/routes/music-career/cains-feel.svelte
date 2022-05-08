<script context="module" lang="ts">
	export const prerender = true;
	
	import Link from '$lib/Link.svelte';
	import Image from "svelte-image";

	import tape from '$lib/images/cains-feel/tape.jpg';
	import tape2 from '$lib/images/cains-feel/tape-brown.jpg';
	import band from '$lib/images/cains-feel/cainsfeel.jpg';

	import { title } from "../../store";
	export let pageTitle: string = 'CAINS:FEEL';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>CAINS:FEEL was an indie Japanese visual kei (rock/goth) band formed in 1989 (although some sources say 1993) by You and Gackt. The band members were known as troublemakers as they often started fights at local venues, usually between rival bands. They mainly performed locally in Kyoto.</p>

<p>The origin of the name is from Cain and Abel, the sons of Adam and Eve from Genesis in the Old Testament.</p>

<p>At first, they struggled to find a vocalist and after a year of searching, Gackt jokingly suggested that he should do it, but You just laughed. After a couple of arguments and proving each other wrong, You gave Gackt a list of songs to practice and Gackt agreed to take vocal lessons. After a week of lessons, he sung in front of You for the first time, and You's response was, "Why haven't you sung before?". Maybe without You's encouragment, Gackt wouldn't have even considered being a lead vocalist...</p>

<p>After Gackt had decided to be the lead vocalist, him and You recorded some demo songs to help recruit other band members. The majority of songs were written by Gackt and You.</p>

<h3>Band Members</h3>

<p>
	<strong>Vocals:</strong> Gakuto (Gackt)<br>
	<strong>Guitar:</strong> You, Nao<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu, Ichirou<br>
	<strong>Keyboard:</strong> Reiona
</p>

<figure>
	<Image alt="CAINS:FEEL 1995" class="pb-4 mx-auto" src="{band}" ratio="68%" />
</figure>

<p>They disbanded in 1995 when Gackt decided to move to Tokyo to join Malice Mizer as their vocalist. After the split, You became a studio guitarist for several different bands in Kyoto.</p>

<h3>Demo Tapes</h3>

<p>They made a demo tape in 1994, of which there were two versions: green and brown.</p>

<p>Whilst they recorded a lot of songs for these demo tapes, they only chose to include a couple. Some of the songs were later used by Gackt in his solo career (<em>etude</em> was used on <em>Love Letter</em>, <em>refrain</em> was renamed to <em>Solitude ~regret~</em> and performed during the <Link href="https://www.youtube.com/watch?v=eRvHzl6ENhk">Jougen no Tsuki 2003 tour</Link>).</p>

<h4>Credits</h4>

<p>
	<strong>Vocals:</strong> Gaku (Gackt)<br>
	<strong>Guitar:</strong> You<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu (studio drummer)
</p>

<h4>Green version:</h4>

<figure style="width: 140px;">
	<Image alt="CAINS:FEEL 1994 demo tape open" class="p-4 pt-0" src="{tape}" ratio="138%" />
</figure>

<ol class="list-decimal list-inside">
	<li>～lie～ [<Link href="https://youtu.be/cVe9rssPA84">youtube</Link>]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blueの風に抱かれて) [<Link href="https://youtu.be/A6CEeoU1KG4">youtube</Link>]</li>
	<li>etude [<Link href="https://youtu.be/cvGPKVu3LPQ">youtube</Link>] [<Link href="/downloads/etude.txt" download="etude lyric translation">lyric translation</Link>]</li>
</ol>

<h4>Brown version:</h4>

<figure>
	<Image alt="CAINS:FEEL 1994 demo tape brown rare version" class="p-4 pt-0" width="130px" src="{tape2}" ratio="60%" />
</figure>

<ol class="list-decimal list-inside">
	<li>refrain</li>
	<li>～lie～ [<Link href="https://youtu.be/cVe9rssPA84">youtube</Link>]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blueの風に抱かれて) [<Link href="https://youtu.be/A6CEeoU1KG4">youtube</Link>]</li>
	<li>etude [<Link href="https://youtu.be/cvGPKVu3LPQ">youtube</Link>] [<Link href="/downloads/etude.txt" download="etude lyric translation">lyric translation</Link>]</li>
</ol>

<p><a href="/music-career">&larr; Backt to Music Career</a></p>
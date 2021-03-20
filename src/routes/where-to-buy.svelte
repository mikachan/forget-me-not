<script lang="ts">
	import Link from '../components/Link.svelte';

	import { title } from "../store";
	export let pageTitle: string = 'Where to Buy';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>There are several places you can buy Gackt, S.Q.F etc releases online.</p>

<ul>
	<li><Link href="http://www.yesasia.com/">YesAsia</Link></li>
	<li><Link href="http://www.cdjapan.co.jp/">CD Japan</Link></li>
	<li><Link href="http://www.amazon.co.jp/">Amazon Japan</Link></li>
	<li><Link href="http://www.hmv.co.jp/">HMV Japan</Link></li>
	<li><Link href="http://buyee.jp/">Buyee.jp</Link></li>
	<li><Link href="http://www.jlist.com/">JList</Link></li>
</ul>

<p>Both Gackt and S.Q.F are available on most popular music streaming services.</p>

<h3>Suggested Merch for You Fans</h3>

<h4>Albums</h4>
<ul>
	<li><em>Moon</em> (Gackt): You is heavily featured in the CD booklet</li>
	<li><em>The Seventh Night</em> (Gackt): Nice pictures of You and Gackt in the chunky booklet that comes with the CD</li>
</ul>

<h4>Photobooks &amp; Magazines</h4>
<ul>
	<li>Mizerable ~Unmei~ photobook</li>
	<li>For Dears</li>
	<li>Jougen no Tsuki Tour Book</li>
	<li>The Air Moon (The Crescent side)</li>
	<li>The Sixth Day & Seventh Night Tour Book</li>
	<li>Gackt File 1999-2004</li>
	<li>DIABOLOS tour book</li>
</ul>

<h4>Live Tour DVDs</h4>

<p>Any of Gackt's from 2000-2019, but my personal favourites are:</p>

<ul>
	<li><em>Kagen no Tsuki (2002)</em></li>
	<li><em>Jougen no Tsuki (2003)</em></li>
	<li><em>The Sixth Day & Seventh Night (2004)</em></li>
	<li><em>Diablos (2005)</em></li>
	<li><em>Training Days Drug Party (2006)</em></li>
	<li><em>Requiem Et Reminiscence II (2009)</em></li>
	<li><em>Best of the Best - 40th birthday (2013)</em></li>
	<li><em>Last Visualive Saigo no Tsuki (2016)</em></li>
</ul>
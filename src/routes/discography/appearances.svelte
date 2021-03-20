<script lang="ts">
	import Link from '../../components/Link.svelte';

	import { title } from "../../store";
	export let pageTitle: string = 'Appearances';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<h3>DVDs/Videos</h3>

<p>Alongside <a href="discography/full-discography#live-music-dvds">live tour DVDs</a>, You has also appeared in the following:</p>

<ul>
	<li>He played <em>Jun</em> in <Link href="https://www.imdb.com/title/tt0365514/">Moon Child</Link> (2003)</li>
	<li><em>Life</em> short film, from Gackt's <em>Soyokaze</em> VHS (2002) <a href="discography/life-short-film">Read more&nbsp;&rarr;</a></li>
	<li>Gackt PVs: <em>Mirror</em>, <em>ANOTHER WORLD</em>, <em>Juunigatsu no love song</em>, <em>Black Stone</em> &amp; <em>Redemption</em></li>
	<li>Yellow Fried Chickenz PVs: <em>All My Love</em> &amp; <em>Mata koko de Aimashou</em></li>
	<li>Gackt's <em>Gekkou</em> DVD (2003)</li>
	<li>Phone call on the radio between You and Gackt, from the <em>nine*nine</em> box set (2008) <a href="discography/nine-nine-radio">Read more&nbsp;&rarr;</a></li>
	<li>Gackt's Platinum Boxes (DVDs)</li>
	<li>Gackt and You gave advice on bisexual relationships on NicoNico from 2015.07.01 (Subbed video on <Link href="https://youtu.be/f4Tdz24iRPI">Youtube from Yuzu Translations</Link>. There's two other parts/sections to this video <Link href="https://youtu.be/Z9W-f5qJFGc">here</Link> and <Link href="https://youtu.be/-ogP-Vc2SUA">here</Link>.)</li>
</ul>

<h3>CDs</h3>
<ul>
	<li>Lyric booklet that comes with Gackt's <em>Moon</em> album</li>
	<li>Lyric booklet that comes with Gackt's <em>The Seventh Night</em> album</li>
</ul>

<h3>Books</h3>
<ul>
	<li>Gackt's <em>Mizerable ~Unmei~</em> photobook</li>
	<li>All of Gackt's tour document photobooks (<em>The Gift</em>, <em>Just Bring it!</em> etc)</li>
	<li>The Crescent side of <em>The Air Moon</em></li>
	<li>Gackt File 1999-2004</li>
</ul>

<h3>Magazines*</h3>
<ul>
	<li><em>Shoxx</em> May 1999</li>
	<li>UV 100 magazine</li>
	<li>Motto2 vol. 01</li>
	<li>Motto2 vol. 08</li>
</ul>

<h3>Other</h3>
<ul>
	<li>Gackt Dears fan club videos</li>
	<li>Interviews with Gackt</li>
	<li>Gackt's radio show</li>
	<li>Modeling jewelery for <Link href="http://h-darts.com">h-Darts</Link></li>
	<li><Link href="http://www.executivemonthly.com/english/about/index.php">Executive Monthly</Link> CM. He's sitting at the bar talking to a girl.</li>
</ul>

<p><em class="text-sm">There's loads more... these lists are definitely a work in progress.</em></p>

<p><a href="/discography">&larr; Back to Discography</a></p>
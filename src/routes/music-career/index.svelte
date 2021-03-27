<script lang="ts">
	import Image from 'svelte-image';
	import Link from '$lib/components/Link.svelte';

	import cainsFeel from '$lib/images/cains-feel/cainsfeel03.jpeg';
	import maracas from '$lib/images/you/1996-mm.jpeg';
	import gacktjob from '$lib/images/gacktjob/gacktjob01.jpg';
	import yfc from '$lib/images/yfc/yfc01.jpg';
	import sqf from '$lib/images/sqf/sqf04.jpg';
	import luscious from '$lib/images/luscious/luscious03.jpeg';

	import { title } from '../../store';
	export let pageTitle: string = 'Music Career';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>
	You's best known for playing the guitar and violin, and can also play piano,
	drums and shamisen. At live shows he usually plays rhythm guitar, violin and
	sometimes backing vocals.
</p>

<p>
	You also writes music, including a song for Chachamaru's album
	<em>Air</em>
	; several songs for Yellow Fried Chickenz first album; a song for Pokota's
	album
	<em>Lady Imagination</em>
	; and several songs for S.Q.F. See his
	<a href="/discography/full-discography">full discography here</a>
	.
</p>

<h3>Pre-1989</h3>

<p>
	You's first band was a cover band that he formed in high school. They used
	to practice in the evenings either at home or at small studios in Kyoto.
	Shortly after graduating he became a guitarist and writer for another band
	who frequently performed at small venues around Kyoto.
</p>

<p>
	He was also really into motorbikes when he was younger and I believe he
	managed a bike shop with a friend around this time.
</p>

<p>
	In 1989, he met Gackt at the studio his band were using, and eventually they
	became good friends and decided to start a band together.
</p>

<p>
	Read more about
	<a href="/music-career/you-gackt">You & Gackt here</a>
	.
</p>

<h3>
	CAINS:FEEL (1989/93-1995)
	<a href="/music-career/cains-feel" class="text-sm">read more&nbsp;&rarr;</a>
</h3>

<figure>
	<Image alt="CAINS:FEEL" class="pb-4 mx-auto" src={cainsFeel} ratio="45%" />
</figure>

<p>
	CAINS:FEEL was an indie Japanese visual kei (rock/goth) band, formed by You
	and Gackt, and was their first band together.
</p>

<p>
	The majority of songs were written by Gackt and You together at You's house.
	Gackt used to go round in the afternoon and they would stay up writing until
	7am.
</p>

<h3>
	Maracas (1996)
	<a href="/music-career/maracas" class="text-sm">read more&nbsp;&rarr;</a>
</h3>

<figure>
	<Image
		alt="You in Malice Mizer cover band 1996"
		class="pb-4 mx-auto"
		src={maracas} />
</figure>

<p>
	This isn't technically a separate band as they only performed together a
	couple of times, but I thought it was worth including as it's pretty
	interesting.
</p>

<p>
	Maracas was a cover band put together by Gackt as part of Malice Mizer's 4th
	anniversary celebrations. The full line-up included Gackt, You, all of
	Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums)
	and Makoto (another old friend of Gackt's).
</p>

<h3>
	GacktJob (1999-2019)
	<a href="/music-career/gacktjob" class="text-sm">read more&nbsp;&rarr;</a>
</h3>

<figure>
	<Image
		alt="GacktJob around 2001"
		class="pb-4 mx-auto"
		src={gacktjob}
		ratio="67%" />
</figure>

<p>
	As soon as Gackt decided to go solo, he called You up to ask him to join his
	support band, and shortly after You moved to Tokyo to join him. It was
	around this time that he learnt how to play violin and piano, on Gackt's
	recommendation.
</p>

<p>
	You has been in JOB from the beginning of Gackt's solo career, first
	recording in LA in January 1999.
</p>

<p>
	Alongside guitar and violin, he also provides vocals on
	<em>Dybbuk</em>
	from the album
	<em>Crescent</em>
	, and on
	<em>Redemption</em>
	from the
	<em>Dirge of Cerberus: Final Fantasy VII</em>
	soundtrack.
</p>

<p>
	You last performed live with Gackt in 2019 at Yokohama Pacifico, and since
	2020 Gackt has a new band at live shows. However, Gackt has said that You
	(and Chacha) are still part of his family, and they will perform together
	again in the future. You still attends Gackt's performances as JOB 'alumni'.
</p>

<h3>Yellow Fried Chickenz (2010-2012)</h3>

<figure>
	<Image
		alt="Yellow Fried Chickenz"
		class="pb-4 mx-auto"
		src={yfc}
		ratio="50%" />
</figure>

<p>
	Yellow Fried Chickenz (also known as "YFC" or "YFCz") began as a project by
	Gackt to express "the cowardice in men's souls", increase the amount of good
	men in the world or as an attempt to 'form'/celebrate men's spirit (don't
	ask me to explain, all sounds very ~Gackt~). They released one studio album,
	one 'best of' album, a couple of singles, a live album from their first
	European tour and a couple of DVDs.
</p>

<p>
	A highlight during YFC's time was their two European tours, where they
	performed at sold out venues in London, Paris, Barcelona, Munich, Bochum,
	Cologne, Amsterdam, Berlin, Budapest, Warsaw, Leipzig, Stockholm and Moscow.
	This was Gackt's (and his band's) first time successfully touring outside of
	Asia. A European tour documentary,
	<em>
		The Graffiti - Attack of The "Yellow Fried Chickenz" in Europe - "I Love
		You All"
	</em>
	was released on DVD in 2011.
</p>

<h3>S.Q.F (2013-2018)</h3>

<figure>
	<Image alt="S.Q.F" class="pb-4 mx-auto" src={sqf} />
</figure>

<p>
	S.Q.F is a Japanese band formed in 2000 by ex-Maschera vocalist Michi and
	was originally Michi's solo project, with ex-iLLUMINA guitarist, Nao. The
	name S.Q.F stands for "Spinning Q Factor."
</p>

<p>
	You was a support band member from 2013 to 2018, playing guitar at their
	live shows and on studio recordings, as well as writing some of their more
	recent songs.
</p>

<h3>Luscious (2018-present)</h3>

<figure>
	<Image alt="Luscious" class="pb-4 mx-auto" src={luscious} ratio="60%" />
</figure>

<p>
	Luscious is a Japanese band formed by
	<Link href="https://twitter.com/CHACHAMARU_YFCz">
		Chachamaru (Yukihiro Fujimura)
	</Link>
	, and includes Chacha on vocals and guitar, You on guitar,
	<Link href="https://twitter.com/Satos_Cafe_Bar">Sato</Link>
	(ex. GacktJob, LiSA) on bass and
	<Link href="https://twitter.com/DuelJewel_val">Val</Link>
	(ex. GacktJob, DuelJewel) on drums. They have performed at several events
	alongside Chacha's other band, Ded Chaplin.
</p>

<p>
	Chacha posts about Luscious on his Twitter account and often streams on
	<Link href="https://twitcasting.tv/chachamaru_yfcz">TwitCasting</Link>
	with the other band members.
</p>

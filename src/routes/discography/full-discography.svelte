<script context="module" lang="ts">
	export const prerender = true;
	
	let albumsTable: HTMLElement, albumsFade: HTMLElement, singlesTable: HTMLElement, singlesFade: HTMLElement, dvdsTable: HTMLElement, dvdsFade: HTMLElement;

	function handleGradientVisibility(el: HTMLElement, fadeEl: HTMLElement) {
		if (!el || !fadeEl) return;

		fadeEl.classList.remove('hidden');

		const isOverThreshold: Boolean = (el.scrollWidth - el.scrollLeft) - el.offsetWidth <= 10;
		// const isScrolledToEnd: Boolean = el.scrollWidth - el.scrollLeft == el.offsetWidth;

		if (isOverThreshold) fadeEl.classList.add('hidden');
	}

	import { title } from "../../store";
	export let pageTitle: string = 'Full Discography';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<style lang="postcss">
	.table-container {
		@apply relative;
	}

	.table-scroll {
		@apply w-full overflow-x-auto pr-20;
	}

	.table-fade {
		@apply absolute top-0 bottom-0 right-0 z-50 w-20 bg-gradient-to-r from-transparent to-white md:hidden;
	}

	table {
		@apply mb-4 text-sm;
	}

	th {
		@apply bg-green-100;
	}

	th, td {
		@apply border border-green-500 px-4 py-2;
	}

	td em {
		@apply text-xs;
	}
</style>

<h2>{pageTitle}</h2>

<h3 id="studio-albums">Studio Albums</h3>
<div class="table-container">
	<div class="table-fade" bind:this={albumsFade}></div>
	<div class="table-scroll" bind:this={albumsTable} on:scroll={() => handleGradientVisibility(albumsTable, albumsFade)}>
		<table>
			<thead>
				<tr>
					<th>Year</th>
					<th>Title</th>
					<th>Artist</th>
					<th>Credits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1994</td>
					<td>CAINS:FEEL<br> <em>demo tape</em></td>
					<td>CAINS:FEEL</td>
					<td>Guitar, writer</td>
				</tr>
				<tr>
					<td>1999</td>
					<td>Mizérable</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2000</td>
					<td>Mars</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2001</td>
					<td>Rebirth</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2002</td>
					<td>Moon</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2002</td>
					<td>Air</td>
					<td>Chachamaru</td>
					<td>Writer (<em>Metamorphose</em>)</td>
				</tr>
				<tr>
					<td>2003</td>
					<td>Crescent</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2004</td>
					<td>The Seventh Night ~Unplugged~</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2005</td>
					<td>Love Letter</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2005</td>
					<td>Diabolos</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2009</td>
					<td>Re:Born</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2010</td>
					<td>Are You "Fried Chickenz"??</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2012</td>
					<td>Yellow Fried Chickenz I</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar, writer (<em>Circle</em>, <em>Mata kokode aimassho</em>, <em>Not Alone - Kimi Wa Hitori Ja Nai</em>)</td>
				</tr>
				<tr>
					<td>2014</td>
					<td>Lady Imagination</td>
					<td>Pokota</td>
					<td>Writer (<em>white love</em>)</td>
				</tr>
				<tr>
					<td>2016</td>
					<td>Last Moon</td>
					<td>Gackt</td>
					<td>Guitar, violin,<br>arrangement, programming</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<h3 id="singles">Singles</h3>
<div class="table-container">
	<div class="table-fade" bind:this={singlesFade}></div>
	<div class="table-scroll" bind:this={singlesTable} on:scroll={() => handleGradientVisibility(singlesTable, singlesFade)}>
		<table>
			<thead>
				<tr>
					<th>Year</th>
					<th>Title</th>
					<th>Artist</th>
					<th>Credits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1994</td>
					<td>-Lie-</td>
					<td>CAINS:FEEL</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>1999-2016</td>
					<td><em>Titles coming soon</em></td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2011</td>
					<td>All My Love / You Are the Reason</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2011</td>
					<td>The End of the Day</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2016</td>
					<td>Winter Express</td>
					<td>S.Q.F</td>
					<td>Guitar, writer</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>Egoistic Game</td>
					<td>S.Q.F</td>
					<td>Guitar, writer</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>ETERNAL CHILD</td>
					<td>S.Q.F</td>
					<td>Guitar, writer</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>PARADIGM SHIFT</td>
					<td>S.Q.F</td>
					<td>Guitar, writer</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>iDOL</td>
					<td>S.Q.F</td>
					<td>Guitar, writer</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<h3 id="live-music-dvds">Live Music DVDs</h3>
<div class="table-container">
	<div class="table-fade" bind:this={dvdsFade}></div>
	<div class="table-scroll" bind:this={dvdsTable} on:scroll={() => handleGradientVisibility(dvdsTable, dvdsFade)}>
		<table>
			<thead>
				<tr>
					<th>Year</th>
					<th>Title</th>
					<th>Artist</th>
					<th>Credits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>2000</td>
					<td>Mars Sora Kara no Homonsha: Kaisō</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2001</td>
					<td>Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2003</td>
					<td>Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2003</td>
					<td>Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2004</td>
					<td>Live Tour 2004 The Sixth Day & Seventh Night (Final)</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2006</td>
					<td>Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2007</td>
					<td>Training Days 2006 Drug Party</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2010</td>
					<td>Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2011</td>
					<td>YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2011</td>
					<td>The Graffiti - Attack of The "Yellow Fried Chickenz" in Europe - "I Love You All"</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2012</td>
					<td>WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2012</td>
					<td>WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td>Yellow Fried Chickenz</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2013</td>
					<td>Best of the Best I - 40th Birthday</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2013</td>
					<td>Best of the Best I - Xtasy</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2014</td>
					<td>2013 Kamui Gakuen de Semena Sai</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2015</td>
					<td>2014 Kamui Gakuen de Matomena Sai</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2016</td>
					<td>2015 Camui G School de Dashitekudasai</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>2016 Last Visualive Saigo no Tsuki</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2017</td>
					<td>OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td>S.Q.F</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2018</td>
					<td>MMQ2017</td>
					<td>S.Q.F</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2018</td>
					<td>Sirque Du Freak 2018 - The Resonance -</td>
					<td>S.Q.F</td>
					<td>Guitar</td>
				</tr>
				<tr>
					<td>2018</td>
					<td>GACKT’s -45th Birthday Concert- LAST SONGS</td>
					<td>Gackt</td>
					<td>Guitar, violin</td>
				</tr>
				<tr>
					<td>2020</td>
					<td>95th Kamui ♂︎ Raku "Garden de Tobina Festival ~ 10th Anniversary..."</td>
					<td>Gackt</td>
					<td>Guitar</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<p><a href="/discography">&larr; Back to Discography</a></p>
import { c as create_ssr_component, b as subscribe, e as escape, d as add_attribute } from "../../../../chunks/index.js";
import { t as title } from "../../../../chunks/store.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".table-container.svelte-1pf9uxu.svelte-1pf9uxu{position:relative\n}.table-scroll.svelte-1pf9uxu.svelte-1pf9uxu{width:100%;overflow-x:auto;padding-right:5rem\n}.table-fade.svelte-1pf9uxu.svelte-1pf9uxu{position:absolute;top:0px;bottom:0px;right:0px;z-index:50;width:5rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:transparent;--tw-gradient-to:rgb(0 0 0 / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#fff\n}@media(min-width: 768px){.table-fade.svelte-1pf9uxu.svelte-1pf9uxu{display:none\n    }}table.svelte-1pf9uxu.svelte-1pf9uxu{margin-bottom:1rem;font-size:0.875rem;line-height:1.25rem\n}th.svelte-1pf9uxu.svelte-1pf9uxu{--tw-bg-opacity:1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))\n}th.svelte-1pf9uxu.svelte-1pf9uxu,td.svelte-1pf9uxu.svelte-1pf9uxu{border-width:1px;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}td.svelte-1pf9uxu em.svelte-1pf9uxu{font-size:0.75rem;line-height:1rem\n}",
  map: null
};
const prerender = true;
let albumsTable, albumsFade, singlesTable, singlesFade, dvdsTable, dvdsFade;
let pageTitle = "Full Discography";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}



<h2>${escape(pageTitle)}</h2>

<h3 id="${"studio-albums"}">Studio Albums</h3>
<div class="${"table-container svelte-1pf9uxu"}"><div class="${"table-fade svelte-1pf9uxu"}"${add_attribute("this", albumsFade, 0)}></div>
	<div class="${"table-scroll svelte-1pf9uxu"}"${add_attribute("this", albumsTable, 0)}><table class="${"svelte-1pf9uxu"}"><thead><tr><th class="${"svelte-1pf9uxu"}">Year</th>
					<th class="${"svelte-1pf9uxu"}">Title</th>
					<th class="${"svelte-1pf9uxu"}">Artist</th>
					<th class="${"svelte-1pf9uxu"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-1pf9uxu"}">1994</td>
					<td class="${"svelte-1pf9uxu"}">CAINS:FEEL<br> <em class="${"svelte-1pf9uxu"}">demo tape</em></td>
					<td class="${"svelte-1pf9uxu"}">CAINS:FEEL</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">1999</td>
					<td class="${"svelte-1pf9uxu"}">Mizérable</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2000</td>
					<td class="${"svelte-1pf9uxu"}">Mars</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2001</td>
					<td class="${"svelte-1pf9uxu"}">Rebirth</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2002</td>
					<td class="${"svelte-1pf9uxu"}">Moon</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2002</td>
					<td class="${"svelte-1pf9uxu"}">Air</td>
					<td class="${"svelte-1pf9uxu"}">Chachamaru</td>
					<td class="${"svelte-1pf9uxu"}">Writer (<em class="${"svelte-1pf9uxu"}">Metamorphose</em>)</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2003</td>
					<td class="${"svelte-1pf9uxu"}">Crescent</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2004</td>
					<td class="${"svelte-1pf9uxu"}">The Seventh Night ~Unplugged~</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2005</td>
					<td class="${"svelte-1pf9uxu"}">Love Letter</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2005</td>
					<td class="${"svelte-1pf9uxu"}">Diabolos</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2009</td>
					<td class="${"svelte-1pf9uxu"}">Re:Born</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2010</td>
					<td class="${"svelte-1pf9uxu"}">Are You &quot;Fried Chickenz&quot;??</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2012</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz I</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer (<em class="${"svelte-1pf9uxu"}">Circle</em>, <em class="${"svelte-1pf9uxu"}">Mata kokode aimassho</em>, <em class="${"svelte-1pf9uxu"}">Not Alone - Kimi Wa Hitori Ja Nai</em>)</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2014</td>
					<td class="${"svelte-1pf9uxu"}">Lady Imagination</td>
					<td class="${"svelte-1pf9uxu"}">Pokota</td>
					<td class="${"svelte-1pf9uxu"}">Writer (<em class="${"svelte-1pf9uxu"}">white love</em>)</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2016</td>
					<td class="${"svelte-1pf9uxu"}">Last Moon</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin,<br>arrangement, programming</td></tr></tbody></table></div></div>

<h3 id="${"singles"}">Singles</h3>
<div class="${"table-container svelte-1pf9uxu"}"><div class="${"table-fade svelte-1pf9uxu"}"${add_attribute("this", singlesFade, 0)}></div>
	<div class="${"table-scroll svelte-1pf9uxu"}"${add_attribute("this", singlesTable, 0)}><table class="${"svelte-1pf9uxu"}"><thead><tr><th class="${"svelte-1pf9uxu"}">Year</th>
					<th class="${"svelte-1pf9uxu"}">Title</th>
					<th class="${"svelte-1pf9uxu"}">Artist</th>
					<th class="${"svelte-1pf9uxu"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-1pf9uxu"}">1994</td>
					<td class="${"svelte-1pf9uxu"}">-Lie-</td>
					<td class="${"svelte-1pf9uxu"}">CAINS:FEEL</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">1999-2016</td>
					<td class="${"svelte-1pf9uxu"}"><em class="${"svelte-1pf9uxu"}">Titles coming soon</em></td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2011</td>
					<td class="${"svelte-1pf9uxu"}">All My Love / You Are the Reason</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2011</td>
					<td class="${"svelte-1pf9uxu"}">The End of the Day</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2016</td>
					<td class="${"svelte-1pf9uxu"}">Winter Express</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">Egoistic Game</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">ETERNAL CHILD</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">PARADIGM SHIFT</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">iDOL</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, writer</td></tr></tbody></table></div></div>

<h3 id="${"live-music-dvds"}">Live Music DVDs</h3>
<div class="${"table-container svelte-1pf9uxu"}"><div class="${"table-fade svelte-1pf9uxu"}"${add_attribute("this", dvdsFade, 0)}></div>
	<div class="${"table-scroll svelte-1pf9uxu"}"${add_attribute("this", dvdsTable, 0)}><table class="${"svelte-1pf9uxu"}"><thead><tr><th class="${"svelte-1pf9uxu"}">Year</th>
					<th class="${"svelte-1pf9uxu"}">Title</th>
					<th class="${"svelte-1pf9uxu"}">Artist</th>
					<th class="${"svelte-1pf9uxu"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-1pf9uxu"}">2000</td>
					<td class="${"svelte-1pf9uxu"}">Mars Sora Kara no Homonsha: Kaisō</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2001</td>
					<td class="${"svelte-1pf9uxu"}">Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2003</td>
					<td class="${"svelte-1pf9uxu"}">Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2003</td>
					<td class="${"svelte-1pf9uxu"}">Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2004</td>
					<td class="${"svelte-1pf9uxu"}">Live Tour 2004 The Sixth Day &amp; Seventh Night (Final)</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2006</td>
					<td class="${"svelte-1pf9uxu"}">Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2007</td>
					<td class="${"svelte-1pf9uxu"}">Training Days 2006 Drug Party</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2010</td>
					<td class="${"svelte-1pf9uxu"}">Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2011</td>
					<td class="${"svelte-1pf9uxu"}">YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2011</td>
					<td class="${"svelte-1pf9uxu"}">The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2012</td>
					<td class="${"svelte-1pf9uxu"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2012</td>
					<td class="${"svelte-1pf9uxu"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td class="${"svelte-1pf9uxu"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2013</td>
					<td class="${"svelte-1pf9uxu"}">Best of the Best I - 40th Birthday</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2013</td>
					<td class="${"svelte-1pf9uxu"}">Best of the Best I - Xtasy</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2014</td>
					<td class="${"svelte-1pf9uxu"}">2013 Kamui Gakuen de Semena Sai</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2015</td>
					<td class="${"svelte-1pf9uxu"}">2014 Kamui Gakuen de Matomena Sai</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2016</td>
					<td class="${"svelte-1pf9uxu"}">2015 Camui G School de Dashitekudasai</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">2016 Last Visualive Saigo no Tsuki</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2017</td>
					<td class="${"svelte-1pf9uxu"}">OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2018</td>
					<td class="${"svelte-1pf9uxu"}">MMQ2017</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2018</td>
					<td class="${"svelte-1pf9uxu"}">Sirque Du Freak 2018 - The Resonance -</td>
					<td class="${"svelte-1pf9uxu"}">S.Q.F</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2018</td>
					<td class="${"svelte-1pf9uxu"}">GACKT’s -45th Birthday Concert- LAST SONGS</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-1pf9uxu"}">2020</td>
					<td class="${"svelte-1pf9uxu"}">95th Kamui ♂︎ Raku &quot;Garden de Tobina Festival ~ 10th Anniversary...&quot;</td>
					<td class="${"svelte-1pf9uxu"}">Gackt</td>
					<td class="${"svelte-1pf9uxu"}">Guitar</td></tr></tbody></table></div></div>

<p><a href="${"/discography"}">← Back to Discography</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

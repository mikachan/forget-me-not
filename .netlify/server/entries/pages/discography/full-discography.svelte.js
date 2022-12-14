var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Full_discography,
  pageTitle: () => pageTitle,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("../../../chunks/index-db852415.js");
var import_store_e0ef4c58 = require("../../../chunks/store-e0ef4c58.js");
var import_index_652f602f = require("../../../chunks/index-652f602f.js");
var fullDiscography_svelte_svelte_type_style_lang = "";
const css = {
  code: ".table-container.svelte-328rti.svelte-328rti{position:relative\n}.table-scroll.svelte-328rti.svelte-328rti{width:100%;overflow-x:auto;padding-right:5rem\n}.table-fade.svelte-328rti.svelte-328rti{position:absolute;top:0px;bottom:0px;right:0px;z-index:50;width:5rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:transparent;--tw-gradient-to:rgb(0 0 0 / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#fff\n}@media(min-width: 768px){.table-fade.svelte-328rti.svelte-328rti{display:none\n    }}table.svelte-328rti.svelte-328rti{margin-bottom:1rem;font-size:0.875rem;line-height:1.25rem\n}th.svelte-328rti.svelte-328rti{--tw-bg-opacity:1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))\n}th.svelte-328rti.svelte-328rti,td.svelte-328rti.svelte-328rti{border-width:1px;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}td.svelte-328rti em.svelte-328rti{font-size:0.75rem;line-height:1rem\n}",
  map: null
};
const prerender = true;
let albumsTable, albumsFade, singlesTable, singlesFade, dvdsTable, dvdsFade;
let pageTitle = "Full Discography";
import_store_e0ef4c58.t.set(pageTitle);
const Full_discography = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_db852415.a)(import_store_e0ef4c58.t, (value) => $title = value);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${(0, import_index_db852415.e)($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}



<h2>${(0, import_index_db852415.e)(pageTitle)}</h2>

<h3 id="${"studio-albums"}">Studio Albums</h3>
<div class="${"table-container svelte-328rti"}"><div class="${"table-fade svelte-328rti"}"${(0, import_index_db852415.b)("this", albumsFade, 0)}></div>
	<div class="${"table-scroll svelte-328rti"}"${(0, import_index_db852415.b)("this", albumsTable, 0)}><table class="${"svelte-328rti"}"><thead><tr><th class="${"svelte-328rti"}">Year</th>
					<th class="${"svelte-328rti"}">Title</th>
					<th class="${"svelte-328rti"}">Artist</th>
					<th class="${"svelte-328rti"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-328rti"}">1994</td>
					<td class="${"svelte-328rti"}">CAINS:FEEL<br> <em class="${"svelte-328rti"}">demo tape</em></td>
					<td class="${"svelte-328rti"}">CAINS:FEEL</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-328rti"}">1999</td>
					<td class="${"svelte-328rti"}">Miz\xE9rable</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2000</td>
					<td class="${"svelte-328rti"}">Mars</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2001</td>
					<td class="${"svelte-328rti"}">Rebirth</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2002</td>
					<td class="${"svelte-328rti"}">Moon</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2002</td>
					<td class="${"svelte-328rti"}">Air</td>
					<td class="${"svelte-328rti"}">Chachamaru</td>
					<td class="${"svelte-328rti"}">Writer (<em class="${"svelte-328rti"}">Metamorphose</em>)</td></tr>
				<tr><td class="${"svelte-328rti"}">2003</td>
					<td class="${"svelte-328rti"}">Crescent</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2004</td>
					<td class="${"svelte-328rti"}">The Seventh Night ~Unplugged~</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2005</td>
					<td class="${"svelte-328rti"}">Love Letter</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2005</td>
					<td class="${"svelte-328rti"}">Diabolos</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2009</td>
					<td class="${"svelte-328rti"}">Re:Born</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2010</td>
					<td class="${"svelte-328rti"}">Are You &quot;Fried Chickenz&quot;??</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2012</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz I</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar, writer (<em class="${"svelte-328rti"}">Circle</em>, <em class="${"svelte-328rti"}">Mata kokode aimassho</em>, <em class="${"svelte-328rti"}">Not Alone - Kimi Wa Hitori Ja Nai</em>)</td></tr>
				<tr><td class="${"svelte-328rti"}">2014</td>
					<td class="${"svelte-328rti"}">Lady Imagination</td>
					<td class="${"svelte-328rti"}">Pokota</td>
					<td class="${"svelte-328rti"}">Writer (<em class="${"svelte-328rti"}">white love</em>)</td></tr>
				<tr><td class="${"svelte-328rti"}">2016</td>
					<td class="${"svelte-328rti"}">Last Moon</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin,<br>arrangement, programming</td></tr></tbody></table></div></div>

<h3 id="${"singles"}">Singles</h3>
<div class="${"table-container svelte-328rti"}"><div class="${"table-fade svelte-328rti"}"${(0, import_index_db852415.b)("this", singlesFade, 0)}></div>
	<div class="${"table-scroll svelte-328rti"}"${(0, import_index_db852415.b)("this", singlesTable, 0)}><table class="${"svelte-328rti"}"><thead><tr><th class="${"svelte-328rti"}">Year</th>
					<th class="${"svelte-328rti"}">Title</th>
					<th class="${"svelte-328rti"}">Artist</th>
					<th class="${"svelte-328rti"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-328rti"}">1994</td>
					<td class="${"svelte-328rti"}">-Lie-</td>
					<td class="${"svelte-328rti"}">CAINS:FEEL</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">1999-2016</td>
					<td class="${"svelte-328rti"}"><em class="${"svelte-328rti"}">Titles coming soon</em></td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2011</td>
					<td class="${"svelte-328rti"}">All My Love / You Are the Reason</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2011</td>
					<td class="${"svelte-328rti"}">The End of the Day</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2016</td>
					<td class="${"svelte-328rti"}">Winter Express</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">Egoistic Game</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">ETERNAL CHILD</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">PARADIGM SHIFT</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">iDOL</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar, writer</td></tr></tbody></table></div></div>

<h3 id="${"live-music-dvds"}">Live Music DVDs</h3>
<div class="${"table-container svelte-328rti"}"><div class="${"table-fade svelte-328rti"}"${(0, import_index_db852415.b)("this", dvdsFade, 0)}></div>
	<div class="${"table-scroll svelte-328rti"}"${(0, import_index_db852415.b)("this", dvdsTable, 0)}><table class="${"svelte-328rti"}"><thead><tr><th class="${"svelte-328rti"}">Year</th>
					<th class="${"svelte-328rti"}">Title</th>
					<th class="${"svelte-328rti"}">Artist</th>
					<th class="${"svelte-328rti"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-328rti"}">2000</td>
					<td class="${"svelte-328rti"}">Mars Sora Kara no Homonsha: Kais\u014D</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2001</td>
					<td class="${"svelte-328rti"}">Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2003</td>
					<td class="${"svelte-328rti"}">Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2003</td>
					<td class="${"svelte-328rti"}">Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2004</td>
					<td class="${"svelte-328rti"}">Live Tour 2004 The Sixth Day &amp; Seventh Night (Final)</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2006</td>
					<td class="${"svelte-328rti"}">Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2007</td>
					<td class="${"svelte-328rti"}">Training Days 2006 Drug Party</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2010</td>
					<td class="${"svelte-328rti"}">Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2011</td>
					<td class="${"svelte-328rti"}">YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2011</td>
					<td class="${"svelte-328rti"}">The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2012</td>
					<td class="${"svelte-328rti"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2012</td>
					<td class="${"svelte-328rti"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td class="${"svelte-328rti"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2013</td>
					<td class="${"svelte-328rti"}">Best of the Best I - 40th Birthday</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2013</td>
					<td class="${"svelte-328rti"}">Best of the Best I - Xtasy</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2014</td>
					<td class="${"svelte-328rti"}">2013 Kamui Gakuen de Semena Sai</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2015</td>
					<td class="${"svelte-328rti"}">2014 Kamui Gakuen de Matomena Sai</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2016</td>
					<td class="${"svelte-328rti"}">2015 Camui G School de Dashitekudasai</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">2016 Last Visualive Saigo no Tsuki</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2017</td>
					<td class="${"svelte-328rti"}">OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2018</td>
					<td class="${"svelte-328rti"}">MMQ2017</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2018</td>
					<td class="${"svelte-328rti"}">Sirque Du Freak 2018 - The Resonance -</td>
					<td class="${"svelte-328rti"}">S.Q.F</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr>
				<tr><td class="${"svelte-328rti"}">2018</td>
					<td class="${"svelte-328rti"}">GACKT\u2019s -45th Birthday Concert- LAST SONGS</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-328rti"}">2020</td>
					<td class="${"svelte-328rti"}">95th Kamui \u2642\uFE0E Raku &quot;Garden de Tobina Festival ~ 10th Anniversary...&quot;</td>
					<td class="${"svelte-328rti"}">Gackt</td>
					<td class="${"svelte-328rti"}">Guitar</td></tr></tbody></table></div></div>

<p><a href="${"/discography"}">\u2190 Back to Discography</a></p>`;
});

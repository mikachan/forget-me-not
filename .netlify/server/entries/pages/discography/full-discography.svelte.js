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
var import_index_511eca88 = require("../../../chunks/index-511eca88.js");
var import_store_57e59034 = require("../../../chunks/store-57e59034.js");
var import_index_cea261f0 = require("../../../chunks/index-cea261f0.js");
var fullDiscography_svelte_svelte_type_style_lang = "";
const css = {
  code: ".table-container.svelte-4rpisw.svelte-4rpisw{position:relative\n}.table-scroll.svelte-4rpisw.svelte-4rpisw{width:100%;overflow-x:auto;padding-right:5rem\n}.table-fade.svelte-4rpisw.svelte-4rpisw{position:absolute;top:0px;bottom:0px;right:0px;z-index:50;width:5rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:transparent;--tw-gradient-to:rgb(0 0 0 / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#fff\n}@media(min-width: 768px){.table-fade.svelte-4rpisw.svelte-4rpisw{display:none\n    }}table.svelte-4rpisw.svelte-4rpisw{margin-bottom:1rem;font-size:0.875rem;line-height:1.25rem\n}th.svelte-4rpisw.svelte-4rpisw{--tw-bg-opacity:1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))\n}th.svelte-4rpisw.svelte-4rpisw,td.svelte-4rpisw.svelte-4rpisw{border-width:1px;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}td.svelte-4rpisw em.svelte-4rpisw{font-size:0.75rem;line-height:1rem\n}",
  map: null
};
const prerender = true;
let albumsTable, albumsFade, singlesTable, singlesFade, dvdsTable, dvdsFade;
let pageTitle = "Full Discography";
import_store_57e59034.t.set(pageTitle);
const Full_discography = (0, import_index_511eca88.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_511eca88.a)(import_store_57e59034.t, (value) => $title = value);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_511eca88.e)($title)}</title>`, ""}`, ""}



<h2>${(0, import_index_511eca88.e)(pageTitle)}</h2>

<h3 id="${"studio-albums"}">Studio Albums</h3>
<div class="${"table-container svelte-4rpisw"}"><div class="${"table-fade svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", albumsFade, 0)}></div>
	<div class="${"table-scroll svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", albumsTable, 0)}><table class="${"svelte-4rpisw"}"><thead><tr><th class="${"svelte-4rpisw"}">Year</th>
					<th class="${"svelte-4rpisw"}">Title</th>
					<th class="${"svelte-4rpisw"}">Artist</th>
					<th class="${"svelte-4rpisw"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-4rpisw"}">1994</td>
					<td class="${"svelte-4rpisw"}">CAINS:FEEL<br> <em class="${"svelte-4rpisw"}">demo tape</em></td>
					<td class="${"svelte-4rpisw"}">CAINS:FEEL</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-4rpisw"}">1999</td>
					<td class="${"svelte-4rpisw"}">Miz\xE9rable</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2000</td>
					<td class="${"svelte-4rpisw"}">Mars</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2001</td>
					<td class="${"svelte-4rpisw"}">Rebirth</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2002</td>
					<td class="${"svelte-4rpisw"}">Moon</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2002</td>
					<td class="${"svelte-4rpisw"}">Air</td>
					<td class="${"svelte-4rpisw"}">Chachamaru</td>
					<td class="${"svelte-4rpisw"}">Writer (<em class="${"svelte-4rpisw"}">Metamorphose</em>)</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2003</td>
					<td class="${"svelte-4rpisw"}">Crescent</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2004</td>
					<td class="${"svelte-4rpisw"}">The Seventh Night ~Unplugged~</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2005</td>
					<td class="${"svelte-4rpisw"}">Love Letter</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2005</td>
					<td class="${"svelte-4rpisw"}">Diabolos</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2009</td>
					<td class="${"svelte-4rpisw"}">Re:Born</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2010</td>
					<td class="${"svelte-4rpisw"}">Are You &quot;Fried Chickenz&quot;??</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2012</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz I</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer (<em class="${"svelte-4rpisw"}">Circle</em>, <em class="${"svelte-4rpisw"}">Mata kokode aimassho</em>, <em class="${"svelte-4rpisw"}">Not Alone - Kimi Wa Hitori Ja Nai</em>)</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2014</td>
					<td class="${"svelte-4rpisw"}">Lady Imagination</td>
					<td class="${"svelte-4rpisw"}">Pokota</td>
					<td class="${"svelte-4rpisw"}">Writer (<em class="${"svelte-4rpisw"}">white love</em>)</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2016</td>
					<td class="${"svelte-4rpisw"}">Last Moon</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin,<br>arrangement, programming</td></tr></tbody></table></div></div>

<h3 id="${"singles"}">Singles</h3>
<div class="${"table-container svelte-4rpisw"}"><div class="${"table-fade svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", singlesFade, 0)}></div>
	<div class="${"table-scroll svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", singlesTable, 0)}><table class="${"svelte-4rpisw"}"><thead><tr><th class="${"svelte-4rpisw"}">Year</th>
					<th class="${"svelte-4rpisw"}">Title</th>
					<th class="${"svelte-4rpisw"}">Artist</th>
					<th class="${"svelte-4rpisw"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-4rpisw"}">1994</td>
					<td class="${"svelte-4rpisw"}">-Lie-</td>
					<td class="${"svelte-4rpisw"}">CAINS:FEEL</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">1999-2016</td>
					<td class="${"svelte-4rpisw"}"><em class="${"svelte-4rpisw"}">Titles coming soon</em></td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2011</td>
					<td class="${"svelte-4rpisw"}">All My Love / You Are the Reason</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2011</td>
					<td class="${"svelte-4rpisw"}">The End of the Day</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2016</td>
					<td class="${"svelte-4rpisw"}">Winter Express</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">Egoistic Game</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">ETERNAL CHILD</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">PARADIGM SHIFT</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">iDOL</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar, writer</td></tr></tbody></table></div></div>

<h3 id="${"live-music-dvds"}">Live Music DVDs</h3>
<div class="${"table-container svelte-4rpisw"}"><div class="${"table-fade svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", dvdsFade, 0)}></div>
	<div class="${"table-scroll svelte-4rpisw"}"${(0, import_index_511eca88.b)("this", dvdsTable, 0)}><table class="${"svelte-4rpisw"}"><thead><tr><th class="${"svelte-4rpisw"}">Year</th>
					<th class="${"svelte-4rpisw"}">Title</th>
					<th class="${"svelte-4rpisw"}">Artist</th>
					<th class="${"svelte-4rpisw"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-4rpisw"}">2000</td>
					<td class="${"svelte-4rpisw"}">Mars Sora Kara no Homonsha: Kais\u014D</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2001</td>
					<td class="${"svelte-4rpisw"}">Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2003</td>
					<td class="${"svelte-4rpisw"}">Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2003</td>
					<td class="${"svelte-4rpisw"}">Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2004</td>
					<td class="${"svelte-4rpisw"}">Live Tour 2004 The Sixth Day &amp; Seventh Night (Final)</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2006</td>
					<td class="${"svelte-4rpisw"}">Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2007</td>
					<td class="${"svelte-4rpisw"}">Training Days 2006 Drug Party</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2010</td>
					<td class="${"svelte-4rpisw"}">Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2011</td>
					<td class="${"svelte-4rpisw"}">YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2011</td>
					<td class="${"svelte-4rpisw"}">The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2012</td>
					<td class="${"svelte-4rpisw"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2012</td>
					<td class="${"svelte-4rpisw"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td class="${"svelte-4rpisw"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2013</td>
					<td class="${"svelte-4rpisw"}">Best of the Best I - 40th Birthday</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2013</td>
					<td class="${"svelte-4rpisw"}">Best of the Best I - Xtasy</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2014</td>
					<td class="${"svelte-4rpisw"}">2013 Kamui Gakuen de Semena Sai</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2015</td>
					<td class="${"svelte-4rpisw"}">2014 Kamui Gakuen de Matomena Sai</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2016</td>
					<td class="${"svelte-4rpisw"}">2015 Camui G School de Dashitekudasai</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">2016 Last Visualive Saigo no Tsuki</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2017</td>
					<td class="${"svelte-4rpisw"}">OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2018</td>
					<td class="${"svelte-4rpisw"}">MMQ2017</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2018</td>
					<td class="${"svelte-4rpisw"}">Sirque Du Freak 2018 - The Resonance -</td>
					<td class="${"svelte-4rpisw"}">S.Q.F</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2018</td>
					<td class="${"svelte-4rpisw"}">GACKT\u2019s -45th Birthday Concert- LAST SONGS</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-4rpisw"}">2020</td>
					<td class="${"svelte-4rpisw"}">95th Kamui \u2642\uFE0E Raku &quot;Garden de Tobina Festival ~ 10th Anniversary...&quot;</td>
					<td class="${"svelte-4rpisw"}">Gackt</td>
					<td class="${"svelte-4rpisw"}">Guitar</td></tr></tbody></table></div></div>

<p><a href="${"/discography"}">\u2190 Back to Discography</a></p>`;
});

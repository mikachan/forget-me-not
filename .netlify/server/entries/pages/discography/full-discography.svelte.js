var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Full_discography
});
var import_index_9861661c = __toModule(require("../../../chunks/index-9861661c.js"));
var import_store_76ccc05c = __toModule(require("../../../chunks/store-76ccc05c.js"));
var import_index_041375b7 = __toModule(require("../../../chunks/index-041375b7.js"));
var fullDiscography_svelte_svelte_type_style_lang = "";
const css = {
  code: ".table-container.svelte-14x1pov.svelte-14x1pov{position:relative\n}.table-scroll.svelte-14x1pov.svelte-14x1pov{width:100%;overflow-x:auto;padding-right:5rem\n}.table-fade.svelte-14x1pov.svelte-14x1pov{position:absolute;top:0px;bottom:0px;right:0px;z-index:50;width:5rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:transparent;--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to, rgb(0 0 0 / 0));--tw-gradient-to:#fff\n}@media(min-width: 768px){.table-fade.svelte-14x1pov.svelte-14x1pov{display:none\n    }}table.svelte-14x1pov.svelte-14x1pov{margin-bottom:1rem;font-size:0.875rem;line-height:1.25rem\n}th.svelte-14x1pov.svelte-14x1pov{--tw-bg-opacity:1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))\n}th.svelte-14x1pov.svelte-14x1pov,td.svelte-14x1pov.svelte-14x1pov{border-width:1px;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}td.svelte-14x1pov em.svelte-14x1pov{font-size:0.75rem;line-height:1rem\n}",
  map: null
};
const Full_discography = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_9861661c.a)(import_store_76ccc05c.t, (value) => $title = value);
  let albumsTable, albumsFade, singlesTable, singlesFade, dvdsTable, dvdsFade;
  let { pageTitle = "Full Discography" } = $$props;
  import_store_76ccc05c.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_9861661c.e)($title)}</title>`, ""}`, ""}



<h2>${(0, import_index_9861661c.e)(pageTitle)}</h2>

<h3 id="${"studio-albums"}">Studio Albums</h3>
<div class="${"table-container svelte-14x1pov"}"><div class="${"table-fade svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", albumsFade, 0)}></div>
	<div class="${"table-scroll svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", albumsTable, 0)}><table class="${"svelte-14x1pov"}"><thead><tr><th class="${"svelte-14x1pov"}">Year</th>
					<th class="${"svelte-14x1pov"}">Title</th>
					<th class="${"svelte-14x1pov"}">Artist</th>
					<th class="${"svelte-14x1pov"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-14x1pov"}">1994</td>
					<td class="${"svelte-14x1pov"}">CAINS:FEEL<br> <em class="${"svelte-14x1pov"}">demo tape</em></td>
					<td class="${"svelte-14x1pov"}">CAINS:FEEL</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-14x1pov"}">1999</td>
					<td class="${"svelte-14x1pov"}">Miz\xE9rable</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2000</td>
					<td class="${"svelte-14x1pov"}">Mars</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2001</td>
					<td class="${"svelte-14x1pov"}">Rebirth</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2002</td>
					<td class="${"svelte-14x1pov"}">Moon</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2002</td>
					<td class="${"svelte-14x1pov"}">Air</td>
					<td class="${"svelte-14x1pov"}">Chachamaru</td>
					<td class="${"svelte-14x1pov"}">Writer (<em class="${"svelte-14x1pov"}">Metamorphose</em>)</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2003</td>
					<td class="${"svelte-14x1pov"}">Crescent</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2004</td>
					<td class="${"svelte-14x1pov"}">The Seventh Night ~Unplugged~</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2005</td>
					<td class="${"svelte-14x1pov"}">Love Letter</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2005</td>
					<td class="${"svelte-14x1pov"}">Diabolos</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2009</td>
					<td class="${"svelte-14x1pov"}">Re:Born</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2010</td>
					<td class="${"svelte-14x1pov"}">Are You &quot;Fried Chickenz&quot;??</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2012</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz I</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer (<em class="${"svelte-14x1pov"}">Circle</em>, <em class="${"svelte-14x1pov"}">Mata kokode aimassho</em>, <em class="${"svelte-14x1pov"}">Not Alone - Kimi Wa Hitori Ja Nai</em>)</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2014</td>
					<td class="${"svelte-14x1pov"}">Lady Imagination</td>
					<td class="${"svelte-14x1pov"}">Pokota</td>
					<td class="${"svelte-14x1pov"}">Writer (<em class="${"svelte-14x1pov"}">white love</em>)</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2016</td>
					<td class="${"svelte-14x1pov"}">Last Moon</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin,<br>arrangement, programming</td></tr></tbody></table></div></div>

<h3 id="${"singles"}">Singles</h3>
<div class="${"table-container svelte-14x1pov"}"><div class="${"table-fade svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", singlesFade, 0)}></div>
	<div class="${"table-scroll svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", singlesTable, 0)}><table class="${"svelte-14x1pov"}"><thead><tr><th class="${"svelte-14x1pov"}">Year</th>
					<th class="${"svelte-14x1pov"}">Title</th>
					<th class="${"svelte-14x1pov"}">Artist</th>
					<th class="${"svelte-14x1pov"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-14x1pov"}">1994</td>
					<td class="${"svelte-14x1pov"}">-Lie-</td>
					<td class="${"svelte-14x1pov"}">CAINS:FEEL</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">1999-2016</td>
					<td class="${"svelte-14x1pov"}"><em class="${"svelte-14x1pov"}">Titles coming soon</em></td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2011</td>
					<td class="${"svelte-14x1pov"}">All My Love / You Are the Reason</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2011</td>
					<td class="${"svelte-14x1pov"}">The End of the Day</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2016</td>
					<td class="${"svelte-14x1pov"}">Winter Express</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">Egoistic Game</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">ETERNAL CHILD</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">PARADIGM SHIFT</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">iDOL</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar, writer</td></tr></tbody></table></div></div>

<h3 id="${"live-music-dvds"}">Live Music DVDs</h3>
<div class="${"table-container svelte-14x1pov"}"><div class="${"table-fade svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", dvdsFade, 0)}></div>
	<div class="${"table-scroll svelte-14x1pov"}"${(0, import_index_9861661c.b)("this", dvdsTable, 0)}><table class="${"svelte-14x1pov"}"><thead><tr><th class="${"svelte-14x1pov"}">Year</th>
					<th class="${"svelte-14x1pov"}">Title</th>
					<th class="${"svelte-14x1pov"}">Artist</th>
					<th class="${"svelte-14x1pov"}">Credits</th></tr></thead>
			<tbody><tr><td class="${"svelte-14x1pov"}">2000</td>
					<td class="${"svelte-14x1pov"}">Mars Sora Kara no Homonsha: Kais\u014D</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2001</td>
					<td class="${"svelte-14x1pov"}">Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2003</td>
					<td class="${"svelte-14x1pov"}">Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2003</td>
					<td class="${"svelte-14x1pov"}">Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2004</td>
					<td class="${"svelte-14x1pov"}">Live Tour 2004 The Sixth Day &amp; Seventh Night (Final)</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2006</td>
					<td class="${"svelte-14x1pov"}">Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2007</td>
					<td class="${"svelte-14x1pov"}">Training Days 2006 Drug Party</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2010</td>
					<td class="${"svelte-14x1pov"}">Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2011</td>
					<td class="${"svelte-14x1pov"}">YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2011</td>
					<td class="${"svelte-14x1pov"}">The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2012</td>
					<td class="${"svelte-14x1pov"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2012</td>
					<td class="${"svelte-14x1pov"}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td class="${"svelte-14x1pov"}">Yellow Fried Chickenz</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2013</td>
					<td class="${"svelte-14x1pov"}">Best of the Best I - 40th Birthday</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2013</td>
					<td class="${"svelte-14x1pov"}">Best of the Best I - Xtasy</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2014</td>
					<td class="${"svelte-14x1pov"}">2013 Kamui Gakuen de Semena Sai</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2015</td>
					<td class="${"svelte-14x1pov"}">2014 Kamui Gakuen de Matomena Sai</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2016</td>
					<td class="${"svelte-14x1pov"}">2015 Camui G School de Dashitekudasai</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">2016 Last Visualive Saigo no Tsuki</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2017</td>
					<td class="${"svelte-14x1pov"}">OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2018</td>
					<td class="${"svelte-14x1pov"}">MMQ2017</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2018</td>
					<td class="${"svelte-14x1pov"}">Sirque Du Freak 2018 - The Resonance -</td>
					<td class="${"svelte-14x1pov"}">S.Q.F</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2018</td>
					<td class="${"svelte-14x1pov"}">GACKT\u2019s -45th Birthday Concert- LAST SONGS</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar, violin</td></tr>
				<tr><td class="${"svelte-14x1pov"}">2020</td>
					<td class="${"svelte-14x1pov"}">95th Kamui \u2642\uFE0E Raku &quot;Garden de Tobina Festival ~ 10th Anniversary...&quot;</td>
					<td class="${"svelte-14x1pov"}">Gackt</td>
					<td class="${"svelte-14x1pov"}">Guitar</td></tr></tbody></table></div></div>

<p><a href="${"/discography"}">\u2190 Back to Discography</a></p>`;
});

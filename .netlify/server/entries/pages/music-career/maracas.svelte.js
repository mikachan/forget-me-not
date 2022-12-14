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
  default: () => Maracas
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("../../../chunks/index-db852415.js");
var import_Link_a57e5296 = require("../../../chunks/Link-a57e5296.js");
var import_Image_573146f4 = require("../../../chunks/Image-573146f4.js");
var import_mm_a4a68d6c = require("../../../chunks/1996-mm-a4a68d6c.js");
var import_store_e0ef4c58 = require("../../../chunks/store-e0ef4c58.js");
var import_blurhash = require("blurhash");
var import_index_652f602f = require("../../../chunks/index-652f602f.js");
const Maracas = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_db852415.a)(import_store_e0ef4c58.t, (value) => $title = value);
  let { pageTitle = "Maracas" } = $$props;
  import_store_e0ef4c58.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${(0, import_index_db852415.e)($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${(0, import_index_db852415.e)(pageTitle)}</h2>

<p>In 1996, Malice Mizer organised a series of events to celebrate their 4th anniversary, called <em>\u559C\u5287\u306E\u6669\u9910~VISUAL ART COLLECTION VOL.1~</em>, made up of performances by cover bands each band member had put together. The first event was held on 8th November 1996 at Shibuya <em>ON AIR WEST</em>, a small venue that holds about 600 people. It was reviewed in <em>Fool&#39;s Mate 02.1997</em>, which is where the photo is from.</p>

<p>Gackt described the cover band he put together in the Malice Mizer fanclub magazine <em>Ma ch\xE9rie</em> (vol. 2&amp;3). He first called ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, {
    href: "https://en.wikipedia.org/wiki/Maschera_(band)"
  }, {}, {
    default: () => {
      return `Maschera`;
    }
  })}, another visual kei band that were active at the time, who were excited to perform with him. He then called You and invited him to perform as well, &quot;We spent 2-3 hours on the phone discussing details, chose the songs to perform and arranged a meeting.&quot;</p>

<figure>${(0, import_index_db852415.v)(import_Image_573146f4.I, "Image").$$render($$result, {
    alt: "You in Malice Mizer cover band 1996",
    class: "pb-4 mx-auto",
    src: import_mm_a4a68d6c.m
  }, {}, {})}</figure>

<p>The final line-up included Gackt, You, all of Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums) and Makoto (another old friend of Gackt&#39;s).</p>

<p>Massive thank you to ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, {
    href: "https://ryuik.livejournal.com/224213.html"
  }, {}, {
    default: () => {
      return `Ryuik`;
    }
  })} for the information and photo.</p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

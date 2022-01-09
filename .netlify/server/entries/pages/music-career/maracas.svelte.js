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
  default: () => Maracas
});
var import_index_430bc4f2 = __toModule(require("../../../chunks/index-430bc4f2.js"));
var import_Link_0d4e9abf = __toModule(require("../../../chunks/Link-0d4e9abf.js"));
var import_Image_097dc189 = __toModule(require("../../../chunks/Image-097dc189.js"));
var import_mm_a4a68d6c = __toModule(require("../../../chunks/1996-mm-a4a68d6c.js"));
var import_store_b286f9a0 = __toModule(require("../../../chunks/store-b286f9a0.js"));
var import_blurhash = __toModule(require("blurhash"));
var import_index_365aa037 = __toModule(require("../../../chunks/index-365aa037.js"));
const Maracas = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_430bc4f2.a)(import_store_b286f9a0.t, (value) => $title = value);
  let { pageTitle = "Maracas" } = $$props;
  import_store_b286f9a0.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_430bc4f2.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_430bc4f2.e)(pageTitle)}</h2>

<p>In 1996, Malice Mizer organised a series of events to celebrate their 4th anniversary, called <em>\u559C\u5287\u306E\u6669\u9910~VISUAL ART COLLECTION VOL.1~</em>, made up of performances by cover bands each band member had put together. The first event was held on 8th November 1996 at Shibuya <em>ON AIR WEST</em>, a small venue that holds about 600 people. It was reviewed in <em>Fool&#39;s Mate 02.1997</em>, which is where the photo is from.</p>

<p>Gackt described the cover band he put together in the Malice Mizer fanclub magazine <em>Ma ch\xE9rie</em> (vol. 2&amp;3). He first called ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://en.wikipedia.org/wiki/Maschera_(band)"
  }, {}, { default: () => `Maschera` })}, another visual kei band that were active at the time, who were excited to perform with him. He then called You and invited him to perform as well, &quot;We spent 2-3 hours on the phone discussing details, chose the songs to perform and arranged a meeting.&quot;</p>

<figure>${(0, import_index_430bc4f2.v)(import_Image_097dc189.I, "Image").$$render($$result, {
    alt: "You in Malice Mizer cover band 1996",
    class: "pb-4 mx-auto",
    src: import_mm_a4a68d6c.m
  }, {}, {})}</figure>

<p>The final line-up included Gackt, You, all of Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums) and Makoto (another old friend of Gackt&#39;s).</p>

<p>Massive thank you to ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://ryuik.livejournal.com/224213.html"
  }, {}, { default: () => `Ryuik` })} for the information and photo.</p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

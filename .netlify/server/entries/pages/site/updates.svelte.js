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
  default: () => Updates
});
var import_index_430bc4f2 = __toModule(require("../../../chunks/index-430bc4f2.js"));
var import_Link_0d4e9abf = __toModule(require("../../../chunks/Link-0d4e9abf.js"));
var import_store_b286f9a0 = __toModule(require("../../../chunks/store-b286f9a0.js"));
var import_index_365aa037 = __toModule(require("../../../chunks/index-365aa037.js"));
var updates_svelte_svelte_type_style_lang = "";
const css = {
  code: "hr.svelte-1thul10{margin-top:0.5rem;margin-bottom:1rem;--tw-border-opacity:1;border-color:rgb(74 222 128 / var(--tw-border-opacity));opacity:0.25\n}",
  map: null
};
const Updates = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_430bc4f2.a)(import_store_b286f9a0.t, (value) => $title = value);
  let { pageTitle = "Site Updates" } = $$props;
  import_store_b286f9a0.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_430bc4f2.e)($title)}</title>`, ""}`, ""}



<h2>${(0, import_index_430bc4f2.e)(pageTitle)}</h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://twitcasting.tv/chachamaru_yfcz"
  }, {}, { default: () => `TwitCasting` })} again. For full details, see ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538"
  }, {}, { default: () => `Chacha&#39;s Twitter` })}.
</p>

<hr class="${"border-b-1 svelte-1thul10"}">

<p><strong>16.02.21</strong><br>
	Ded Chaplin and Luscious are streaming two live performances on 17th and 18th February, from The Doors in Hatsudai. You can purchase tickets to watch the performances live through ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://twitcasting.tv/chachamaru_yfcz"
  }, {}, { default: () => `TwitCasting` })}, which also gives you access to watch the stream recording up to 2 weeks from the original broadcast. See ${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, {
    href: "https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722"
  }, {}, { default: () => `Chacha&#39;s Twitter` })} for more info. Looking forward to it!
</p>

<hr class="${"border-b-1 svelte-1thul10"}">

<p><strong>10.02.21</strong><br>
	Happy birthday YOU! \u304A\u8A95\u751F\u65E5\u304A\u3081\u3067\u3068\u3046!
</p>

<hr class="${"border-b-1 svelte-1thul10"}">

<p><strong>01.01.21</strong><br>
	Happy New Year! \u660E\u3051\u307E\u3057\u3066\u304A\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307E\u3059!
</p>

<hr class="${"border-b-1 svelte-1thul10"}">

<p><strong>12.12.20</strong><br>
	Guess who&#39;s back! After over 6 years I&#39;ve decided to rebuild this fansite. I&#39;ve restored most of the content but not many images yet, and I&#39;m guessing loads of the information is now incorrect or wildy out of date. But it&#39;s back and I&#39;d forgotten how much I enjoy fangirling over You!
</p>`;
});

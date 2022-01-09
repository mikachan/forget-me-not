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
  default: () => Where_to_buy
});
var import_index_430bc4f2 = __toModule(require("../../chunks/index-430bc4f2.js"));
var import_Link_0d4e9abf = __toModule(require("../../chunks/Link-0d4e9abf.js"));
var import_store_b286f9a0 = __toModule(require("../../chunks/store-b286f9a0.js"));
var import_index_365aa037 = __toModule(require("../../chunks/index-365aa037.js"));
const Where_to_buy = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_430bc4f2.a)(import_store_b286f9a0.t, (value) => $title = value);
  let { pageTitle = "Where to Buy" } = $$props;
  import_store_b286f9a0.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_430bc4f2.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_430bc4f2.e)(pageTitle)}</h2>

<p>There are several places you can buy Gackt, S.Q.F etc releases online.</p>

<ul><li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://www.yesasia.com/" }, {}, { default: () => `YesAsia` })}</li>
	<li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://www.cdjapan.co.jp/" }, {}, { default: () => `CD Japan` })}</li>
	<li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://www.amazon.co.jp/" }, {}, { default: () => `Amazon Japan` })}</li>
	<li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://www.hmv.co.jp/" }, {}, { default: () => `HMV Japan` })}</li>
	<li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://buyee.jp/" }, {}, { default: () => `Buyee.jp` })}</li>
	<li>${(0, import_index_430bc4f2.v)(import_Link_0d4e9abf.L, "Link").$$render($$result, { href: "http://www.jlist.com/" }, {}, { default: () => `JList` })}</li></ul>

<p>Both Gackt and S.Q.F are available on most popular music streaming services.</p>

<h3>Suggested Merch for You Fans</h3>

<h4>Albums</h4>
<ul><li><em>Moon</em> (Gackt): You is heavily featured in the CD booklet</li>
	<li><em>The Seventh Night</em> (Gackt): Nice pictures of You and Gackt in the chunky booklet that comes with the CD</li></ul>

<h4>Photobooks &amp; Magazines</h4>
<ul><li>Mizerable ~Unmei~ photobook</li>
	<li>For Dears</li>
	<li>Jougen no Tsuki Tour Book</li>
	<li>The Air Moon (The Crescent side)</li>
	<li>The Sixth Day &amp; Seventh Night Tour Book</li>
	<li>Gackt File 1999-2004</li>
	<li>DIABOLOS tour book</li></ul>

<h4>Live Tour DVDs</h4>

<p>Any of Gackt&#39;s from 2000-2019, but my personal favourites are:</p>

<ul><li><em>Kagen no Tsuki (2002)</em></li>
	<li><em>Jougen no Tsuki (2003)</em></li>
	<li><em>The Sixth Day &amp; Seventh Night (2004)</em></li>
	<li><em>Diablos (2005)</em></li>
	<li><em>Training Days Drug Party (2006)</em></li>
	<li><em>Requiem Et Reminiscence II (2009)</em></li>
	<li><em>Best of the Best - 40th birthday (2013)</em></li>
	<li><em>Last Visualive Saigo no Tsuki (2016)</em></li></ul>`;
});

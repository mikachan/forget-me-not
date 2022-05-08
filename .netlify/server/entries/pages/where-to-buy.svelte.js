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
  default: () => Where_to_buy
});
module.exports = __toCommonJS(stdin_exports);
var import_index_ff5e144f = require("../../chunks/index-ff5e144f.js");
var import_Link_e6a7895e = require("../../chunks/Link-e6a7895e.js");
var import_store_699a49f6 = require("../../chunks/store-699a49f6.js");
var import_index_2061cac5 = require("../../chunks/index-2061cac5.js");
const Where_to_buy = (0, import_index_ff5e144f.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_ff5e144f.a)(import_store_699a49f6.t, (value) => $title = value);
  let { pageTitle = "Where to Buy" } = $$props;
  import_store_699a49f6.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_ff5e144f.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_ff5e144f.e)(pageTitle)}</h2>

<p>There are several places you can buy Gackt, S.Q.F etc releases online.</p>

<ul><li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://www.yesasia.com/" }, {}, {
    default: () => {
      return `YesAsia`;
    }
  })}</li>
	<li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://www.cdjapan.co.jp/" }, {}, {
    default: () => {
      return `CD Japan`;
    }
  })}</li>
	<li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://www.amazon.co.jp/" }, {}, {
    default: () => {
      return `Amazon Japan`;
    }
  })}</li>
	<li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://www.hmv.co.jp/" }, {}, {
    default: () => {
      return `HMV Japan`;
    }
  })}</li>
	<li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://buyee.jp/" }, {}, {
    default: () => {
      return `Buyee.jp`;
    }
  })}</li>
	<li>${(0, import_index_ff5e144f.v)(import_Link_e6a7895e.L, "Link").$$render($$result, { href: "http://www.jlist.com/" }, {}, {
    default: () => {
      return `JList`;
    }
  })}</li></ul>

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
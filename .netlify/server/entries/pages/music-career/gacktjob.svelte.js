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
  default: () => Gacktjob,
  pageTitle: () => pageTitle,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("../../../chunks/index-db852415.js");
var import_store_e0ef4c58 = require("../../../chunks/store-e0ef4c58.js");
var import_index_652f602f = require("../../../chunks/index-652f602f.js");
const prerender = true;
let pageTitle = "GacktJob";
import_store_e0ef4c58.t.set(pageTitle);
const Gacktjob = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_db852415.a)(import_store_e0ef4c58.t, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${(0, import_index_db852415.e)($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${(0, import_index_db852415.e)(pageTitle)}</h2>

<p>The members of GacktJob have said that You is like a robot, with the exception of Gackt, who says he&#39;s half donkey, half horse.</p>

<p>They celebrated You&#39;s 30th birthday on Gackt&#39;s radio show together; I&#39;ve dedicated a page to it <a href="${"/music-career/birthday-2003"}">here</a> since I had so much info about it.</p>

<p><em>More info coming soon.</em></p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

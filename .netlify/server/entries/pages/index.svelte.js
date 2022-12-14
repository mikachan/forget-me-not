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
  default: () => Routes,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("../../chunks/index-db852415.js");
var import_Link_a57e5296 = require("../../chunks/Link-a57e5296.js");
const prerender = true;
const Routes = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-u51uix_START -->${$$result.title = `<title>Forget-me-not | You fansite</title>`, ""}<!-- HEAD_svelte-u51uix_END -->`, ""}

<p>Welcome to <strong>Forget-me-not</strong>, an <a href="${"/site/history"}">English fansite</a> dedicated to the Japanese musician, <strong>You</strong>, best known for playing guitar and violin for ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, { href: "https://gackt.com/" }, {}, {
    default: () => {
      return `Gackt`;
    }
  })} and ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, { href: "http://www.sqf.jp/" }, {}, {
    default: () => {
      return `S.Q.F`;
    }
  })}.</p>

<h2>Latest Site Updates <a href="${"/site/updates"}" class="${"text-sm"}">read more\xA0\u2192</a></h2>

<p><strong>14.12.22</strong><br>
	I&#39;ve updated the site.
</p>`;
});

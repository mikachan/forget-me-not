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
  default: () => History
});
module.exports = __toCommonJS(stdin_exports);
var import_index_db852415 = require("../../../chunks/index-db852415.js");
var import_Link_a57e5296 = require("../../../chunks/Link-a57e5296.js");
var import_store_e0ef4c58 = require("../../../chunks/store-e0ef4c58.js");
var import_index_652f602f = require("../../../chunks/index-652f602f.js");
const History = (0, import_index_db852415.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_db852415.a)(import_store_e0ef4c58.t, (value) => $title = value);
  let { pageTitle = "Site History" } = $$props;
  import_store_e0ef4c58.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${(0, import_index_db852415.e)($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${(0, import_index_db852415.e)(pageTitle)}</h2>

<p>The site was first opened on 23rd March, 2004. I decided to make a You fan site because, at the time, there were no sites dedicated to him in English.</p>

<p>The site was named after the Gackt song, <em>Wasurenai kara</em> (\u5FD8\u308C\u306A\u3044\u304B\u3089, &#39;I won&#39;t forget&#39;). It was originally called <em>Silence and Motion</em> after the Final Fantasy VIII track of the same name.</p>

<p>You can view the site source on ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, {
    href: "https://github.com/mikachan/forget-me-not"
  }, {}, {
    default: () => {
      return `GitHub`;
    }
  })}.</p>

<p><a href="${"site/thanks"}">Thank you</a> to everyone who helped make this site possible over the years.</p>

<p>I&#39;m ${(0, import_index_db852415.v)(import_Link_a57e5296.L, "Link").$$render($$result, { href: "https://sekai.co.uk" }, {}, {
    default: () => {
      return `Sarah`;
    }
  })}, your average J-rock/anything-Japanese nerd from the UK.</p>`;
});

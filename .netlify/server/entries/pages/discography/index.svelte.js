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
  default: () => Discography
});
module.exports = __toCommonJS(stdin_exports);
var import_index_ff5e144f = require("../../../chunks/index-ff5e144f.js");
var import_Image_1e7f5f8d = require("../../../chunks/Image-1e7f5f8d.js");
var import_store_699a49f6 = require("../../../chunks/store-699a49f6.js");
var import_blurhash = require("blurhash");
var import_index_2061cac5 = require("../../../chunks/index-2061cac5.js");
var moonchild = "/_app/assets/moonchild-53a59bb5.jpg";
const Discography = (0, import_index_ff5e144f.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_ff5e144f.a)(import_store_699a49f6.t, (value) => $title = value);
  let { pageTitle = "Discography" } = $$props;
  import_store_699a49f6.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_ff5e144f.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_ff5e144f.e)(pageTitle)}</h2>

<h3>Full Discography <a href="${"discography/full-discography"}" class="${"text-sm"}">read more\xA0\u2192</a></h3>

<p>View You&#39;s full discography including release dates, artist collaborations and credits.</p>

<h3>Appearances <a href="${"discography/appearances"}" class="${"text-sm"}">read more\xA0\u2192</a></h3>

<p>You has appeared in many videos, books, magazines and interviews, especially from working with Gackt. The highlight obviously being his acting skillz in <em>Moon Child</em>:</p>

<figure>${(0, import_index_ff5e144f.v)(import_Image_1e7f5f8d.I, "Image").$$render($$result, {
    alt: "You in Moon Child",
    class: "p-2 pt-0 mx-auto mb-2",
    src: moonchild,
    ratio: "55%"
  }, {}, {})}</figure>`;
});

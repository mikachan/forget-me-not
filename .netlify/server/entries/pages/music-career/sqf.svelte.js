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
  default: () => Sqf
});
module.exports = __toCommonJS(stdin_exports);
var import_index_ff5e144f = require("../../../chunks/index-ff5e144f.js");
var import_store_699a49f6 = require("../../../chunks/store-699a49f6.js");
var import_index_2061cac5 = require("../../../chunks/index-2061cac5.js");
const Sqf = (0, import_index_ff5e144f.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_ff5e144f.a)(import_store_699a49f6.t, (value) => $title = value);
  let { pageTitle = "S.Q.F" } = $$props;
  import_store_699a49f6.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_ff5e144f.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_ff5e144f.e)(pageTitle)}</h2>

<p>Coming soon.</p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

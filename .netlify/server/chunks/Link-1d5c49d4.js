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
  L: () => Link
});
module.exports = __toCommonJS(stdin_exports);
var import_index_511eca88 = require("./index-511eca88.js");
const Link = (0, import_index_511eca88.c)(($$result, $$props, $$bindings, slots) => {
  let $$restProps = (0, import_index_511eca88.d)($$props, ["href", "disabled", "outbound", "target", "rel", "download"]);
  let { href = "javascript:void(0);" } = $$props;
  let { disabled = false } = $$props;
  let { outbound = void 0 } = $$props;
  let { target = void 0 } = $$props;
  let { rel = void 0 } = $$props;
  let { download = void 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.outbound === void 0 && $$bindings.outbound && outbound !== void 0)
    $$bindings.outbound(outbound);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.rel === void 0 && $$bindings.rel && rel !== void 0)
    $$bindings.rel(rel);
  if ($$props.download === void 0 && $$bindings.download && download !== void 0)
    $$bindings.download(download);
  {
    if (typeof window !== "undefined") {
      const isExternal = new URL(href, `${location.protocol}//${location.host}`).host !== location.host;
      if (isExternal && outbound === void 0) {
        outbound = true;
      }
    }
  }
  {
    if (outbound) {
      target = "_blank";
      if (rel === void 0)
        rel = "noopener noreferrer";
    }
  }
  return `${disabled ? `<span${(0, import_index_511eca88.f)([(0, import_index_511eca88.h)($$restProps), { role: "link" }, { "aria-disabled": "true" }], {})}>${slots.default ? slots.default({}) : ``}</span>` : `<a${(0, import_index_511eca88.f)([
    (0, import_index_511eca88.h)($$restProps),
    { href: (0, import_index_511eca88.i)(href) },
    { target: (0, import_index_511eca88.i)(target) },
    { rel: (0, import_index_511eca88.i)(rel) },
    {
      download: (0, import_index_511eca88.i)(download)
    }
  ], {})}>${slots.default ? slots.default({}) : ``}</a>`}`;
});

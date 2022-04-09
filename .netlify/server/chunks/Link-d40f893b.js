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
  L: () => Link
});
var import_index_9861661c = __toModule(require("./index-9861661c.js"));
const Link = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $$restProps = (0, import_index_9861661c.d)($$props, ["href", "disabled", "outbound", "target", "rel", "download"]);
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
  return `${disabled ? `<span${(0, import_index_9861661c.f)([(0, import_index_9861661c.h)($$restProps), { role: "link" }, { "aria-disabled": "true" }], {})}>${slots.default ? slots.default({}) : ``}</span>` : `<a${(0, import_index_9861661c.f)([
    (0, import_index_9861661c.h)($$restProps),
    { href: (0, import_index_9861661c.i)(href) },
    { target: (0, import_index_9861661c.i)(target) },
    { rel: (0, import_index_9861661c.i)(rel) },
    {
      download: (0, import_index_9861661c.i)(download)
    }
  ], {})}>${slots.default ? slots.default({}) : ``}</a>`}`;
});

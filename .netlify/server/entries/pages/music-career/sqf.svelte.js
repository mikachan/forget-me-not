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
  default: () => Sqf
});
var import_index_9861661c = __toModule(require("../../../chunks/index-9861661c.js"));
var import_store_76ccc05c = __toModule(require("../../../chunks/store-76ccc05c.js"));
var import_index_041375b7 = __toModule(require("../../../chunks/index-041375b7.js"));
const Sqf = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_9861661c.a)(import_store_76ccc05c.t, (value) => $title = value);
  let { pageTitle = "S.Q.F" } = $$props;
  import_store_76ccc05c.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_9861661c.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_9861661c.e)(pageTitle)}</h2>

<p>Coming soon.</p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

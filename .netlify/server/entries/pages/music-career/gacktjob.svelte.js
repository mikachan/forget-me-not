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
  default: () => Gacktjob
});
var import_index_430bc4f2 = __toModule(require("../../../chunks/index-430bc4f2.js"));
var import_store_b286f9a0 = __toModule(require("../../../chunks/store-b286f9a0.js"));
var import_index_365aa037 = __toModule(require("../../../chunks/index-365aa037.js"));
const Gacktjob = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_430bc4f2.a)(import_store_b286f9a0.t, (value) => $title = value);
  let { pageTitle = "GacktJob" } = $$props;
  import_store_b286f9a0.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_430bc4f2.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_430bc4f2.e)(pageTitle)}</h2>

<p>The members of GacktJob have said that You is like a robot, with the exception of Gackt, who says he&#39;s half donkey, half horse.</p>

<p>They celebrated You&#39;s 30th birthday on Gackt&#39;s radio show together; I&#39;ve dedicated a page to it <a href="${"/music-career/birthday-2003"}">here</a> since I had so much info about it.</p>

<p><em>More info coming soon.</em></p>

<p><a href="${"/music-career"}">\u2190 Backt to Music Career</a></p>`;
});

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
  default: () => Discography
});
var import_index_9861661c = __toModule(require("../../../chunks/index-9861661c.js"));
var import_Image_4b6807c1 = __toModule(require("../../../chunks/Image-4b6807c1.js"));
var import_store_76ccc05c = __toModule(require("../../../chunks/store-76ccc05c.js"));
var import_blurhash = __toModule(require("blurhash"));
var import_index_041375b7 = __toModule(require("../../../chunks/index-041375b7.js"));
var moonchild = "/_app/assets/moonchild-53a59bb5.jpg";
const Discography = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_9861661c.a)(import_store_76ccc05c.t, (value) => $title = value);
  let { pageTitle = "Discography" } = $$props;
  import_store_76ccc05c.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_9861661c.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_9861661c.e)(pageTitle)}</h2>

<h3>Full Discography <a href="${"discography/full-discography"}" class="${"text-sm"}">read more\xA0\u2192</a></h3>

<p>View You&#39;s full discography including release dates, artist collaborations and credits.</p>

<h3>Appearances <a href="${"discography/appearances"}" class="${"text-sm"}">read more\xA0\u2192</a></h3>

<p>You has appeared in many videos, books, magazines and interviews, especially from working with Gackt. The highlight obviously being his acting skillz in <em>Moon Child</em>:</p>

<figure>${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "You in Moon Child",
    class: "p-2 pt-0 mx-auto mb-2",
    src: moonchild,
    ratio: "55%"
  }, {}, {})}</figure>`;
});

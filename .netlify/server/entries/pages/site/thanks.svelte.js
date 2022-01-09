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
  default: () => Thanks
});
var import_index_430bc4f2 = __toModule(require("../../../chunks/index-430bc4f2.js"));
var import_store_b286f9a0 = __toModule(require("../../../chunks/store-b286f9a0.js"));
var import_index_365aa037 = __toModule(require("../../../chunks/index-365aa037.js"));
const Thanks = (0, import_index_430bc4f2.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_430bc4f2.a)(import_store_b286f9a0.t, (value) => $title = value);
  let { pageTitle = "Special Thanks" } = $$props;
  import_store_b286f9a0.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_430bc4f2.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_430bc4f2.e)(pageTitle)}</h2>

<ul><li><strong>Torabara</strong> for images, the Starlight Gig screencaps and R&amp;R screencaps.</li>
	<li><strong>Jirion</strong> for images.</li>
	<li><strong>Sei-chan</strong> for information, images and lots of other random things.</li>
	<li><strong>Akiko</strong> for R&amp;R screencaps, icons, images, for the pronunciation of You and for plugging my site everywhere.</li>
	<li><strong>Sari</strong> for images and information.</li>
	<li><strong>Alexy</strong> for icons.</li>
	<li><strong>Natalie</strong> for a recording of You&#39;s voice.</li>
	<li><strong>Kana</strong> for R&amp;R screencaps and being the lovely person that you are.</li>
	<li><strong>Mitsuki</strong> for the translation of Etude.</li>
	<li><strong>Chi</strong> for information.</li>
	<li><strong>Lindley</strong> for screen caps.</li></ul>

<p>Thank you thank you thank you! Also, thank you to all the people that have signed my guestbook, emailed me and just mentioned this site to me, it means a lot.</p>`;
});

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
  default: () => Thanks
});
module.exports = __toCommonJS(stdin_exports);
var import_index_511eca88 = require("../../../chunks/index-511eca88.js");
var import_store_57e59034 = require("../../../chunks/store-57e59034.js");
var import_index_cea261f0 = require("../../../chunks/index-cea261f0.js");
const Thanks = (0, import_index_511eca88.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_511eca88.a)(import_store_57e59034.t, (value) => $title = value);
  let { pageTitle = "Special Thanks" } = $$props;
  import_store_57e59034.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_511eca88.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_511eca88.e)(pageTitle)}</h2>

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

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
  default: () => Designs,
  pageTitle: () => pageTitle,
  prerender: () => prerender
});
module.exports = __toCommonJS(stdin_exports);
var import_index_8b43e98c = require("../../../chunks/index-8b43e98c.js");
var import_store_acd80018 = require("../../../chunks/store-acd80018.js");
var import_Image_ce32de43 = require("../../../chunks/Image-ce32de43.js");
var import_Link_1d087319 = require("../../../chunks/Link-1d087319.js");
var import_index_54043d18 = require("../../../chunks/index-54043d18.js");
var import_blurhash = require("blurhash");
var hdarts04 = "/_app/assets/hdarts04-fc324f67.jpg";
var hdarts03 = "/_app/assets/hdarts03-70510b13.jpg";
var hdarts02 = "/_app/assets/hdarts02-2e211d43.jpg";
var hdarts01 = "/_app/assets/hdarts01-221dcdd5.jpg";
var edhardy2 = "/_app/assets/edhardy03-151fb84a.jpg";
var edhardy1 = "/_app/assets/edhardy01-03f9f3a2.jpg";
var earring = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAGQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAEQ0NDQ4NEg4OEhoRDxEaHxcSEhcfIhcXFxcXIiMbHh0dHhsjIykqLSopIzY2Ozs2NkFBQUFBQUFBQUFBQUFBQQESEREUFhQYFRUYFxMXExcdFxkZFx0sHR0gHR0sOCgjIyMjKDgyNS0tLTUyPT04OD09QUFBQUFBQUFBQUFBQUFB/8AAEQgARgBGAwEiAAIRAQMRAf/EAHYAAQEAAwEBAQAAAAAAAAAAAAABAgUGBAMHAQEBAQEAAAAAAAAAAAAAAAAAAQIDEAABAwMCBAUEAwEAAAAAAAABAAIDESEEEgUxQWFxUYEiEwahQlIUkWIjghEBAQACAgMBAAAAAAAAAAAAAAERAiFBMVEDEv/aAAwDAQACEQMRAD8A4kA1U4G6V8b9UHAnkqBSvStUVAJt4IIUSnJKUvWyAE7p9EtS6B5ooigKgWrXyUoeduitlRlXhW5S9brcQfHpHwNmyMqDF1t1Mjkd/oQeHpHCqxkw4MUNa3TkOdaWXixrj9sdDcjxWbtF/Nakc0pZdTjbPt+ZiROh1RzCT2pg64DnXY+vIHgs8TbsbDkkbNDHPI0lrhICWjtdZv0kWaWuT6UtyWPNbrctugaDLjjR+TK1b/ytM5pFityyzMSyy4qc0UqiqKB4r1Yu35ma4NxoXzONvS0kDuV6dtzNuxInvyMP9vKJ/wA9bqQtb1aLkrOf5DuUsQx45BjY44RQARt86cVMnHtsIdndhObLuU0LHCwxyP2JXdNLTQeZXqx/kmJin248SIvBIbJIBG1jezQadVyBe8nUXGp51uvrHNEG0kYSbeoG9OxUs7WXHEdJuu6yPxhpDI/fLS98dQCGk0rZtf4W42aA5Tf25fU03bX73ePZci/Lx8s4+JGwxR6g10shGrSaDlYL9LxIIWQMjxnMfExoa3Q4EUHZcd5eOHXWzNuWk+SYbpsUTMaGmLi1oDajyXFOhD6g81+oZEY9lzXijTa64TcMNmNM97nBkAu1/j/Vv5Fa+e/VZ+mvcc5oOvRzrRE1evVW9aou2XNEUqiCqKKoKDS4Xpg3HLx3B8T6EcKgOH1Xk4qqYPDbO+Sbs4Wla3qI2Vt3C10+TPkP9yeR0rz9zjVfJSqTWRbbfNWo4ooiIqIioIiICIiCFXkiICIig//Z";
var bracelet = "/_app/assets/bracelet-f013da83.jpg";
const prerender = true;
let pageTitle = "Designs";
import_store_acd80018.t.set(pageTitle);
const Designs = (0, import_index_8b43e98c.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_8b43e98c.a)(import_store_acd80018.t, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_8b43e98c.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_8b43e98c.e)(pageTitle)}</h2>

<h3>Jewellery</h3>

<figure style="${"width: 120px;"}">${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "Bracelet",
    class: "p-2 pt-0",
    align: "right",
    src: bracelet,
    ratio: "70%"
  }, {}, {})}</figure>

<p>You has designed a couple of bracelets with Monkey-act-web. All You-related things could be found under the <em>WithMAD</em> section of the site. The last bracelet on the ${(0, import_index_8b43e98c.v)(import_Link_1d087319.L, "Link").$$render($$result, {
    href: "http://www.monkey-act-web.com/you/youpage.html"
  }, {}, {
    default: () => {
      return `this page`;
    }
  })} he designed in 2003.</p>

<figure style="${"width: 100px;"}">${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "Earring",
    class: "p-2 pt-0",
    align: "right",
    src: earring,
    ratio: "90%"
  }, {}, {})}</figure>

<p>He also designed a silver earring and a pendant in 2004, also under the WithMAD branding.</p>

<p>You has made comments on the bracelets, saying they were his first collaboration with Monkey, and that it took a long time to design them.</p>

<p>He&#39;s also designed other pieces of jewelery for <em>h-Darts</em>, including earrings, bracelets and necklaces. His latest design is a bracelet titled &quot;Earth&quot;, which can be seen ${(0, import_index_8b43e98c.v)(import_Link_1d087319.L, "Link").$$render($$result, {
    href: "http://www.h-darts.com/original/order/image/g_you_model.jpg"
  }, {}, {
    default: () => {
      return `here`;
    }
  })}.</p>

<p>The best thing from the h-darts collab was this gorgeous but slightly awkward must-show-hands-and-wrists-in-all-shots photoshoot:</p>

<figure>${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts01
  }, {}, {})}
	${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts02
  }, {}, {})}</figure>

<figure>${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts03
  }, {}, {})}
	${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts04
  }, {}, {})}</figure>

<h3 class="${"mt-4"}">Clothing</h3>
<p>You collaborated with Ed Hardy in 2014 on a clothing range.</p>

<figure>${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "Ed Hardy x You",
    class: "p-2 pt-0",
    align: "right",
    src: edhardy1
  }, {}, {})}</figure>

<figure>${(0, import_index_8b43e98c.v)(import_Image_ce32de43.I, "Image").$$render($$result, {
    alt: "Ed Hardy x You",
    class: "p-2 pt-0 mb-4",
    align: "right",
    src: edhardy2,
    ratio: "50%"
  }, {}, {})}</figure>

<p><a href="${"/about-you"}">\u2190 Back to About You</a></p>`;
});

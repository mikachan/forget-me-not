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
  default: () => Designs
});
var import_index_9861661c = __toModule(require("../../../chunks/index-9861661c.js"));
var import_Link_d40f893b = __toModule(require("../../../chunks/Link-d40f893b.js"));
var import_Image_4b6807c1 = __toModule(require("../../../chunks/Image-4b6807c1.js"));
var import_store_76ccc05c = __toModule(require("../../../chunks/store-76ccc05c.js"));
var import_blurhash = __toModule(require("blurhash"));
var import_index_041375b7 = __toModule(require("../../../chunks/index-041375b7.js"));
var bracelet = "/_app/assets/bracelet-f013da83.jpg";
var earring = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAGQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAEQ0NDQ4NEg4OEhoRDxEaHxcSEhcfIhcXFxcXIiMbHh0dHhsjIykqLSopIzY2Ozs2NkFBQUFBQUFBQUFBQUFBQQESEREUFhQYFRUYFxMXExcdFxkZFx0sHR0gHR0sOCgjIyMjKDgyNS0tLTUyPT04OD09QUFBQUFBQUFBQUFBQUFB/8AAEQgARgBGAwEiAAIRAQMRAf/EAHYAAQEAAwEBAQAAAAAAAAAAAAABAgUGBAMHAQEBAQEAAAAAAAAAAAAAAAAAAQIDEAABAwMCBAUEAwEAAAAAAAABAAIDESEEEgUxQWFxUYEiEwahQlIUkWIjghEBAQACAgMBAAAAAAAAAAAAAAERAiFBMVEDEv/aAAwDAQACEQMRAD8A4kA1U4G6V8b9UHAnkqBSvStUVAJt4IIUSnJKUvWyAE7p9EtS6B5ooigKgWrXyUoeduitlRlXhW5S9brcQfHpHwNmyMqDF1t1Mjkd/oQeHpHCqxkw4MUNa3TkOdaWXixrj9sdDcjxWbtF/Nakc0pZdTjbPt+ZiROh1RzCT2pg64DnXY+vIHgs8TbsbDkkbNDHPI0lrhICWjtdZv0kWaWuT6UtyWPNbrctugaDLjjR+TK1b/ytM5pFityyzMSyy4qc0UqiqKB4r1Yu35ma4NxoXzONvS0kDuV6dtzNuxInvyMP9vKJ/wA9bqQtb1aLkrOf5DuUsQx45BjY44RQARt86cVMnHtsIdndhObLuU0LHCwxyP2JXdNLTQeZXqx/kmJin248SIvBIbJIBG1jezQadVyBe8nUXGp51uvrHNEG0kYSbeoG9OxUs7WXHEdJuu6yPxhpDI/fLS98dQCGk0rZtf4W42aA5Tf25fU03bX73ePZci/Lx8s4+JGwxR6g10shGrSaDlYL9LxIIWQMjxnMfExoa3Q4EUHZcd5eOHXWzNuWk+SYbpsUTMaGmLi1oDajyXFOhD6g81+oZEY9lzXijTa64TcMNmNM97nBkAu1/j/Vv5Fa+e/VZ+mvcc5oOvRzrRE1evVW9aou2XNEUqiCqKKoKDS4Xpg3HLx3B8T6EcKgOH1Xk4qqYPDbO+Sbs4Wla3qI2Vt3C10+TPkP9yeR0rz9zjVfJSqTWRbbfNWo4ooiIqIioIiICIiCFXkiICIig//Z";
var edhardy1 = "/_app/assets/edhardy01-03f9f3a2.jpg";
var edhardy2 = "/_app/assets/edhardy03-151fb84a.jpg";
var hdarts01 = "/_app/assets/hdarts01-221dcdd5.jpg";
var hdarts02 = "/_app/assets/hdarts02-2e211d43.jpg";
var hdarts03 = "/_app/assets/hdarts03-70510b13.jpg";
var hdarts04 = "/_app/assets/hdarts04-fc324f67.jpg";
const Designs = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = (0, import_index_9861661c.a)(import_store_76ccc05c.t, (value) => $title = value);
  let { pageTitle = "Designs" } = $$props;
  import_store_76ccc05c.t.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_9861661c.e)($title)}</title>`, ""}`, ""}

<h2>${(0, import_index_9861661c.e)(pageTitle)}</h2>

<h3>Jewellery</h3>

<figure style="${"width: 120px;"}">${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "Bracelet",
    class: "p-2 pt-0",
    align: "right",
    src: bracelet,
    ratio: "70%"
  }, {}, {})}</figure>

<p>You has designed a couple of bracelets with Monkey-act-web. All You-related things could be found under the <em>WithMAD</em> section of the site. The last bracelet on the ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "http://www.monkey-act-web.com/you/youpage.html"
  }, {}, {
    default: () => {
      return `this page`;
    }
  })} he designed in 2003.</p>

<figure style="${"width: 100px;"}">${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "Earring",
    class: "p-2 pt-0",
    align: "right",
    src: earring,
    ratio: "90%"
  }, {}, {})}</figure>

<p>He also designed a silver earring and a pendant in 2004, also under the WithMAD branding.</p>

<p>You has made comments on the bracelets, saying they were his first collaboration with Monkey, and that it took a long time to design them.</p>

<p>He&#39;s also designed other pieces of jewelery for <em>h-Darts</em>, including earrings, bracelets and necklaces. His latest design is a bracelet titled &quot;Earth&quot;, which can be seen ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "http://www.h-darts.com/original/order/image/g_you_model.jpg"
  }, {}, {
    default: () => {
      return `here`;
    }
  })}.</p>

<p>The best thing from the h-darts collab was this gorgeous but slightly awkward must-show-hands-and-wrists-in-all-shots photoshoot:</p>

<figure>${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts01
  }, {}, {})}
	${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts02
  }, {}, {})}</figure>

<figure>${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts03
  }, {}, {})}
	${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "h-darts",
    class: "p-2 pt-0 inline-block",
    src: hdarts04
  }, {}, {})}</figure>

<h3 class="${"mt-4"}">Clothing</h3>
<p>You collaborated with Ed Hardy in 2014 on a clothing range.</p>

<figure>${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "Ed Hardy x You",
    class: "p-2 pt-0",
    align: "right",
    src: edhardy1
  }, {}, {})}</figure>

<figure>${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    alt: "Ed Hardy x You",
    class: "p-2 pt-0 mb-4",
    align: "right",
    src: edhardy2,
    ratio: "50%"
  }, {}, {})}</figure>

<p><a href="${"/about-you"}">\u2190 Back to About You</a></p>`;
});

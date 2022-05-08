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
  default: () => _layout
});
var import_index_9861661c = __toModule(require("../../chunks/index-9861661c.js"));
var import_index_041375b7 = __toModule(require("../../chunks/index-041375b7.js"));
var import_Link_d40f893b = __toModule(require("../../chunks/Link-d40f893b.js"));
var import_Image_4b6807c1 = __toModule(require("../../chunks/Image-4b6807c1.js"));
var import_blurhash = __toModule(require("blurhash"));
const getStores = () => {
  const stores = (0, import_index_9861661c.g)("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function loader(urls, test2, callback) {
  let remaining = urls.length;
  function maybeCallback() {
    remaining = --remaining;
    if (remaining < 1) {
      callback();
    }
  }
  if (!test2()) {
    urls.forEach(({ type, url, options = { async: true, defer: true } }) => {
      const isScript = type === "script";
      const tag = document.createElement(isScript ? "script" : "link");
      if (isScript) {
        tag.src = url;
        tag.async = options.async;
        tag.defer = options.defer;
      } else {
        tag.rel = "stylesheet";
        tag.href = url;
      }
      tag.onload = maybeCallback;
      document.body.appendChild(tag);
    });
  } else {
    callback();
  }
}
const gaStore = (0, import_index_041375b7.w)([]);
function test() {
  return Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer);
}
function gtag() {
  window.dataLayer.push(arguments);
}
const GoogleAnalytics = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let { properties } = $$props;
  let { configurations = {} } = $$props;
  let { enabled = true } = $$props;
  function init() {
    const mainProperty = properties[0];
    loader([
      {
        type: "script",
        url: `//www.googletagmanager.com/gtag/js?id=${mainProperty}`
      }
    ], test, callback);
  }
  function callback() {
    window.dataLayer = window.dataLayer || [];
    gtag("js", new Date());
    properties.forEach((p) => {
      gtag("config", p, configurations[p] || {});
    });
    return gaStore.subscribe((queue) => {
      let next = queue.length && queue.shift();
      while (next) {
        const { event, data } = next;
        gtag("event", event, data);
        next = queue.shift();
      }
    });
  }
  if ($$props.properties === void 0 && $$bindings.properties && properties !== void 0)
    $$bindings.properties(properties);
  if ($$props.configurations === void 0 && $$bindings.configurations && configurations !== void 0)
    $$bindings.configurations(configurations);
  if ($$props.enabled === void 0 && $$bindings.enabled && enabled !== void 0)
    $$bindings.enabled(enabled);
  if ($$props.init === void 0 && $$bindings.init && init !== void 0)
    $$bindings.init(init);
  return ``;
});
var NavContent_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "a.svelte-1804nw2.svelte-1804nw2{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(31 41 55 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}a.svelte-1804nw2.svelte-1804nw2:hover{--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.svelte-1804nw2.svelte-1804nw2{--tw-border-opacity:1;border-color:rgb(17 24 39 / var(--tw-border-opacity));padding-top:0.5rem;padding-bottom:0.5rem\n    }}a.active.svelte-1804nw2.svelte-1804nw2{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(22 163 74 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}a.active.svelte-1804nw2.svelte-1804nw2:hover{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.active.svelte-1804nw2.svelte-1804nw2{padding-top:0.5rem;padding-bottom:0.5rem\n    }}li.svelte-1804nw2 span.svelte-1804nw2{display:block;padding-bottom:0.25rem;font-size:1.125rem;line-height:1.75rem;text-transform:lowercase;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))\n}@media(min-width: 768px){li.svelte-1804nw2 span.svelte-1804nw2{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))\n    }}@media(min-width: 1024px){li.svelte-1804nw2 span.svelte-1804nw2{display:inline-block;padding-bottom:0px;font-size:1rem;line-height:1.5rem\n    }}ul.svelte-1804nw2.svelte-1804nw2{margin-left:0px;margin-bottom:0px\n}ul.svelte-1804nw2 li.svelte-1804nw2{list-style-type:none\n}@media(min-width: 1024px){ul.svelte-1804nw2 li.svelte-1804nw2{display:inline-block;padding-right:0.75rem\n    }}",
  map: null
};
const NavContent = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = (0, import_index_9861661c.a)(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<nav><ul class="${"svelte-1804nw2"}"><li class="${"svelte-1804nw2"}"><a${(0, import_index_9861661c.b)("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} href="${"."}" class="${["svelte-1804nw2", $page.url.pathname == "/" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1804nw2"}">Home</span></a></li>
		<li class="${"svelte-1804nw2"}"><a${(0, import_index_9861661c.b)("aria-current", $page.url.pathname === "/about-you" ? "page" : void 0, 0)} href="${"/about-you"}" class="${["svelte-1804nw2", $page.url.pathname == "/about-you" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1804nw2"}">About YOU</span></a></li>
		<li class="${"svelte-1804nw2"}"><a${(0, import_index_9861661c.b)("aria-current", $page.url.pathname === "/music-career" ? "page" : void 0, 0)} href="${"/music-career"}" class="${["svelte-1804nw2", $page.url.pathname == "/music-career" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1804nw2"}">Music Career</span></a></li>
		<li class="${"svelte-1804nw2"}"><a${(0, import_index_9861661c.b)("aria-current", $page.url.pathname === "/discography" ? "page" : void 0, 0)} href="${"/discography"}" class="${["svelte-1804nw2", $page.url.pathname == "/discography" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1804nw2"}">Discography</span></a></li>
		<li class="${"svelte-1804nw2"}"><a${(0, import_index_9861661c.b)("aria-current", $page.url.pathname === "/where-to-buy" ? "page" : void 0, 0)} href="${"/where-to-buy"}" class="${["svelte-1804nw2", $page.url.pathname == "/where-to-buy" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-1804nw2"}">Where to Buy</span></a></li></ul></nav>`;
});
const Nav = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"hidden lg:block lg:w-3/5 relative top-16"}">${(0, import_index_9861661c.v)(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div>

<div class="${"block lg:hidden"}"><button class="${"fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600"}"><svg class="${"fill-current h-3 w-3"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>Menu</title><path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path></svg></button></div>`;
});
const NavMobile = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  return `<div id="${"navMobile"}" class="${"fixed w-0 h-full z-50 overflow-x-hidden bg-gray-800 bg-opacity-95"}"><div class="${"flex flex-wrap flex-col content-end px-6 my-4"}"><button class="${"flex-1 p-0 text-white text-5xl"}">\xD7</button></div>

    <div class="${"overlay-content mt-6 px-6"}">${(0, import_index_9861661c.v)(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div></div>`;
});
var tailwindOutput = "";
var app = "";
var bg = "/_app/assets/bg02-83df7930.jpg";
var you01 = "/_app/assets/you01-4884627a.jpg";
var you02 = "/_app/assets/you02-327a01f0.jpg";
var you03 = "/_app/assets/you03-dc335947.jpg";
var you04 = "/_app/assets/you04-af2adb53.jpg";
var you05 = "/_app/assets/you05-467bd2c7.jpg";
var you06 = "/_app/assets/you06-bd5e51be.jpg";
var you07 = "/_app/assets/you07-2fe86a76.jpg";
var you08 = "/_app/assets/you08-1aea5d73.jpg";
var you09 = "/_app/assets/you09-7a3181ed.jpg";
var you10 = "/_app/assets/you10-cbdaa2b8.jpg";
var you11 = "/_app/assets/you11-2d304ea7.jpg";
var you12 = "/_app/assets/you12-1f61a4c0.jpg";
var you13 = "/_app/assets/you13-4380939e.jpg";
var you14 = "/_app/assets/you14-483e0b49.jpg";
var you15 = "/_app/assets/you15-cece2640.jpg";
var you16 = "/_app/assets/you16-a133c18c.jpg";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@media(min-width: 1024px){.image-rotation.svelte-1pidex7 figure.svelte-1pidex7{height:500px}}",
  map: null
};
const _layout = (0, import_index_9861661c.c)(($$result, $$props, $$bindings, slots) => {
  let mainImage = you01;
  function randomYouImage() {
    const youPics = [
      you01,
      you02,
      you03,
      you04,
      you05,
      you06,
      you07,
      you08,
      you09,
      you10,
      you11,
      you12,
      you13,
      you14,
      you15,
      you16
    ];
    const randomNum = Math.floor(Math.random() * youPics.length);
    return youPics[randomNum];
  }
  page.subscribe(({ url, params, status }) => {
    mainImage = randomYouImage();
  });
  $$result.css.add(css);
  return `${`${(0, import_index_9861661c.v)(GoogleAnalytics, "GoogleAnalytics").$$render($$result, { properties: ["G-WN3BJ9W3N5"] }, {}, {})}`}

${(0, import_index_9861661c.v)(NavMobile, "NavMobile").$$render($$result, {}, {}, {})}

<div class="${"font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"}" style="${"background-image:url(" + (0, import_index_9861661c.e)(bg) + ");"}"><div class="${"max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-24 px-6 lg:px-0 lg:my-0"}">${(0, import_index_9861661c.v)(Nav, "Nav").$$render($$result, {}, {}, {})}

		<div class="${"main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll"}"><div class="${"p-4 md:p-6"}"><div class="${"block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top"}" style="${"background-image: url(" + (0, import_index_9861661c.e)(mainImage) + ")"}"></div>

				<h1 class="${"text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left"}">Forget-me-not: a You fansite</h1>
				<div class="${"mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25"}"></div>
				
				${slots.default ? slots.default({}) : ``}

				<div class="${"pt-4"}"><p class="${"italic text-xs text-center lg:text-left"}">\xA9 2004-2021<br>
						${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "https://sekai.co.uk",
    class: "no-underline"
  }, {}, {
    default: () => {
      return `Contact webmaster`;
    }
  })} \u2022 ${(0, import_index_9861661c.v)(import_Link_d40f893b.L, "Link").$$render($$result, {
    href: "https://github.com/mikachan/forget-me-not",
    class: "no-underline"
  }, {}, {
    default: () => {
      return `View on GitHub`;
    }
  })}</p></div></div></div>

		<div class="${"image-rotation w-full lg:w-2/5 svelte-1pidex7"}"><figure class="${"hidden lg:block svelte-1pidex7"}">${(0, import_index_9861661c.v)(import_Image_4b6807c1.I, "Image").$$render($$result, {
    src: mainImage,
    alt: "You",
    class: "rounded-none lg:rounded-lg shadow-2xl",
    ratio: "141%",
    placeholderClass: "rounded-none lg:rounded-lg"
  }, {}, {})}</figure></div></div></div>`;
});

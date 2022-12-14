import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, e as escape } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import loader from "@beyonk/async-script-loader";
import { w as writable } from "../../chunks/index2.js";
import { L as Link } from "../../chunks/Link.js";
import { I as Image } from "../../chunks/Image.js";
const gaStore = writable([]);
function test() {
  return Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer);
}
function gtag() {
  window.dataLayer.push(arguments);
}
const GoogleAnalytics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { properties } = $$props;
  let { configurations = {} } = $$props;
  let { enabled = true } = $$props;
  function init() {
    const mainProperty = properties[0];
    loader(
      [
        {
          type: "script",
          url: `//www.googletagmanager.com/gtag/js?id=${mainProperty}`
        }
      ],
      test,
      callback
    );
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
        const { type, event, data } = next;
        gtag(type, event, data);
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
const NavContent_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "a.svelte-61agw6.svelte-61agw6{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(31 41 55 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity));text-decoration-line:none\n}a.svelte-61agw6.svelte-61agw6:hover{--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.svelte-61agw6.svelte-61agw6{--tw-border-opacity:1;border-color:rgb(17 24 39 / var(--tw-border-opacity));padding-top:0.5rem;padding-bottom:0.5rem\n    }}a.active.svelte-61agw6.svelte-61agw6{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(22 163 74 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none\n}a.active.svelte-61agw6.svelte-61agw6:hover{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.active.svelte-61agw6.svelte-61agw6{padding-top:0.5rem;padding-bottom:0.5rem\n    }}li.svelte-61agw6 span.svelte-61agw6{display:block;padding-bottom:0.25rem;font-size:1.125rem;line-height:1.75rem;text-transform:lowercase;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))\n}@media(min-width: 768px){li.svelte-61agw6 span.svelte-61agw6{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))\n    }}@media(min-width: 1024px){li.svelte-61agw6 span.svelte-61agw6{display:inline-block;padding-bottom:0px;font-size:1rem;line-height:1.5rem\n    }}ul.svelte-61agw6.svelte-61agw6{margin-left:0px;margin-bottom:0px\n}ul.svelte-61agw6 li.svelte-61agw6{list-style-type:none\n}@media(min-width: 1024px){ul.svelte-61agw6 li.svelte-61agw6{display:inline-block;padding-right:0.75rem\n    }}",
  map: null
};
const NavContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<nav><ul class="${"svelte-61agw6"}"><li class="${"svelte-61agw6"}"><a${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} href="${"."}" class="${["svelte-61agw6", $page.url.pathname == "/" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-61agw6"}">Home</span></a></li>
		<li class="${"svelte-61agw6"}"><a${add_attribute("aria-current", $page.url.pathname === "/about-you" ? "page" : void 0, 0)} href="${"/about-you"}" class="${["svelte-61agw6", $page.url.pathname == "/about-you" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-61agw6"}">About YOU</span></a></li>
		<li class="${"svelte-61agw6"}"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/music-career" ? "page" : void 0,
    0
  )} href="${"/music-career"}" class="${["svelte-61agw6", $page.url.pathname == "/music-career" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-61agw6"}">Music Career</span></a></li>
		<li class="${"svelte-61agw6"}"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/discography" ? "page" : void 0,
    0
  )} href="${"/discography"}" class="${["svelte-61agw6", $page.url.pathname == "/discography" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-61agw6"}">Discography</span></a></li>
		<li class="${"svelte-61agw6"}"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/where-to-buy" ? "page" : void 0,
    0
  )} href="${"/where-to-buy"}" class="${["svelte-61agw6", $page.url.pathname == "/where-to-buy" ? "active" : ""].join(" ").trim()}"><span class="${"svelte-61agw6"}">Where to Buy</span></a></li></ul></nav>`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"hidden lg:block lg:w-3/5 relative top-16"}">${validate_component(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div>

<div class="${"block lg:hidden"}"><button class="${"fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600"}"><svg class="${"fill-current h-3 w-3"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>Menu</title><path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path></svg></button></div>`;
});
const NavMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div id="${"navMobile"}" class="${"fixed w-0 h-full z-50 overflow-x-hidden bg-gray-800 bg-opacity-95"}"><div class="${"flex flex-wrap flex-col content-end px-6 my-4"}"><button class="${"flex-1 p-0 text-white text-5xl"}">×</button></div>

    <div class="${"overlay-content mt-6 px-6"}">${validate_component(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div></div>`;
});
const tailwindOutput = "";
const app = "";
const bg = "/_app/immutable/assets/bg02-83df7930.jpg";
const you01 = "/_app/immutable/assets/you01-4884627a.jpg";
const you02 = "/_app/immutable/assets/you02-327a01f0.jpg";
const you03 = "/_app/immutable/assets/you03-dc335947.jpg";
const you04 = "/_app/immutable/assets/you04-af2adb53.jpg";
const you05 = "/_app/immutable/assets/you05-467bd2c7.jpg";
const you06 = "/_app/immutable/assets/you06-bd5e51be.jpg";
const you07 = "/_app/immutable/assets/you07-2fe86a76.jpg";
const you08 = "/_app/immutable/assets/you08-1aea5d73.jpg";
const you09 = "/_app/immutable/assets/you09-7a3181ed.jpg";
const you10 = "/_app/immutable/assets/you10-cbdaa2b8.jpg";
const you11 = "/_app/immutable/assets/you11-2d304ea7.jpg";
const you12 = "/_app/immutable/assets/you12-1f61a4c0.jpg";
const you13 = "/_app/immutable/assets/you13-4380939e.jpg";
const you14 = "/_app/immutable/assets/you14-483e0b49.jpg";
const you15 = "/_app/immutable/assets/you15-cece2640.jpg";
const you16 = "/_app/immutable/assets/you16-a133c18c.jpg";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@media(min-width: 1024px){.image-rotation.svelte-o9b027 figure.svelte-o9b027{height:500px}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const trailingSlash = "always";
  const prerender = true;
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
  if ($$props.trailingSlash === void 0 && $$bindings.trailingSlash && trailingSlash !== void 0)
    $$bindings.trailingSlash(trailingSlash);
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `${`${validate_component(GoogleAnalytics, "GoogleAnalytics").$$render($$result, { properties: ["G-WN3BJ9W3N5"] }, {}, {})}`}

${validate_component(NavMobile, "NavMobile").$$render($$result, {}, {}, {})}

<div class="${"font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"}" style="${"background-image:url(" + escape(bg, true) + ");"}"><div class="${"max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-24 px-6 lg:px-0 lg:my-0"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

		<div class="${"main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll"}"><div class="${"p-4 md:p-6"}"><div class="${"block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top"}" style="${"background-image: url(" + escape(mainImage, true) + ")"}"></div>

				<h1 class="${"text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left"}">Forget-me-not: a You fansite</h1>
				<div class="${"mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25"}"></div>
				
				${slots.default ? slots.default({}) : ``}

				<div class="${"pt-4"}"><p class="${"italic text-xs text-center lg:text-left"}">© 2004-2021<br>
						${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://sekai.co.uk",
      class: "no-underline"
    },
    {},
    {
      default: () => {
        return `Contact webmaster`;
      }
    }
  )} • ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://github.com/mikachan/forget-me-not",
      class: "no-underline"
    },
    {},
    {
      default: () => {
        return `View on GitHub`;
      }
    }
  )}</p></div></div></div>

		<div class="${"image-rotation w-full lg:w-2/5 svelte-o9b027"}"><figure class="${"hidden lg:block svelte-o9b027"}">${validate_component(Image, "Image").$$render(
    $$result,
    {
      src: mainImage,
      alt: "You",
      class: "rounded-none lg:rounded-lg shadow-2xl",
      ratio: "141%",
      placeholderClass: "rounded-none lg:rounded-lg"
    },
    {},
    {}
  )}</figure></div></div></div>`;
});
export {
  Layout as default
};

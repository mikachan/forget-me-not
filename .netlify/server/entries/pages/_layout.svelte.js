import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import loader from "@beyonk/async-script-loader";
import { w as writable } from "../../chunks/index.js";
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
    gtag("js", /* @__PURE__ */ new Date());
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
  if ($$props.properties === void 0 && $$bindings.properties && properties !== void 0) $$bindings.properties(properties);
  if ($$props.configurations === void 0 && $$bindings.configurations && configurations !== void 0) $$bindings.configurations(configurations);
  if ($$props.enabled === void 0 && $$bindings.enabled && enabled !== void 0) $$bindings.enabled(enabled);
  if ($$props.init === void 0 && $$bindings.init && init !== void 0) $$bindings.init(init);
  return ``;
});
const css$1 = {
  code: "a.svelte-61agw6.svelte-61agw6{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(31 41 55 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity));text-decoration-line:none\n}a.svelte-61agw6.svelte-61agw6:hover{--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.svelte-61agw6.svelte-61agw6{--tw-border-opacity:1;border-color:rgb(17 24 39 / var(--tw-border-opacity));padding-top:0.5rem;padding-bottom:0.5rem\n    }}a.active.svelte-61agw6.svelte-61agw6{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(22 163 74 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:none\n}a.active.svelte-61agw6.svelte-61agw6:hover{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.active.svelte-61agw6.svelte-61agw6{padding-top:0.5rem;padding-bottom:0.5rem\n    }}li.svelte-61agw6 span.svelte-61agw6{display:block;padding-bottom:0.25rem;font-size:1.125rem;line-height:1.75rem;text-transform:lowercase;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))\n}@media(min-width: 768px){li.svelte-61agw6 span.svelte-61agw6{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))\n    }}@media(min-width: 1024px){li.svelte-61agw6 span.svelte-61agw6{display:inline-block;padding-bottom:0px;font-size:1rem;line-height:1.5rem\n    }}ul.svelte-61agw6.svelte-61agw6{margin-left:0px;margin-bottom:0px\n}ul.svelte-61agw6 li.svelte-61agw6{list-style-type:none\n}@media(min-width: 1024px){ul.svelte-61agw6 li.svelte-61agw6{display:inline-block;padding-right:0.75rem\n    }}",
  map: `{"version":3,"file":"NavContent.svelte","sources":["NavContent.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\n<\/script>\\n\\n<style lang=\\"postcss\\">\\n\\ta {\\n\\n    display: block;\\n\\n    border-bottom-width: 2px;\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(31 41 55 / var(--tw-border-opacity));\\n\\n    padding-top: 0.25rem;\\n\\n    padding-bottom: 0.25rem;\\n\\n    padding-left: 0.25rem;\\n\\n    vertical-align: middle;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(31 41 55 / var(--tw-text-opacity));\\n\\n    text-decoration-line: none\\n}\\n\\na:hover {\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(34 197 94 / var(--tw-border-opacity));\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(34 197 94 / var(--tw-text-opacity))\\n}\\n\\n@media (min-width: 768px) {\\n\\n    a {\\n\\n        --tw-border-opacity: 1;\\n\\n        border-color: rgb(17 24 39 / var(--tw-border-opacity));\\n\\n        padding-top: 0.5rem;\\n\\n        padding-bottom: 0.5rem\\n    }\\n}\\n\\n\\ta.active {\\n\\n    display: block;\\n\\n    border-bottom-width: 2px;\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(22 163 74 / var(--tw-border-opacity));\\n\\n    padding-top: 0.25rem;\\n\\n    padding-bottom: 0.25rem;\\n\\n    padding-left: 0.25rem;\\n\\n    vertical-align: middle;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(255 255 255 / var(--tw-text-opacity));\\n\\n    text-decoration-line: none\\n}\\n\\n\\ta.active:hover {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(255 255 255 / var(--tw-text-opacity))\\n}\\n\\n\\t@media (min-width: 768px) {\\n\\n    a.active {\\n\\n        padding-top: 0.5rem;\\n\\n        padding-bottom: 0.5rem\\n    }\\n}\\n\\n\\tli span {\\n\\n    display: block;\\n\\n    padding-bottom: 0.25rem;\\n\\n    font-size: 1.125rem;\\n\\n    line-height: 1.75rem;\\n\\n    text-transform: lowercase;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(209 213 219 / var(--tw-text-opacity))\\n}\\n\\n\\t@media (min-width: 768px) {\\n\\n    li span {\\n\\n        --tw-text-opacity: 1;\\n\\n        color: rgb(156 163 175 / var(--tw-text-opacity))\\n    }\\n}\\n\\n\\t@media (min-width: 1024px) {\\n\\n    li span {\\n\\n        display: inline-block;\\n\\n        padding-bottom: 0px;\\n\\n        font-size: 1rem;\\n\\n        line-height: 1.5rem\\n    }\\n}\\n\\n\\tul {\\n\\n    margin-left: 0px;\\n\\n    margin-bottom: 0px\\n}\\n\\n\\tul li {\\n\\n    list-style-type: none\\n}\\n\\n\\t@media (min-width: 1024px) {\\n\\n    ul li {\\n\\n        display: inline-block;\\n\\n        padding-right: 0.75rem\\n    }\\n}\\n</style>\\n\\n<nav>\\n\\t<ul>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{$page.url.pathname === '/' ? 'page' : undefined}\\" class:active={$page.url.pathname == '/'} href=\\".\\">\\n\\t\\t\\t\\t<span>Home</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{$page.url.pathname === '/about-you' ? 'page' : undefined}\\" class:active={$page.url.pathname == '/about-you'} href=\\"/about-you\\">\\n\\t\\t\\t\\t<span>About YOU</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{$page.url.pathname === '/music-career' ? 'page' : undefined}\\" class:active={$page.url.pathname == '/music-career'} href=\\"/music-career\\">\\n\\t\\t\\t\\t<span>Music Career</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{$page.url.pathname === '/discography' ? 'page' : undefined}\\" class:active={$page.url.pathname == '/discography'} href=\\"/discography\\">\\n\\t\\t\\t\\t<span>Discography</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{$page.url.pathname === '/where-to-buy' ? 'page' : undefined}\\" class:active={$page.url.pathname == '/where-to-buy'} href=\\"/where-to-buy\\">\\n\\t\\t\\t\\t<span>Where to Buy</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t</ul>\\n</nav>\\n"],"names":[],"mappings":"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"}`
};
const NavContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<nav><ul class="svelte-61agw6"><li class="svelte-61agw6"><a${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} href="." class="${["svelte-61agw6", $page.url.pathname == "/" ? "active" : ""].join(" ").trim()}"><span class="svelte-61agw6" data-svelte-h="svelte-3sk4b5">Home</span></a></li> <li class="svelte-61agw6"><a${add_attribute("aria-current", $page.url.pathname === "/about-you" ? "page" : void 0, 0)} href="/about-you" class="${["svelte-61agw6", $page.url.pathname == "/about-you" ? "active" : ""].join(" ").trim()}"><span class="svelte-61agw6" data-svelte-h="svelte-nq14g0">About YOU</span></a></li> <li class="svelte-61agw6"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/music-career" ? "page" : void 0,
    0
  )} href="/music-career" class="${["svelte-61agw6", $page.url.pathname == "/music-career" ? "active" : ""].join(" ").trim()}"><span class="svelte-61agw6" data-svelte-h="svelte-1bvyo7t">Music Career</span></a></li> <li class="svelte-61agw6"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/discography" ? "page" : void 0,
    0
  )} href="/discography" class="${["svelte-61agw6", $page.url.pathname == "/discography" ? "active" : ""].join(" ").trim()}"><span class="svelte-61agw6" data-svelte-h="svelte-k4ciu5">Discography</span></a></li> <li class="svelte-61agw6"><a${add_attribute(
    "aria-current",
    $page.url.pathname === "/where-to-buy" ? "page" : void 0,
    0
  )} href="/where-to-buy" class="${["svelte-61agw6", $page.url.pathname == "/where-to-buy" ? "active" : ""].join(" ").trim()}"><span class="svelte-61agw6" data-svelte-h="svelte-1inw6gy">Where to Buy</span></a></li></ul></nav>`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="hidden lg:block lg:w-3/5 relative top-16">${validate_component(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div> <div class="block lg:hidden"><button class="fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600" data-svelte-h="svelte-kdynz2"><svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></button></div>`;
});
const NavMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div id="navMobile" class="fixed w-0 h-full z-50 overflow-x-hidden bg-gray-800 bg-opacity-95"><div class="flex flex-wrap flex-col content-end px-6 my-4"><button class="flex-1 p-0 text-white text-5xl" data-svelte-h="svelte-1a8qrg5">×</button></div> <div class="overlay-content mt-6 px-6">${validate_component(NavContent, "NavContent").$$render($$result, {}, {}, {})}</div></div>`;
});
const bg = "/_app/immutable/assets/bg02.d-rrOCAm.jpg";
const you01 = "/_app/immutable/assets/you01.S6WXdQLc.jpg";
const you02 = "/_app/immutable/assets/you02.DHKVfou6.jpg";
const you03 = "/_app/immutable/assets/you03.DTIZp-p-.jpg";
const you04 = "/_app/immutable/assets/you04.DYfhA3A-.jpg";
const you05 = "/_app/immutable/assets/you05.B5o5zb8O.jpg";
const you06 = "/_app/immutable/assets/you06.Co-rZrL5.jpg";
const you07 = "/_app/immutable/assets/you07.CpkMWSt2.jpg";
const you08 = "/_app/immutable/assets/you08.5NsDZ54I.jpg";
const you09 = "/_app/immutable/assets/you09.DYrQpi6j.jpg";
const you10 = "/_app/immutable/assets/you10.DG65vRuz.jpg";
const you11 = "/_app/immutable/assets/you11.C-vpRvcw.jpg";
const you12 = "/_app/immutable/assets/you12.DLSDatRD.jpg";
const you13 = "/_app/immutable/assets/you13.BnFjSHPo.jpg";
const you14 = "/_app/immutable/assets/you14.BzAN95G-.jpg";
const you15 = "/_app/immutable/assets/you15.CbASv0Cs.jpg";
const you16 = "/_app/immutable/assets/you16.Bcnyz5ST.jpg";
const css = {
  code: "@media(min-width: 1024px){.image-rotation.svelte-1alx5x6 figure.svelte-1alx5x6{height:500px}}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">export const prerender = true;\\nimport { dev } from \\"$app/environment\\";\\nimport { page } from \\"$app/stores\\";\\nimport { onMount } from \\"svelte\\";\\nimport { GoogleAnalytics } from \\"@beyonk/svelte-google-analytics\\";\\nimport Nav from \\"$lib/Nav.svelte\\";\\nimport NavMobile from \\"$lib/NavMobile.svelte\\";\\nimport Link from \\"$lib/Link.svelte\\";\\nimport Image from \\"svelte-image\\";\\nimport \\"../styles/tailwind-output.css\\";\\nimport \\"../app.css\\";\\nimport bg from \\"$lib/images/bg02.jpg\\";\\nimport you01 from \\"$lib/images/image-rotation/you01.jpg\\";\\nimport you02 from \\"$lib/images/image-rotation/you02.jpg\\";\\nimport you03 from \\"$lib/images/image-rotation/you03.jpg\\";\\nimport you04 from \\"$lib/images/image-rotation/you04.jpg\\";\\nimport you05 from \\"$lib/images/image-rotation/you05.jpg\\";\\nimport you06 from \\"$lib/images/image-rotation/you06.jpg\\";\\nimport you07 from \\"$lib/images/image-rotation/you07.jpg\\";\\nimport you08 from \\"$lib/images/image-rotation/you08.jpg\\";\\nimport you09 from \\"$lib/images/image-rotation/you09.jpg\\";\\nimport you10 from \\"$lib/images/image-rotation/you10.jpg\\";\\nimport you11 from \\"$lib/images/image-rotation/you11.jpg\\";\\nimport you12 from \\"$lib/images/image-rotation/you12.jpg\\";\\nimport you13 from \\"$lib/images/image-rotation/you13.jpg\\";\\nimport you14 from \\"$lib/images/image-rotation/you14.jpg\\";\\nimport you15 from \\"$lib/images/image-rotation/you15.jpg\\";\\nimport you16 from \\"$lib/images/image-rotation/you16.jpg\\";\\nlet mainImage = you01;\\nlet mainContent;\\nfunction randomYouImage() {\\n  const youPics = [\\n    you01,\\n    you02,\\n    you03,\\n    you04,\\n    you05,\\n    you06,\\n    you07,\\n    you08,\\n    you09,\\n    you10,\\n    you11,\\n    you12,\\n    you13,\\n    you14,\\n    you15,\\n    you16\\n  ];\\n  const randomNum = Math.floor(Math.random() * youPics.length);\\n  return youPics[randomNum];\\n}\\nonMount(() => {\\n  mainContent = document.querySelector(\\".main-content\\");\\n});\\npage.subscribe(({ url, params, status }) => {\\n  mainImage = randomYouImage();\\n  if (mainContent) mainContent.scrollTop = 0;\\n});\\n<\/script>\\n\\n<style>\\n\\t@media (min-width: 1024px) {\\n\\t\\t.image-rotation figure {\\n\\t\\t\\theight: 500px;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n{#if !dev}\\n\\t<GoogleAnalytics properties={[ 'G-WN3BJ9W3N5' ]} />\\n{/if}\\n\\n<NavMobile />\\n\\n<div class=\\"font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover\\" style=\\"background-image:url({bg});\\">\\n\\t<div class=\\"max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-24 px-6 lg:px-0 lg:my-0\\">\\n\\n\\t\\t<Nav />\\n\\n\\t\\t<div class=\\"main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll\\">\\n\\t\\t\\t<div class=\\"p-4 md:p-6\\">\\n\\t\\t\\t\\t<div class=\\"block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top\\" style=\\"background-image: url({mainImage})\\"></div>\\n\\n\\t\\t\\t\\t<h1 class=\\"text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left\\">Forget-me-not: a You fansite</h1>\\n\\t\\t\\t\\t<div class=\\"mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25\\"></div>\\n\\n\\t\\t\\t\\t<slot></slot>\\n\\n\\t\\t\\t\\t<div class=\\"pt-4\\">\\n\\t\\t\\t\\t\\t<p class=\\"italic text-xs text-center lg:text-left\\">\\n\\t\\t\\t\\t\\t\\t&copy; 2004-2024<br>\\n\\t\\t\\t\\t\\t\\t<Link href=\\"https://sekai.co.uk\\" class=\\"no-underline\\">Contact webmaster</Link> &bullet; <Link href=\\"https://github.com/mikachan/forget-me-not\\" class=\\"no-underline\\">View on GitHub</Link>\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"image-rotation w-full lg:w-2/5\\">\\n\\t\\t\\t<figure class=\\"hidden lg:block\\">\\n\\t\\t\\t\\t<Image src=\\"{mainImage}\\" alt=\\"You\\" class=\\"rounded-none lg:rounded-lg shadow-2xl\\" ratio=\\"141%\\" placeholderClass=\\"rounded-none lg:rounded-lg\\" />\\n\\t\\t\\t</figure>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n"],"names":[],"mappings":"AA8DC,MAAO,YAAY,MAAM,CAAE,CAC1B,8BAAe,CAAC,qBAAO,CACtB,MAAM,CAAE,KACT,CACD"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0) $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `${`${validate_component(GoogleAnalytics, "GoogleAnalytics").$$render($$result, { properties: ["G-WN3BJ9W3N5"] }, {}, {})}`} ${validate_component(NavMobile, "NavMobile").$$render($$result, {}, {}, {})} <div class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style="${"background-image:url(" + escape(bg, true) + ");"}"><div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-24 px-6 lg:px-0 lg:my-0">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll"><div class="p-4 md:p-6"><div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top" style="${"background-image: url(" + escape(mainImage, true) + ")"}"></div> <h1 class="text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left" data-svelte-h="svelte-1hoqgsh">Forget-me-not: a You fansite</h1> <div class="mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25"></div> ${slots.default ? slots.default({}) : ``} <div class="pt-4"><p class="italic text-xs text-center lg:text-left">© 2004-2024<br> ${validate_component(Link, "Link").$$render(
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
  )}</p></div></div></div> <div class="image-rotation w-full lg:w-2/5 svelte-1alx5x6"><figure class="hidden lg:block svelte-1alx5x6">${validate_component(Image, "Image").$$render(
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

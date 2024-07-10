import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { t as title } from "../../../../chunks/store.js";
import { I as Image } from "../../../../chunks/Image.js";
import { L as Link } from "../../../../chunks/Link.js";
const hdarts04 = "/_app/immutable/assets/hdarts04.BAHReaRP.jpg";
const hdarts03 = "/_app/immutable/assets/hdarts03.z7z44onS.jpg";
const hdarts02 = "/_app/immutable/assets/hdarts02.zxL8KLJ-.jpg";
const hdarts01 = "/_app/immutable/assets/hdarts01.CMOu6c_F.jpg";
const edhardy2 = "/_app/immutable/assets/edhardy03.YPkvBQQh.jpg";
const edhardy1 = "/_app/immutable/assets/edhardy01.CxxhUnBr.jpg";
const earring = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAGQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAEQ0NDQ4NEg4OEhoRDxEaHxcSEhcfIhcXFxcXIiMbHh0dHhsjIykqLSopIzY2Ozs2NkFBQUFBQUFBQUFBQUFBQQESEREUFhQYFRUYFxMXExcdFxkZFx0sHR0gHR0sOCgjIyMjKDgyNS0tLTUyPT04OD09QUFBQUFBQUFBQUFBQUFB/8AAEQgARgBGAwEiAAIRAQMRAf/EAHYAAQEAAwEBAQAAAAAAAAAAAAABAgUGBAMHAQEBAQEAAAAAAAAAAAAAAAAAAQIDEAABAwMCBAUEAwEAAAAAAAABAAIDESEEEgUxQWFxUYEiEwahQlIUkWIjghEBAQACAgMBAAAAAAAAAAAAAAERAiFBMVEDEv/aAAwDAQACEQMRAD8A4kA1U4G6V8b9UHAnkqBSvStUVAJt4IIUSnJKUvWyAE7p9EtS6B5ooigKgWrXyUoeduitlRlXhW5S9brcQfHpHwNmyMqDF1t1Mjkd/oQeHpHCqxkw4MUNa3TkOdaWXixrj9sdDcjxWbtF/Nakc0pZdTjbPt+ZiROh1RzCT2pg64DnXY+vIHgs8TbsbDkkbNDHPI0lrhICWjtdZv0kWaWuT6UtyWPNbrctugaDLjjR+TK1b/ytM5pFityyzMSyy4qc0UqiqKB4r1Yu35ma4NxoXzONvS0kDuV6dtzNuxInvyMP9vKJ/wA9bqQtb1aLkrOf5DuUsQx45BjY44RQARt86cVMnHtsIdndhObLuU0LHCwxyP2JXdNLTQeZXqx/kmJin248SIvBIbJIBG1jezQadVyBe8nUXGp51uvrHNEG0kYSbeoG9OxUs7WXHEdJuu6yPxhpDI/fLS98dQCGk0rZtf4W42aA5Tf25fU03bX73ePZci/Lx8s4+JGwxR6g10shGrSaDlYL9LxIIWQMjxnMfExoa3Q4EUHZcd5eOHXWzNuWk+SYbpsUTMaGmLi1oDajyXFOhD6g81+oZEY9lzXijTa64TcMNmNM97nBkAu1/j/Vv5Fa+e/VZ+mvcc5oOvRzrRE1evVW9aou2XNEUqiCqKKoKDS4Xpg3HLx3B8T6EcKgOH1Xk4qqYPDbO+Sbs4Wla3qI2Vt3C10+TPkP9yeR0rz9zjVfJSqTWRbbfNWo4ooiIqIioIiICIiCFXkiICIig//Z";
const bracelet = "/_app/immutable/assets/bracelet.BidOm8M_.jpg";
const prerender = true;
let pageTitle = "Designs";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <h3 data-svelte-h="svelte-1xxkcq1">Jewellery</h3> <figure style="width: 120px;">${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "Bracelet",
      class: "p-2 pt-0",
      align: "right",
      src: bracelet,
      ratio: "70%"
    },
    {},
    {}
  )}</figure> <p>You has designed a couple of bracelets with Monkey-act-web. All You-related things could be found under the <em data-svelte-h="svelte-b71gwc">WithMAD</em> section of the site. The last bracelet on the ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "http://www.monkey-act-web.com/you/youpage.html"
    },
    {},
    {
      default: () => {
        return `this page`;
      }
    }
  )} he designed in 2003.</p> <figure style="width: 100px;">${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "Earring",
      class: "p-2 pt-0",
      align: "right",
      src: earring,
      ratio: "90%"
    },
    {},
    {}
  )}</figure> <p data-svelte-h="svelte-1871ydp">He also designed a silver earring and a pendant in 2004, also under the WithMAD branding.</p> <p data-svelte-h="svelte-18x4umq">You has made comments on the bracelets, saying they were his first collaboration with Monkey, and that it took a long time to design them.</p> <p>He&#39;s also designed other pieces of jewelery for <em data-svelte-h="svelte-m58t0z">h-Darts</em>, including earrings, bracelets and necklaces. His latest design is a bracelet titled &quot;Earth&quot;, which can be seen ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "http://www.h-darts.com/original/order/image/g_you_model.jpg"
    },
    {},
    {
      default: () => {
        return `here`;
      }
    }
  )}.</p> <p data-svelte-h="svelte-18o0psi">The best thing from the h-darts collab was this gorgeous but slightly awkward must-show-hands-and-wrists-in-all-shots photoshoot:</p> <figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "h-darts",
      class: "p-2 pt-0 inline-block",
      src: hdarts01
    },
    {},
    {}
  )} ${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "h-darts",
      class: "p-2 pt-0 inline-block",
      src: hdarts02
    },
    {},
    {}
  )}</figure> <figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "h-darts",
      class: "p-2 pt-0 inline-block",
      src: hdarts03
    },
    {},
    {}
  )} ${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "h-darts",
      class: "p-2 pt-0 inline-block",
      src: hdarts04
    },
    {},
    {}
  )}</figure> <h3 class="mt-4" data-svelte-h="svelte-17u5cgd">Clothing</h3> <p data-svelte-h="svelte-fkm14h">You collaborated with Ed Hardy in 2014 on a clothing range.</p> <figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "Ed Hardy x You",
      class: "p-2 pt-0",
      align: "right",
      src: edhardy1
    },
    {},
    {}
  )}</figure> <figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "Ed Hardy x You",
      class: "p-2 pt-0 mb-4",
      align: "right",
      src: edhardy2,
      ratio: "50%"
    },
    {},
    {}
  )}</figure> <p data-svelte-h="svelte-1bwsne1"><a href="/about-you">← Back to About You</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

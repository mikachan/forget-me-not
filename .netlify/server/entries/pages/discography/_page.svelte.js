import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../chunks/index.js";
import { t as title } from "../../../chunks/store.js";
import { I as Image } from "../../../chunks/Image.js";
const moonchild = "/_app/immutable/assets/moonchild-53a59bb5.jpg";
const prerender = true;
let pageTitle = "Discography";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${escape(pageTitle)}</h2>

<h3>Full Discography <a href="${"/discography/full-discography"}" class="${"text-sm"}">read more →</a></h3>

<p>View You&#39;s full discography including release dates, artist collaborations and credits.</p>

<h3>Appearances <a href="${"/discography/appearances"}" class="${"text-sm"}">read more →</a></h3>

<p>You has appeared in many videos, books, magazines and interviews, especially from working with Gackt. The highlight obviously being his acting skillz in <em>Moon Child</em>:</p>

<figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "You in Moon Child",
      class: "p-2 pt-0 mx-auto mb-2",
      src: moonchild,
      ratio: "55%"
    },
    {},
    {}
  )}</figure>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

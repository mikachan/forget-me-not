import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import { t as title } from "../../../../chunks/store.js";
const prerender = true;
let pageTitle = "GacktJob";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-exndny">The members of GacktJob have said that You is like a robot, with the exception of Gackt, who says he&#39;s half donkey, half horse.</p> <p data-svelte-h="svelte-1r7zbdx">They celebrated You&#39;s 30th birthday on Gackt&#39;s radio show together; I&#39;ve dedicated a page to it <a href="/music-career/birthday-2003">here</a> since I had so much info about it.</p> <p data-svelte-h="svelte-s4r4r4"><em>More info coming soon.</em></p> <p data-svelte-h="svelte-4rxrxr"><a href="/music-career">← Backt to Music Career</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

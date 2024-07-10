import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Special Thanks" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <ul data-svelte-h="svelte-isqodz"><li><strong>Torabara</strong> for images, the Starlight Gig screencaps and R&amp;R screencaps.</li> <li><strong>Jirion</strong> for images.</li> <li><strong>Sei-chan</strong> for information, images and lots of other random things.</li> <li><strong>Akiko</strong> for R&amp;R screencaps, icons, images, for the pronunciation of You and for plugging my site everywhere.</li> <li><strong>Sari</strong> for images and information.</li> <li><strong>Alexy</strong> for icons.</li> <li><strong>Natalie</strong> for a recording of You&#39;s voice.</li> <li><strong>Kana</strong> for R&amp;R screencaps and being the lovely person that you are.</li> <li><strong>Mitsuki</strong> for the translation of Etude.</li> <li><strong>Chi</strong> for information.</li> <li><strong>Lindley</strong> for screen caps.</li></ul> <p data-svelte-h="svelte-1yyw4fc">Thank you thank you thank you! Also, thank you to all the people that have signed my guestbook, emailed me and just mentioned this site to me, it means a lot.</p>`;
});
export {
  Page as default
};

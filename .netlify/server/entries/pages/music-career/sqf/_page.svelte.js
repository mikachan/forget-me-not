import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "S.Q.F" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-tiqdrw">Coming soon.</p> <p data-svelte-h="svelte-4rxrxr"><a href="/music-career">← Backt to Music Career</a></p>`;
});
export {
  Page as default
};

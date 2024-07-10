import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { L as Link } from "../../../../chunks/Link.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Site History" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-bp1sfb">The site was first opened on 23rd March, 2004. I decided to make a You fan site because, at the time, there were no sites dedicated to him in English.</p> <p data-svelte-h="svelte-1qrpjlz">The site was named after the Gackt song, <em>Wasurenai kara</em> (忘れないから, &#39;I won&#39;t forget&#39;). It was originally called <em>Silence and Motion</em> after the Final Fantasy VIII track of the same name.</p> <p>You can view the site source on ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://github.com/mikachan/forget-me-not"
    },
    {},
    {
      default: () => {
        return `GitHub`;
      }
    }
  )}.</p> <p data-svelte-h="svelte-1mr28zw"><a href="site/thanks">Thank you</a> to everyone who helped make this site possible over the years.</p> <p>I&#39;m ${validate_component(Link, "Link").$$render($$result, { href: "https://sekai.co.uk" }, {}, {
    default: () => {
      return `Sarah`;
    }
  })}, your average J-rock/anything-Japanese nerd from the UK.</p>`;
});
export {
  Page as default
};

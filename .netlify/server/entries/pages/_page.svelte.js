import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { L as Link } from "../../chunks/Link.js";
const prerender = true;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-u51uix_START -->${$$result.title = `<title>Forget-me-not | You fansite</title>`, ""}<!-- HEAD_svelte-u51uix_END -->`, ""}

<p>Welcome to <strong>Forget-me-not</strong>, an <a href="${"/site/history"}">English fansite</a> dedicated to the Japanese musician, <strong>You</strong>, best known for playing guitar and violin for ${validate_component(Link, "Link").$$render($$result, { href: "https://gackt.com/" }, {}, {
    default: () => {
      return `Gackt`;
    }
  })} and ${validate_component(Link, "Link").$$render($$result, { href: "http://www.sqf.jp/" }, {}, {
    default: () => {
      return `S.Q.F`;
    }
  })}.</p>

<h2>Latest Site Updates <a href="${"/site/updates"}" class="${"text-sm"}">read more →</a></h2>

<p><strong>14.12.22</strong><br>
	Updated the site to use ${validate_component(Link, "Link").$$render($$result, { href: "https://kit.svelte.dev/" }, {}, {
    default: () => {
      return `SvelteKit 1.0.0`;
    }
  })} 🎉.
</p>`;
});
export {
  Page as default,
  prerender
};

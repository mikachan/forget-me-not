import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { L as Link } from "../../chunks/Link.js";
const prerender = true;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-u51uix_START -->${$$result.title = `<title>Forget-me-not | You fansite</title>`, ""}<!-- HEAD_svelte-u51uix_END -->`, ""} <p>Welcome to <strong data-svelte-h="svelte-1c8a9ug">Forget-me-not</strong>, an <a href="/site/history" data-svelte-h="svelte-kybfwn">English fansite</a> dedicated to the Japanese musician, <strong data-svelte-h="svelte-p18p0b">You</strong>, best known for playing guitar and violin for ${validate_component(Link, "Link").$$render($$result, { href: "https://gackt.com/" }, {}, {
    default: () => {
      return `Gackt`;
    }
  })} and ${validate_component(Link, "Link").$$render($$result, { href: "http://www.sqf.jp/" }, {}, {
    default: () => {
      return `S.Q.F`;
    }
  })}.</p> <h2 data-svelte-h="svelte-nf7hm2">Latest Site Updates <a href="/site/updates" class="text-sm">read more →</a></h2> <p><strong data-svelte-h="svelte-4kosvs">10.07.24</strong><br>
	You unfortunately had to cancel his appearance at Gackt&#39;s birthday celebrations on July 4, 2024. You posted a full update on ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://gackt.com/contents/763853"
    },
    {},
    {
      default: () => {
        return `gackt.com`;
      }
    }
  )}.</p>`;
});
export {
  Page as default,
  prerender
};

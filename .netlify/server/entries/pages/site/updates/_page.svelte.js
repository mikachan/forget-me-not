import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../../chunks/index.js";
import { L as Link } from "../../../../chunks/Link.js";
import { t as title } from "../../../../chunks/store.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "hr.svelte-19dnt2g{margin-top:0.5rem;margin-bottom:1rem;--tw-border-opacity:1;border-color:rgb(74 222 128 / var(--tw-border-opacity));opacity:0.25\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Site Updates" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}



<h2>${escape(pageTitle)}</h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitcasting.tv/chachamaru_yfcz"
    },
    {},
    {
      default: () => {
        return `TwitCasting`;
      }
    }
  )} again. For full details, see ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538"
    },
    {},
    {
      default: () => {
        return `Chacha&#39;s Twitter`;
      }
    }
  )}.
</p>

<hr class="${"border-b-1 svelte-19dnt2g"}">

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitcasting.tv/chachamaru_yfcz"
    },
    {},
    {
      default: () => {
        return `TwitCasting`;
      }
    }
  )} again. For full details, see ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538"
    },
    {},
    {
      default: () => {
        return `Chacha&#39;s Twitter`;
      }
    }
  )}.
</p>

<hr class="${"border-b-1 svelte-19dnt2g"}">

<p><strong>16.02.21</strong><br>
	Ded Chaplin and Luscious are streaming two live performances on 17th and 18th February, from The Doors in Hatsudai. You can purchase tickets to watch the performances live through ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitcasting.tv/chachamaru_yfcz"
    },
    {},
    {
      default: () => {
        return `TwitCasting`;
      }
    }
  )}, which also gives you access to watch the stream recording up to 2 weeks from the original broadcast. See ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722"
    },
    {},
    {
      default: () => {
        return `Chacha&#39;s Twitter`;
      }
    }
  )} for more info. Looking forward to it!
</p>

<hr class="${"border-b-1 svelte-19dnt2g"}">

<p><strong>10.02.21</strong><br>
	Happy birthday YOU! お誕生日おめでとう!
</p>

<hr class="${"border-b-1 svelte-19dnt2g"}">

<p><strong>01.01.21</strong><br>
	Happy New Year! 明けましておめでとうございます!
</p>

<hr class="${"border-b-1 svelte-19dnt2g"}">

<p><strong>12.12.20</strong><br>
	Guess who&#39;s back! After over 6 years I&#39;ve decided to rebuild this fansite. I&#39;ve restored most of the content but not many images yet, and I&#39;m guessing loads of the information is now incorrect or wildy out of date. But it&#39;s back and I&#39;d forgotten how much I enjoy fangirling over You!
</p>`;
});
export {
  Page as default
};

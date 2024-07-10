import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { L as Link } from "../../../../chunks/Link.js";
import { t as title } from "../../../../chunks/store.js";
const css = {
  code: "hr.svelte-19dnt2g{margin-top:0.5rem;margin-bottom:1rem;--tw-border-opacity:1;border-color:rgb(74 222 128 / var(--tw-border-opacity));opacity:0.25\n}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Link from \\"$lib/Link.svelte\\";\\nimport { title } from \\"../../../store\\";\\nexport let pageTitle = \\"Site Updates\\";\\ntitle.set(pageTitle);\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>{$title}</title>\\n</svelte:head>\\n\\n<style lang=\\"postcss\\">\\n\\thr {\\n    margin-top: 0.5rem;\\n    margin-bottom: 1rem;\\n    --tw-border-opacity: 1;\\n    border-color: rgb(74 222 128 / var(--tw-border-opacity));\\n    opacity: 0.25\\n}\\n</style>\\n\\n<h2>{pageTitle}</h2>\\n\\n<p>\\n\\t<strong>04.05.24</strong><br>\\n\\tYou will be performing at Gackt's birthday celebrations on July 4, 2024. For more information and ticket sales, see <Link href=\\"https://ch.nicovideo.jp/gackt/blomaga/ar2194220\\">ch.nicovideo.jp</Link>.\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>14.12.22</strong><br>\\n\\tUpdated the site to use <Link href=\\"https://kit.svelte.dev/\\">SvelteKit 1.0.0</Link> 🎉.\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>18.05.21</strong><br>\\n\\tLuscious have announced they're going to be doing another live performance on June 17th! It'll be at Club Phase Takadanobaba in Tokyo, and will be streamed on <Link href=\\"https://twitcasting.tv/chachamaru_yfcz\\">TwitCasting</Link> again. For full details, see <Link href=\\"https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538\\">Chacha's Twitter</Link>.\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>16.02.21</strong><br>\\n\\tDed Chaplin and Luscious are streaming two live performances on 17th and 18th February, from The Doors in Hatsudai. You can purchase tickets to watch the performances live through <Link href=\\"https://twitcasting.tv/chachamaru_yfcz\\">TwitCasting</Link>, which also gives you access to watch the stream recording up to 2 weeks from the original broadcast. See <Link href=\\"https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722\\">Chacha's Twitter</Link> for more info. Looking forward to it!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>10.02.21</strong><br>\\n\\tHappy birthday YOU! お誕生日おめでとう!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>01.01.21</strong><br>\\n\\tHappy New Year! 明けましておめでとうございます!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>12.12.20</strong><br>\\n\\tGuess who's back! After over 6 years I've decided to rebuild this fansite. I've restored most of the content but not many images yet, and I'm guessing loads of the information is now incorrect or wildy out of date. But it's back and I'd forgotten how much I enjoy fangirling over You!\\n</p>\\n"],"names":[],"mappings":"AAWC,iBAAG,CACA,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI,CACnB,mBAAmB,CAAE,CAAC,CACtB,YAAY,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CACxD,OAAO,CAAE,IAAI;AACjB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Site Updates" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$result.css.add(css);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}  <h2>${escape(pageTitle)}</h2> <p><strong data-svelte-h="svelte-1axyaif">04.05.24</strong><br>
	You will be performing at Gackt&#39;s birthday celebrations on July 4, 2024. For more information and ticket sales, see ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://ch.nicovideo.jp/gackt/blomaga/ar2194220"
    },
    {},
    {
      default: () => {
        return `ch.nicovideo.jp`;
      }
    }
  )}.</p> <hr class="border-b-1 svelte-19dnt2g"> <p><strong data-svelte-h="svelte-1rngpe8">14.12.22</strong><br>
	Updated the site to use ${validate_component(Link, "Link").$$render($$result, { href: "https://kit.svelte.dev/" }, {}, {
    default: () => {
      return `SvelteKit 1.0.0`;
    }
  })} 🎉.</p> <hr class="border-b-1 svelte-19dnt2g"> <p><strong data-svelte-h="svelte-m73thd">18.05.21</strong><br>
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
  )}.</p> <hr class="border-b-1 svelte-19dnt2g"> <p><strong data-svelte-h="svelte-1d8egkw">16.02.21</strong><br>
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
  )} for more info. Looking forward to it!</p> <hr class="border-b-1 svelte-19dnt2g"> <p data-svelte-h="svelte-1fuhyfm"><strong>10.02.21</strong><br>
	Happy birthday YOU! お誕生日おめでとう!</p> <hr class="border-b-1 svelte-19dnt2g"> <p data-svelte-h="svelte-1s7tkl4"><strong>01.01.21</strong><br>
	Happy New Year! 明けましておめでとうございます!</p> <hr class="border-b-1 svelte-19dnt2g"> <p data-svelte-h="svelte-15ow321"><strong>12.12.20</strong><br>
	Guess who&#39;s back! After over 6 years I&#39;ve decided to rebuild this fansite. I&#39;ve restored most of the content but not many images yet, and I&#39;m guessing loads of the information is now incorrect or wildy out of date. But it&#39;s back and I&#39;d forgotten how much I enjoy fangirling over You!</p>`;
});
export {
  Page as default
};

import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { L as Link } from "../../../../chunks/Link.js";
import { I as Image } from "../../../../chunks/Image.js";
import { m as maracas } from "../../../../chunks/1996-mm.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Maracas" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-1g18z60">In 1996, Malice Mizer organised a series of events to celebrate their 4th anniversary, called <em>喜劇の晩餐~VISUAL ART COLLECTION VOL.1~</em>, made up of performances by cover bands each band member had put together. The first event was held on 8th November 1996 at Shibuya <em>ON AIR WEST</em>, a small venue that holds about 600 people. It was reviewed in <em>Fool&#39;s Mate 02.1997</em>, which is where the photo is from.</p> <p>Gackt described the cover band he put together in the Malice Mizer fanclub magazine <em data-svelte-h="svelte-1afbixu">Ma chérie</em> (vol. 2&amp;3). He first called ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://en.wikipedia.org/wiki/Maschera_(band)"
    },
    {},
    {
      default: () => {
        return `Maschera`;
      }
    }
  )}, another visual kei band that were active at the time, who were excited to perform with him. He then called You and invited him to perform as well, &quot;We spent 2-3 hours on the phone discussing details, chose the songs to perform and arranged a meeting.&quot;</p> <figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "You in Malice Mizer cover band 1996",
      class: "pb-4 mx-auto",
      src: maracas
    },
    {},
    {}
  )}</figure> <p data-svelte-h="svelte-l8qgul">The final line-up included Gackt, You, all of Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums) and Makoto (another old friend of Gackt&#39;s).</p> <p>Massive thank you to ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://ryuik.livejournal.com/224213.html"
    },
    {},
    {
      default: () => {
        return `Ryuik`;
      }
    }
  )} for the information and photo.</p> <p data-svelte-h="svelte-4rxrxr"><a href="/music-career">← Backt to Music Career</a></p>`;
});
export {
  Page as default
};

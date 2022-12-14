import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../../chunks/index.js";
import { t as title } from "../../../../chunks/store.js";
import { I as Image } from "../../../../chunks/Image.js";
import { L as Link } from "../../../../chunks/Link.js";
const band = "/_app/immutable/assets/cainsfeel-97d557e4.jpg";
const tape2 = "/_app/immutable/assets/tape-brown-4cc21d54.jpg";
const tape = "/_app/immutable/assets/tape-2eb60c80.jpg";
const prerender = true;
let pageTitle = "CAINS:FEEL";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${escape(pageTitle)}</h2>

<p>CAINS:FEEL was an indie Japanese visual kei (rock/goth) band formed in 1989 (although some sources say 1993) by You and Gackt. The band members were known as troublemakers as they often started fights at local venues, usually between rival bands. They mainly performed locally in Kyoto.</p>

<p>The origin of the name is from Cain and Abel, the sons of Adam and Eve from Genesis in the Old Testament.</p>

<p>At first, they struggled to find a vocalist and after a year of searching, Gackt jokingly suggested that he should do it, but You just laughed. After a couple of arguments and proving each other wrong, You gave Gackt a list of songs to practice and Gackt agreed to take vocal lessons. After a week of lessons, he sung in front of You for the first time, and You&#39;s response was, &quot;Why haven&#39;t you sung before?&quot;. Maybe without You&#39;s encouragment, Gackt wouldn&#39;t have even considered being a lead vocalist...</p>

<p>After Gackt had decided to be the lead vocalist, him and You recorded some demo songs to help recruit other band members. The majority of songs were written by Gackt and You.</p>

<h3>Band Members</h3>

<p><strong>Vocals:</strong> Gakuto (Gackt)<br>
	<strong>Guitar:</strong> You, Nao<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu, Ichirou<br>
	<strong>Keyboard:</strong> Reiona
</p>

<figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "CAINS:FEEL 1995",
      class: "pb-4 mx-auto",
      src: band,
      ratio: "68%"
    },
    {},
    {}
  )}</figure>

<p>They disbanded in 1995 when Gackt decided to move to Tokyo to join Malice Mizer as their vocalist. After the split, You became a studio guitarist for several different bands in Kyoto.</p>

<h3>Demo Tapes</h3>

<p>They made a demo tape in 1994, of which there were two versions: green and brown.</p>

<p>Whilst they recorded a lot of songs for these demo tapes, they only chose to include a couple. Some of the songs were later used by Gackt in his solo career (<em>etude</em> was used on <em>Love Letter</em>, <em>refrain</em> was renamed to <em>Solitude ~regret~</em> and performed during the ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.youtube.com/watch?v=eRvHzl6ENhk"
    },
    {},
    {
      default: () => {
        return `Jougen no Tsuki 2003 tour`;
      }
    }
  )}).</p>

<h4>Credits</h4>

<p><strong>Vocals:</strong> Gaku (Gackt)<br>
	<strong>Guitar:</strong> You<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu (studio drummer)
</p>

<h4>Green version:</h4>

<figure style="${"width: 140px;"}">${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "CAINS:FEEL 1994 demo tape open",
      class: "p-4 pt-0",
      src: tape,
      ratio: "138%"
    },
    {},
    {}
  )}</figure>

<ol class="${"list-decimal list-inside"}"><li>～lie～ [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/cVe9rssPA84" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blueの風に抱かれて) [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/A6CEeoU1KG4" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}]</li>
	<li>etude [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/cvGPKVu3LPQ" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}] [${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "/downloads/etude.txt",
      download: "etude lyric translation"
    },
    {},
    {
      default: () => {
        return `lyric translation`;
      }
    }
  )}]</li></ol>

<h4>Brown version:</h4>

<figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "CAINS:FEEL 1994 demo tape brown rare version",
      class: "p-4 pt-0",
      width: "130px",
      src: tape2,
      ratio: "60%"
    },
    {},
    {}
  )}</figure>

<ol class="${"list-decimal list-inside"}"><li>refrain</li>
	<li>～lie～ [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/cVe9rssPA84" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blueの風に抱かれて) [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/A6CEeoU1KG4" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}]</li>
	<li>etude [${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/cvGPKVu3LPQ" }, {}, {
    default: () => {
      return `youtube`;
    }
  })}] [${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "/downloads/etude.txt",
      download: "etude lyric translation"
    },
    {},
    {
      default: () => {
        return `lyric translation`;
      }
    }
  )}]</li></ol>

<p><a href="${"/music-career"}">← Backt to Music Career</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

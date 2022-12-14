import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../../chunks/index.js";
import { t as title } from "../../../../chunks/store.js";
import { L as Link } from "../../../../chunks/Link.js";
const prerender = true;
let pageTitle = "Appearances";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${escape(pageTitle)}</h2>

<h3>DVDs/Videos</h3>

<p>Alongside <a href="${"/discography/full-discography#live-music-dvds"}">live tour DVDs</a>, You has also appeared in the following:</p>

<ul><li>He played <em>Jun</em> in ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.imdb.com/title/tt0365514/"
    },
    {},
    {
      default: () => {
        return `Moon Child`;
      }
    }
  )} (2003)</li>
	<li><em>Life</em> short film, from Gackt&#39;s <em>Soyokaze</em> VHS (2002) <a href="${"/discography/life-short-film"}">Read more →</a></li>
	<li>Gackt PVs: <em>Mirror</em>, <em>ANOTHER WORLD</em>, <em>Juunigatsu no love song</em>, <em>Black Stone</em> &amp; <em>Redemption</em></li>
	<li>Yellow Fried Chickenz PVs: <em>All My Love</em> &amp; <em>Mata koko de Aimashou</em></li>
	<li>Gackt&#39;s <em>Gekkou</em> DVD (2003)</li>
	<li>Phone call on the radio between You and Gackt, from the <em>nine*nine</em> box set (2008) <a href="${"/discography/nine-nine-radio"}">Read more →</a></li>
	<li>Gackt&#39;s Platinum Boxes (DVDs)</li>
	<li>Gackt and You gave advice on bisexual relationships on NicoNico from 2015.07.01 (Subbed video on ${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/f4Tdz24iRPI" }, {}, {
    default: () => {
      return `Youtube from Yuzu Translations`;
    }
  })}. There&#39;s two other parts/sections to this video ${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/Z9W-f5qJFGc" }, {}, {
    default: () => {
      return `here`;
    }
  })} and ${validate_component(Link, "Link").$$render($$result, { href: "https://youtu.be/-ogP-Vc2SUA" }, {}, {
    default: () => {
      return `here`;
    }
  })}.)</li></ul>

<h3>CDs</h3>
<ul><li>Lyric booklet that comes with Gackt&#39;s <em>Moon</em> album</li>
	<li>Lyric booklet that comes with Gackt&#39;s <em>The Seventh Night</em> album</li></ul>

<h3>Books</h3>
<ul><li>Gackt&#39;s <em>Mizerable ~Unmei~</em> photobook</li>
	<li>All of Gackt&#39;s tour document photobooks (<em>The Gift</em>, <em>Just Bring it!</em> etc)</li>
	<li>The Crescent side of <em>The Air Moon</em></li>
	<li>Gackt File 1999-2004</li></ul>

<h3>Magazines*</h3>
<ul><li><em>Shoxx</em> May 1999</li>
	<li>UV 100 magazine</li>
	<li>Motto2 vol. 01</li>
	<li>Motto2 vol. 08</li></ul>

<h3>Other</h3>
<ul><li>Gackt Dears fan club videos</li>
	<li>Interviews with Gackt</li>
	<li>Gackt&#39;s radio show</li>
	<li>Modeling jewelery for ${validate_component(Link, "Link").$$render($$result, { href: "http://h-darts.com" }, {}, {
    default: () => {
      return `h-Darts`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "http://www.executivemonthly.com/english/about/index.php"
    },
    {},
    {
      default: () => {
        return `Executive Monthly`;
      }
    }
  )} CM. He&#39;s sitting at the bar talking to a girl.</li></ul>

<p><em class="${"text-sm"}">There&#39;s loads more... these lists are definitely a work in progress.</em></p>

<p><a href="${"/discography"}">← Back to Discography</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

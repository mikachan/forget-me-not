import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../chunks/index.js";
import { t as title } from "../../../chunks/store.js";
import { L as Link } from "../../../chunks/Link.js";
const prerender = true;
let pageTitle = "Where to Buy";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${escape(pageTitle)}</h2>

<p>There are several places you can buy Gackt, S.Q.F etc releases online.</p>

<ul><li>${validate_component(Link, "Link").$$render($$result, { href: "http://www.yesasia.com/" }, {}, {
    default: () => {
      return `YesAsia`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render($$result, { href: "http://www.cdjapan.co.jp/" }, {}, {
    default: () => {
      return `CD Japan`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render($$result, { href: "http://www.amazon.co.jp/" }, {}, {
    default: () => {
      return `Amazon Japan`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render($$result, { href: "http://www.hmv.co.jp/" }, {}, {
    default: () => {
      return `HMV Japan`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render($$result, { href: "http://buyee.jp/" }, {}, {
    default: () => {
      return `Buyee.jp`;
    }
  })}</li>
	<li>${validate_component(Link, "Link").$$render($$result, { href: "http://www.jlist.com/" }, {}, {
    default: () => {
      return `JList`;
    }
  })}</li></ul>

<p>Both Gackt and S.Q.F are available on most popular music streaming services.</p>

<h3>Suggested Merch for You Fans</h3>

<h4>Albums</h4>
<ul><li><em>Moon</em> (Gackt): You is heavily featured in the CD booklet</li>
	<li><em>The Seventh Night</em> (Gackt): Nice pictures of You and Gackt in the chunky booklet that comes with the CD</li></ul>

<h4>Photobooks &amp; Magazines</h4>
<ul><li>Mizerable ~Unmei~ photobook</li>
	<li>For Dears</li>
	<li>Jougen no Tsuki Tour Book</li>
	<li>The Air Moon (The Crescent side)</li>
	<li>The Sixth Day &amp; Seventh Night Tour Book</li>
	<li>Gackt File 1999-2004</li>
	<li>DIABOLOS tour book</li></ul>

<h4>Live Tour DVDs</h4>

<p>Any of Gackt&#39;s from 2000-2019, but my personal favourites are:</p>

<ul><li><em>Kagen no Tsuki (2002)</em></li>
	<li><em>Jougen no Tsuki (2003)</em></li>
	<li><em>The Sixth Day &amp; Seventh Night (2004)</em></li>
	<li><em>Diablos (2005)</em></li>
	<li><em>Training Days Drug Party (2006)</em></li>
	<li><em>Requiem Et Reminiscence II (2009)</em></li>
	<li><em>Best of the Best - 40th birthday (2013)</em></li>
	<li><em>Last Visualive Saigo no Tsuki (2016)</em></li></ul>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../../../chunks/index.js";
import { t as title } from "../../../../chunks/store.js";
import { I as Image } from "../../../../chunks/Image.js";
import { L as Link } from "../../../../chunks/Link.js";
const hana = "/_app/immutable/assets/hana-776a226e.png";
const prerender = true;
let pageTitle = "You & Gackt";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""}

<h2>${escape(pageTitle)}</h2>

<h3>Meeting Gackt</h3>

<p>While You was a guitarist for a band in Kyoto, him and his band regularly visited a recording studio where Gackt worked as a sound technician. Gackt had seen You&#39;s band perform live at venues in Kyoto several times and was fond of one of the guitarists, but he&#39;d never made the connection between this guitarist and You. This was partly because they would wear makeup on stage, which made them hard to recognise otherwise.</p>

<p>He knew of You from when they were in the studio together (roughly every two weeks), however they didn&#39;t speak much as Gackt thought You was quite hostile, as he didn&#39;t talk a lot and usually glared at him. He&#39;s since found out that the glaring was because You is short-sighted...</p>

<p>One day he asked You who the guitarist he liked was, and You explained it was him. Gackt didn&#39;t believe him, going so far as arguing against it! So You took him to his house to show him photos and videos, to prove he was the guitarist, and from that point they became good friends. Gackt really liked the contrast between You&#39;s on-stage persona compared to his real personality.</p>

<p>During this visit, You also played Gackt some songs he had written, and shortly after they decided to form <a href="${"/music-career/cains-feel"}">a band</a> together.</p>

<p class="${"text-sm"}">* See references at the bottom.</p>

<h3>Christmas Eve Street Performance in 1993</h3>

<figure>${validate_component(Image, "Image").$$render(
    $$result,
    {
      alt: "Gackt and You performance at Christmas",
      class: "p-4 pt-0",
      width: "200",
      align: "right",
      src: hana,
      ratio: "58%"
    },
    {},
    {}
  )}</figure>

<p>Just before Christmas in 1993, Gackt was struggling to cope with a recent break-up, so much that it was affecting his sleep and he was feeling more and more depressed. You made a plan to cheer him up by asking him to sing a bunch of songs on the street with him on Christmas Eve, including <em>hanashitaku wa nai</em> by T-Bolan and <em>Gekkou</em> by B&#39;z. At first Gackt refused, but You insisted because it would mean that he wasn&#39;t alone at Christmas and it would take his mind off what had happened. They ended up performing for just over an hour in Kamogawa, under Sanjo Ohashi bridge on the Kamo River.</p>

<p>They recreated the performance on the Happy Xmas Show in 2003, with You on the guitar and Gackt singing.</p>

<iframe title="${"hanashitaku wa nai"}" src="${"https://www.youtube.com/embed/8v2FPRve0S4"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"mb-4"}"></iframe>

<p>Gackt has also described this night in an interview from <em>Vicious 08.1998</em>. Ryuik has scanned and translated ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://ryuik.livejournal.com/218356.html"
    },
    {},
    {
      default: () => {
        return `the whole interview here`;
      }
    }
  )} ❤️</p>

<h3>Relationship with Gackt</h3>

<p>You has been by Gackt&#39;s side for over 20 years, and Gackt has explained endless times how close they are, comparing their relationship to that of a close family member or soulmate. They have an extremely sweet relationship and this is, in part, why You is such a firm fan favourite.</p>

<p>Here&#39;s some random quotes from Gackt, either to You or about You. Bare in mind that these &quot;quotes&quot; are translations from Japanese either by myself or others, so they are of course not <em>direct</em> quotations. And as when anything is translated, the intended meaning is often lost. Having said that, most are easy to interpret!</p>

<ul><li><em>&quot;I know what you think... Because You and I are always together, live together, sleep together, you think that we&#39;re gay, don&#39;t you? Myself, I&#39;d rather say that You is my soulmate. I prefer to say it this way.&quot;</em></li>
	<li><em>&quot;I first met him 10 years ago... It&#39;s been 10 years already. He rode his big motorbike just like a prince on a white horse, and riding behind, I was the princess.&quot;</em></li>
	<li><em>&quot;He really is... amazing.&quot;</em></li>
	<li><em>&quot;We ain&#39;t gay!&quot;</em></li>
	<li><em>&quot;Well, isn&#39;t he cute? See that smile? No one can really blame him.&quot;</em></li>
	<li><em>&quot;See, this guy You... Well, he&#39;s very cute.&quot;</em></li>
	<li><em>&quot;He&#39;ll say Happy Birthday to me... maybe around 28th July.&quot;</em> (Gackt&#39;s birthday is 4th July..)</li>
	<li><em>(To the fans, as You comes on stage:) &quot;Oh, please! You don&#39;t have to get that excited...&quot;</em></li>
	<li><em>&quot;Watch out for his charming, innocent smile, girls.&quot;</em></li>
	<li><em>&quot;Isn&#39;t he such a good looking guy?&quot;</em></li>
	<li><em>&quot;... I&#39;ll always continue to love him.&quot;</em></li>
	<li><em>&quot;Even if one day in the future, you can&#39;t see with your eyes, I&#39;ll be happy to be your eyes! Also, if one day my waist doesn&#39;t work, you have to be my waist!&quot;</em></li>
	<li><em>&quot;And my oldest friend. My best friend, his name is You!&quot;</em></li></ul>

<p>I wonder if Gackt ever says anything bad about You...</p>

<ul><li><em>&quot;Clean the damn toilet from time to time!&quot;</em></li></ul>

<h3>Trivia</h3>
<ul><li>The catalyst for them initially becoming close friends was both of them being dumped by their girlfriends!</li>
	<li>You and Gackt used to go for drives together for song inspiration. They also drove to scenic locations (mountains, forests) and would break into abandoned buildings together (to write songs, obviously.)</li>
	<li><em>ANOTHER WORLD</em> was written while on holiday together in Hawaii after they went for a drive in the rain.</li>
	<li>Gackt has said that when he is with You he can truly relax and be himself, and when they&#39;re together it&#39;s more like two people merging as one.</li>
	<li>When asked about their relationship, You has said that he is like the ocean and Gackt is the moon. You likes to be calm and careful, and do everything at his own pace, while supporting Gackt. And Gackt is a beacon, guiding the way and inspiring him.</li>
	<li>Gackt talked about You a lot on his ${validate_component(Link, "Link").$$render($$result, { href: "http://allnightnippon.com/gackt" }, {}, {
    default: () => {
      return `radio show`;
    }
  })}.</li>
	<li>In <em>The Ichiban</em> from 07.05.99, Vol.21 No.25, there was an interview with Gackt from a series called <em>Gackt Conquers the World</em>. In the Japan entry, he mentioned a recent conversation with You where Gackt was explaining how if he were to lose everything, it would be OK as long as he still had the same people with him. You&#39;s response was, &quot;If you lost everything and went to Hell, I&#39;d always stay with you.&quot; Gackt then went on to explain how happy that made him, and that it felt strange coming from a non-romantic relationship, but because of this it made it even more special.</li>
	<li>You once made Gackt a cake for his birthday that was made of kimchi and other Korean vegetables, as Gackt isn&#39;t keen on anything sweet.</li></ul>

<p class="${"text-sm"}">* References: Gackt&#39;s autobiography, <em>Jihaku</em>, Section 2: Kakusei, Chapter 4: <em>Hatsu Bando CAIN&#39;S FEEL</em>; <em>Diabolos</em> tour document; various interviews with GacktJob</p>

<p><a href="${"/music-career"}">← Backt to Music Career</a></p>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

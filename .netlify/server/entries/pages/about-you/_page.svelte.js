import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { t as title } from "../../../chunks/store.js";
import { L as Link } from "../../../chunks/Link.js";
const prerender = true;
let pageTitle = "About You";
title.set(pageTitle);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p><strong data-svelte-h="svelte-1j1enj5">Stage Name:</strong> You (pronounced &#39;yuu&#39;), aka YOU, 優, You Kurosaki, 🤖<br> <strong data-svelte-h="svelte-9dfgxb">Plays:</strong> Guitar, violin, piano, drums, shamisen<br> <strong data-svelte-h="svelte-97r3rt">Birthday:</strong> 10th February 1974<br> <strong data-svelte-h="svelte-121r1a4">From:</strong> Kyoto, Japan<br> <strong data-svelte-h="svelte-1m3d68n">Height:</strong> 186cm (6&#39;2&quot;)<br> <strong>${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.tofugu.com/japan/japanese-blood-type/"
    },
    {},
    {
      default: () => {
        return `Blood Type`;
      }
    }
  )}:</strong> A<br> <strong data-svelte-h="svelte-r43947">Guitar Model:</strong> ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.caparisonguitars.com/"
    },
    {},
    {
      default: () => {
        return `Caparison`;
      }
    }
  )}, Mercury<br> <strong data-svelte-h="svelte-1edn3h2">Hobbies:</strong> Cooking, photography, motorbikes, martial arts, snowboarding, bowling, reading manga<br> <strong data-svelte-h="svelte-1rk5za6">Likes:</strong> Jean Paul Gaultier fragrance, cooking yaki udon, all things robot-themed, collecting plushies</p> <h3 data-svelte-h="svelte-ej9hfv">Official Sites &amp; Socials</h3> <p>You has always been an avid blogger and used to have his own site at ${validate_component(Link, "Link").$$render($$result, { href: "http://www.you-robots.com" }, {}, {
    default: () => {
      return `You-robots.com`;
    }
  })}. It contained a short discography, a gallery, links, etc. He also had an old ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "http://www.gackt-and-lovers.com/free/youblog/"
    },
    {},
    {
      default: () => {
        return `Gackt staff blog`;
      }
    }
  )} and an ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.facebook.com/YOU-161091424051137/"
    },
    {},
    {
      default: () => {
        return `official Facebook page`;
      }
    }
  )}.</p> <p>Most recently, he writes in his ${validate_component(Link, "Link").$$render($$result, { href: "https://ameblo.jp/yourobot" }, {}, {
    default: () => {
      return `Ameblo blog`;
    }
  })} and occasionally updates his Twitter account, ${validate_component(Link, "Link").$$render($$result, { href: "https://twitter.com/yourobot0210" }, {}, {
    default: () => {
      return `@yourobot0210`;
    }
  })}.</p> <h3 data-svelte-h="svelte-18mxi1e">Designs <a href="/about-you/designs" class="text-sm">read more →</a></h3> <p data-svelte-h="svelte-q4mbid">You has collaborated with several designers for both jewellery and clothing.</p> <h3 data-svelte-h="svelte-1aynp53">Trivia</h3> <ul><li data-svelte-h="svelte-lqwwhq">He has lots of different nicknames, including &quot;Grapefruit boy&quot; because of Gackt&#39;s Mizerable ~Unmei~ photobook, old man, &quot;Big Brother You&quot; (You-ni-san), pole (denchu) because he&#39;s tall and quiet. And of course, robot, because of how he moves on stage but also because of how he tends to hide his emotions.</li> <li data-svelte-h="svelte-1w6sjbj">He&#39;s extremely friendly and laid-back, and known for getting on well with everyone. For example, on a band holiday to Paris he was found laughing with the locals on a night out, despite the language barrier.</li> <li data-svelte-h="svelte-1vjhah4">He really enjoys cooking, especially noodles, and is a bit of a foodie.</li> <li data-svelte-h="svelte-9mfrd0">He&#39;s very close friends with <a href="music-career/you-gackt">Gackt</a> and has lived with him on several occasions.</li> <li data-svelte-h="svelte-6igc7n">He usually stands on stage left.</li> <li data-svelte-h="svelte-4lkotm">He is a great photographer and has had his work featured in galleries. He&#39;s also hosted his own photo exhibitions, taken photos of Gackt for the monthly fan club magazine and hosted photo contests with the fans.</li> <li data-svelte-h="svelte-1fora1s">He loves tech and is generally a bit of a geek.</li> <li data-svelte-h="svelte-1st5t7y">He&#39;s short-sighted.</li> <li data-svelte-h="svelte-gf7qod">He&#39;s right handed.</li> <li data-svelte-h="svelte-11aydmj">His left ear is pierced twice.</li> <li data-svelte-h="svelte-590hvg">He has an older sister.</li> <li data-svelte-h="svelte-1dvc5nt">When he was younger he owned a Harley Davidson motorbike.</li> <li data-svelte-h="svelte-1vvdbwe">He thinks he resembles the Takara and Kiddy Land character, Aokubi Daikon. Daikon plushies appeared throughout his old blog behind plates and on top of his laptop in his daily pictures.</li> <li data-svelte-h="svelte-zyh4ey">He&#39;s a big fan of Apple products, and is normally seen using a MacBook Pro or iMac. He has a robot-themed USB-C adapter.</li> <li>He read through the whole of ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "http://en.wikipedia.org/wiki/City_Hunter"
    },
    {},
    {
      default: () => {
        return `City Hunter`;
      }
    }
  )} manga series before a concert on 02.07.02. There are over 30 volumes! You prefers to read through a whole manga series in one go.</li> <li data-svelte-h="svelte-1ixqcdj">He married Nana Sakurai in 2014.</li> <li>On 10th February 2018, he announced that he was going to be a father to a mini YOU. He frequently posts about his son on his ${validate_component(Link, "Link").$$render($$result, { href: "https://ameblo.jp/yourobot" }, {}, {
    default: () => {
      return `blog`;
    }
  })}.</li></ul>`;
});
export {
  Page as default,
  pageTitle,
  prerender
};

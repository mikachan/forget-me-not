import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { L as Link } from "../../../../chunks/Link.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Life from Soyokaze" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-17x372c"><em>Life</em> is a short film from Gackt&#39;s <em>Soyokaze</em> VHS, starring Gackt and You. It was released in 2002 and is linked to the MOON story and concept.</p> <p>Gackt has mentioned in interviews that the concept for the video was inspired by the German film, ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.imdb.com/title/tt0093191/"
    },
    {},
    {
      default: () => {
        return `<em data-svelte-h="svelte-4a1y3t">Wings of Desire</em>`;
      }
    }
  )}, from 1987, which was shot in black and white. This features angels in the mortal world who wear long dark coats, and one angel decides to &#39;fall from grace&#39; after falling in love with a human. There&#39;s an American remake called ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://www.imdb.com/title/tt0120632/"
    },
    {},
    {
      default: () => {
        return `<em data-svelte-h="svelte-18m3m1g">City of Angels</em>`;
      }
    }
  )}.</p> <h3 data-svelte-h="svelte-dkzxh1">Watch on Youtube</h3> <iframe title="Life" class="mb-4" src="https://www.youtube.com/embed/a1hBJimcnQc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <h3 data-svelte-h="svelte-1fdy120">Download</h3> <p><em data-svelte-h="svelte-1fjcc19">Soyokaze</em> seems pretty difficult to get hold of these days, so I&#39;ve uploaded <em data-svelte-h="svelte-lglgqc">Life</em> ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "downloads/life-soyokaze.mp4",
      download: "life soyokaze video"
    },
    {},
    {
      default: () => {
        return `here for download`;
      }
    }
  )} (~60MB).</p> <h3 data-svelte-h="svelte-1lcdwcs">Transcript &amp; Translation</h3> <h4 data-svelte-h="svelte-b321id">Life~そよ風</h4> <p data-svelte-h="svelte-gki28p">YOU: 生まれいでた時から僕は誰かに見守られているような気がする。<br>
だから共同さえも乗り越えられるかもしれない。</p> <p data-svelte-h="svelte-my5k4h">From the time I was born, I&#39;ve felt there was someone watching over me.<br>
And so, perhaps I will overcome even this cooperation...</p> <p data-svelte-h="svelte-nnaes7">GACKT: そう------私がずっと守っているのだから。<br>
彼はまだ私の存在に気づいてはいない。</p> <p data-svelte-h="svelte-n6j3um">That&#39;s right... because I have been protecting him...<br>
He is still not aware of my existence.</p> <p data-svelte-h="svelte-149nz0o">YOU/GACKT: 迷いが僕に覆いかぶさる時、僕は何かを求めて彷徨い歩く。<br>
どこからか声が聞こえてくるようなそんな気がするから。</p> <p data-svelte-h="svelte-1cnmfud">When uncertainty bears down on me, I wander aimlessly in search of something...<br>
I feel as though I can hear a voice... coming from somewhere...</p> <p data-svelte-h="svelte-44yb4g">GACKT: 僕の中に存在する僕ではない存在。<br>
彼の中に存在する何者でもない存在。<br>
三つの視点から彼を察知してみる。</p> <p data-svelte-h="svelte-1qwg9g8">It exists within me, an existence that is not me.<br>
It exists within him, an existence that is no one at all.<br>
From three perspectives, I sense him and watch.</p> <p data-svelte-h="svelte-z0s4ug">彼の迷いを取り去ることは私にはできない。<br>
そう------今の私にはまだできないのだ。</p> <p data-svelte-h="svelte-11f8b2b">I cannot remove his uncertainty.<br>
No... even now, I still cannot.</p> <p data-svelte-h="svelte-12klc1v">私はいつも彼の後を追っている</p> <p data-svelte-h="svelte-1err4k7">I am always following behind him.</p> <p data-svelte-h="svelte-ghk45h">彼が今何を感じているのか<br>
彼は今何を考えているのか<br>
彼に触れる瞬間、まるで私のことのように手に取るようにわかる。</p> <p data-svelte-h="svelte-1uobfr">What is he feeling now?<br>
What is he thinking now?<br>
The moment I touch him, I know it as though it was myself I had touched...</p> <p data-svelte-h="svelte-y8j59o">古代から人は楽園を求め、そしてその人達の多くは空に近い場所を求め続けた。<br>
誰にも触れられない暗雲を消し去る鍵があるようなそんな気がしたのだろう。<br>
遠い記憶に縛られた彼らは今もなお、空に憧れ続ける。</p> <p data-svelte-h="svelte-vjtn2e">From ancient times, people have sought paradise, and many such people continue to seek that place that is so close to the sky.<br>
I wonder if people sense there is some key that will erase the dark clouds no one can touch...<br>
Those who are tied down by distant memories, even now, continue to long for the sky.</p> <p data-svelte-h="svelte-205bwl">ある時期人は自分が他人とは違う特別な存在なのではないかと思い、そして悩む。</p> <p data-svelte-h="svelte-yhxjou">At times, people think, &quot;Am I not different from others? Is my existence not special?&quot;, and they are troubled...</p> <p data-svelte-h="svelte-qbu43x">孤立する。</p> <p data-svelte-h="svelte-1812hc7">Isolated...</p> <p data-svelte-h="svelte-1mn1nxs">飽和状態の中で存在する空気は<br>
彼は協調を避け、孤独に陥る。</p> <p data-svelte-h="svelte-t86mdz">He avoids cooperation in the atmosphere that exists within the saturation, and sinks into solitude.</p> <p data-svelte-h="svelte-j936ni">私は彼の迷いの根源に触れようと同じように人々の混沌に足を踏み入れた。</p> <p data-svelte-h="svelte-15cnhbl">Like trying to touch the source of his uncertainty, in people&#39;s confusion, they trample upon it.</p> <p data-svelte-h="svelte-17y5qcy">肉体の飽和状態。</p> <p data-svelte-h="svelte-d1qzs4">Saturation of the body...</p> <p data-svelte-h="svelte-ri1d2a">魂の空虚。</p> <p data-svelte-h="svelte-fdfjs1">Emptiness of the soul...</p> <p data-svelte-h="svelte-h5nwxz">彼の混沌の原因はそれだけではない。<br>
他にある。</p> <p data-svelte-h="svelte-amlb8j">That is not the only source of his confusion.</p> <p data-svelte-h="svelte-s5nx5r">There are others...</p> <p data-svelte-h="svelte-ngr1cd">私は単一の存在ではない。<br>
故に一人でも孤独ではない。</p> <p data-svelte-h="svelte-1rha4c1">Mine is not a singular existence.<br>
And so, even alone, I am not alone.</p> <p data-svelte-h="svelte-xs3aei">彼は人であるが故に嫌いなはずの孤独を愛してしまったのか</p> <p data-svelte-h="svelte-1gnpwtm">Although he is human, does he then love the solitude which he should despise?</p> <p data-svelte-h="svelte-vgyc2h">別の私が彼に触れることを邪魔する。<br>
いつのまにか彼の姿が私には見えなくなった時<br>
彼の存在が私に触れているような　そんな気がした。</p> <p data-svelte-h="svelte-1t7z4ps">Another me is prevented from touching him.<br>
When, before I know it, I can no longer see him.<br>
I feel as though his existence is touching me...</p> <p data-svelte-h="svelte-nn43cq">彼はまだ私の存在に明確に気づいていない</p> <p data-svelte-h="svelte-1672wx0">Although he is still unaware of mine.</p> <p>Translation by <strong data-svelte-h="svelte-w3r89j">muchuu</strong>, originally on myspace and later found ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "https://dears.livejournal.com/1817818.html"
    },
    {},
    {
      default: () => {
        return `on LJ`;
      }
    }
  )} ❤️</p> <p data-svelte-h="svelte-1l8is2a"><a href="/discography/appearances">← Back to Appearances</a></p>`;
});
export {
  Page as default
};

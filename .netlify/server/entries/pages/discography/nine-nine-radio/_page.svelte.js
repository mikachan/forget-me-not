import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import { t as title } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let { pageTitle = "Radio Phone Call from nine*nine" } = $$props;
  title.set(pageTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0) $$bindings.pageTitle(pageTitle);
  $$unsubscribe_title();
  return `${$$result.head += `<!-- HEAD_svelte-1igowiq_START -->${$$result.title = `<title>${escape($title)}</title>`, ""}<!-- HEAD_svelte-1igowiq_END -->`, ""} <h2>${escape(pageTitle)}</h2> <p data-svelte-h="svelte-7xjdqm">The following is from a radio broadcast that was included on a DVD in Gackt&#39;s <em>nine*nine</em> box set. The broadcast was held by Gackt and one of his staff members. They mainly talk about the beginning of Gackt&#39;s solo career in 1999, and Miyavi and Kamijo appear as guests. Later on in the show, around 3am, You calls in and has a short conversation with Gackt.</p> <h3 data-svelte-h="svelte-dkzxh1">Watch on Youtube</h3> <iframe title="Life" class="mb-4" src="https://www.youtube.com/embed/d1HitQ9jTxY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <h3 data-svelte-h="svelte-1lcdwcs">Transcript &amp; Translation</h3> <p data-svelte-h="svelte-1fjky5a">You: Morimori (&#39;Hello&#39; in Kansai dialect)<br>
	Gackt: You&#39;re not motivated huh?<br>
	You: Yeahh, I&#39;m tireddd...<br>
	Gackt: You&#39;re just on the phone, I&#39;m in the studio recording right now!<br>
	You: Tell everybody what time it is<br>
	Gackt: Hm now? 3:10 AM...<br>
	You: hahahahaha<br>
	Gackt: This feels good this tension!<br>
	You: Ahhhh... *sigh*<br>
	Gackt: I did it right?<br>
	You: Yeah<br>
	Gackt: Did you think I could do it?<br>
	You: Hmm...<br>
	Gackt: By the way, what colour are your pants (underwear)?<br>
	You: Wait a minute...<br>
	Gackt: hahahahaha<br>
	You: I have to check... Wait... Hmmm... cream color. hahahahaha<br>
	Gackt: HAHAHAHA !! What a fool you are!<br>
	You: hahahahaha<br>
	Gackt: (To the staff member) We&#39;re good friends huh? Isn&#39;t it strange?<br>
	Staff: It is<br>
	Gackt: It is right?!<br>
	Staff: Are you dating / going out together?<br>
	Gackt: Yes we are<br>
	You: hahahahaha<br>
	Gackt: We&#39;ve been so close for 17 years, isn&#39;t it so strange? He&#39;s my childhood friend, my family, my best friend, my intimate friend, we even work together, he&#39;s also my &quot;member&quot; (band member), we&#39;re playing on the same stage, we realised our dream together, isn&#39;t it great?!<br>
	Staff: You&#39;re lovers too<br>
	Gackt: RIGHT! hahahahahaha Ok time to end the conversation...<br>
	You: Yes!<br>
	Gackt: Don&#39;t just say &quot;yes&quot;! Can&#39;t you just talk? hahahaha<br>
	You: Well then &quot;eeeeeeeee??&quot;<br>
	Gackt: But WHO are you??<br>
	You: Or &quot;already over??&quot; (as in, isn&#39;t the conversation already over..)<br>
	Gackt: Well then, give a message to the fans<br>
	You: A message...<br>
	Gackt: So cute...!<br>
	You: What are you talking about? What are you looking at?<br>
	Gackt: Kyonkyon (Kyoku Koizumi from morning musume)<br>
	You: What?? From when?<br>
	Gackt: 10 years ago<br>
	You: alalalalala...<br>
	Gackt: She is really cute<br>
	Staff: The message, the message...<br>
	You: Ah the message!<br>
	Gackt: Ohh but you take so long!<br>
	You: Well then...<br>
	Gackt: Cute<br>
	You: This year during the live shows, let&#39;s have fun baby, I love you!<br>
	Gackt: hn who is this? (looking at magazines)<br>
	Staff and You: hahahahahaha<br>
	You: Heh? You ignore me?<br>
	Gackt: Thank you. Well, You...<br>
	You: hahahaha really?!<br>
	Gackt: Thanks<br>
	You: No probs, bye bye<br>
	Gackt: Bye!</p> <p data-svelte-h="svelte-11uz51x">Original translation by <strong>emi1002</strong> on Youtube ❤️</p> <p data-svelte-h="svelte-1l8is2a"><a href="/discography/appearances">← Back to Appearances</a></p>`;
});
export {
  Page as default
};

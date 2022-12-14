<script lang="ts">
	import Link from '$lib/Link.svelte';
	import Image from "svelte-image";

	import cake from '$lib/images/you/bdaycake.jpg';

	import { title } from "../../../store";
	export let pageTitle: string = 'Birthday 2003';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<p>Gackt's well known for making a big deal out of staff members' birthdays, usually involving pranks and cake. I decided, since I seem to have so much information on You's birthday from 2003, why not make a seperate page for it? Yup.</p>

<h3>Where, when, who?</h3>

<p>
	<strong>Where?</strong> - Gackt's All Night Nippon radio show<br>
	<strong>When?</strong> - February 10th, 2003<br>
	<strong>Who?</strong> - All of GacktJOB and crew
</p>

<h3>Translation</h3>

<p>Here's a translation from the radio show, sent to me by Sei-chan.</p>

<b>Gackt</b>: ^__^ Today it’s YOU'S birthday!! That’s why we made a program especially for him, it’s dedicated to love!! So, phone us and tell us directly your love-problems... You and I will answer!!<br><br>

*Everything went normal and calm until this last girl phoned...*<br><br>

<b>Girl</b>: -__- Hi... you see, I’ve got a big problem... I went out with a boy, and he was nice and everything... but when he drank he changed entirely, he got violent and uncontrollable, he pushed me and made me do things that you can’t even imagine...<br><br>

<b>Gackt</b>: O_O That’s terrible! *everybody in the studio : O_O!*<br><br>

<b>Girl</b>: Yes... well... but... but this boy I’m talking about... is a member of your band...<br><br>

<b>Gackt</b>: O____O WHAT DID YOU SAY?<br> 
*Chacha&You = O___________O!*<br><br>

<b>Gackt</b>: O_o Bu... But... Who do you mean...?<br><br>

<b>Girl</b>: -_-....he plays guitar...<br><br>

<b>Gackt</b>: *looks over to You and Chacha* O_O b...but... this can’t be anybody else but...<br><br>

<b>Chacha</b>: O_o Don’t look at me...<br><br>

<b>You</b>: O_o But... But it’s IMPOSSIBLE that it’s ME !! ~~you know it...~~<br><br>

<b>Gackt</b>: We will see my pretty one... Describe him...<br><br>

<b>Girl</b>: He is very tall... and we met after a concert...<br><br>

<b>Gackt</b>: O___o You say he’s very tall? So it can only be You... O__O *Gackt looks over to You seriously*<br><br>

<b>You</b>:  WHAAAAAAAAAAT!?? SHE’S LYING!! It’s ... it’s totally IMPOSSIBLE!!~ no no nooo!!<br><br>

<b>Gackt</b> (stressed): ... we will see... what you say is enormous... you can’t phone and say this if you can’t prove 
it... so we’ll see... right now we are writing a new song for our next album, and nobody knows it so far... of course only the members of my band... but if it’s true what you said about You, you should know this song, don’t you?<br><br>

<b>You</b>:  NO NO NO NOOOOOOOOOOO NOOOOO I REALLY don’t know her  O_O Gakuchan!! Believe meeee~~O_O she’s lying she’s 
lying she’s LYING IT’S WRONG!! I don’t know her!! *nearly dying*<br><br>

<b>The girl, totally self-confident</b>: Of course I know this song...<br><br>

<b>You</b>: ... But this isn’t RIGHT! Gaaaackt!! believe meeeeee!! She’s a liar! Don’t believe her! 
I don’t know who she is! It’s impossible!! IMPOSSIBLE!! NOOO!!<br><br>

<b>Gackt</b>: Very well.  Sing this song...<br><br>

And the girl begins to sing....... HAAAAPPY BITHDAAAAAY YOUUUUUUUUUU!!! HAPPY BIRTHDAAAAAAY YOUUUUUUUUUUU!!!!<br><br>

So a lot of people and all of the staff arrive in the room with a cake and sing Happy Birthday for You. ^o^<br><br>

<b>You</b>: (O_____O) *still shocked*<br><br>

And the studio was full of people who sang for him ~ And You was still trembling all over~<br><br>

<b>Gackt</b>: ^^ This was my gift for your birthday, did you like it?<br><br>

<b>You</b>: (O____O) huh... yes?<br><br>

<b>Gackt</b>: ^^ I just wanted to watch your face in a situation like this... ^^ It was so funny! ^o^<br><br>

<b>You</b>: ... (O___O)<br><br>

<b>Gackt</b>: ^_____^ But the best thing... was your smile when you understood that it was only a joke. ^^ It was perfect... Like I thought it would be. ^o^<br><br>

<b>You</b>: --_____-- why meeeeee?!<br><br> 

<b>Gackt</b> (to the audience): Well... so this was my surprise for You... I wanted him to open up every now and then... and I prepared everything very careful... because he’s always with me he would have noticed something... so it was very difficult... Even Chacha and the others didn’t know... ^^ I just told the staff members right before the program started so that there would be no problem! ^_^ It was good!<br><br> 

<b>You</b>: --____-- Sniff~<br><br>

<b>Gackt</b>: ~^_______^ But you can’t imagine the way he laughed when he understood everything!  =^_^= It’s...  hmm... the best thing in the world... I work only to see it!!<br><br> 

<b>You</b>:  ah really?<br><br>

<b>Gackt</b>: ^_^ Well... I know that it was a bit of a risk as well because I had no idea how You would react... ^^ But well...<br><br> 

<b>You</b>: ^_^ you are very nice, thank you.... Hmmm...<br><br>

<h3>Cake</h3>

<p>The cake that You received is shown below (snagged it off the <Link href="http://www.allnightnippon.com/gackt">ANN</Link> site), topped with strawberries of course!</p>

<figure>
	<Image alt="Birthday cake" class="mb-4" src="{cake}" ratio="75%" />
</figure>

<p><a href="/music-career/gacktjob">&larr; Backt to GacktJob</a></p>

<script lang="ts">
	import { title } from "../../store";
	export let pageTitle: string = 'Special Thanks';
	title.set(pageTitle);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<h2>{pageTitle}</h2>

<ul>
	<li><strong>Torabara</strong> for images, the Starlight Gig screencaps and R&R screencaps.</li>
	<li><strong>Jirion</strong> for images.</li>
	<li><strong>Sei-chan</strong> for information, images and lots of other random things.</li>
	<li><strong>Akiko</strong> for R&R screencaps, icons, images, for the pronunciation of You and for plugging my site everywhere.</li>
	<li><strong>Sari</strong> for images and information.</li>
	<li><strong>Alexy</strong> for icons.</li>
	<li><strong>Natalie</strong> for a recording of You's voice.</li>
	<li><strong>Kana</strong> for R&R screencaps and being the lovely person that you are.</li>
	<li><strong>Mitsuki</strong> for the translation of Etude.</li>
	<li><strong>Chi</strong> for information.</li>
	<li><strong>Lindley</strong> for screen caps.</li>
</ul>

<p>Thank you thank you thank you! Also, thank you to all the people that have signed my guestbook, emailed me and just mentioned this site to me, it means a lot.</p>
<script lang="ts">
    import { onMount } from 'svelte';
	import NavContent from '$lib/NavContent.svelte';

    function closeNav() {
        document.getElementById("navMobile").style.width = "0%";

        if (document.getElementById("main-container")) {
            document.getElementById("main-container").style.position = "static";
        }
    }

    onMount(() => {
        document.querySelectorAll('.overlay-content span').forEach(link => {
            link.addEventListener('click', () => closeNav())
        });
    });
</script>

<div id="navMobile" class="fixed w-0 h-full z-50 overflow-x-hidden bg-gray-800 bg-opacity-95">
    <div class="flex flex-wrap flex-col content-end px-6 my-4">
        <button class="flex-1 p-0 text-white text-5xl" on:click={closeNav}>×</button>
    </div>

    <div class="overlay-content mt-6 px-6">
		<NavContent />
	</div>
</div>
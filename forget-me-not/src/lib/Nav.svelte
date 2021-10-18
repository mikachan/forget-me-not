<script lang="ts">
	import NavContent from '$lib/NavContent.svelte';

	function openNav() {
        document.getElementById("navMobile").style.width = "100%";

        if (document.getElementById("main-container")) {
            document.getElementById("main-container").style.position = "fixed";
        }
    }

	export let segment: string;
</script>

<div class="hidden lg:block lg:w-3/5 relative top-20">
	<NavContent {segment} />
</div>

<div class="block lg:hidden">
	<button class="fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600" on:click={openNav}>
		<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
		</svg>
	</button>
</div>

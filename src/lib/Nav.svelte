<script lang="ts">
	import NavContent from '$lib/NavContent.svelte';
</script>

<div class="hidden lg:block lg:w-3/5 relative top-16">
	<NavContent />
</div>

<details class="block lg:hidden">
	<summary aria-label="Menu">
		<span class="menu-icon">
			<svg
				class="fill-current h-3 w-3"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><title>Menu</title>
				<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
			</svg>
		</span>
		<span class="close-icon" aria-hidden="true">×</span>
	</summary>

	<div class="overlay-content mt-6 px-6">
		<NavContent />
	</div>
</details>

<style lang="postcss">
	@reference "tailwindcss";

	summary {
		@apply fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600 cursor-pointer list-none;
	}

	summary::-webkit-details-marker {
		@apply hidden;
	}

	details[open] {
		@apply fixed inset-0 z-50 h-full overflow-y-auto bg-gray-800/95;
	}

	details[open] summary {
		@apply static flex justify-end px-6 my-4 border-0 bg-transparent text-white text-5xl leading-none;
	}

	details[open] .menu-icon,
	details:not([open]) .close-icon {
		@apply hidden;
	}
</style>

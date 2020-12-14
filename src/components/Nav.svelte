<script lang="ts">
	import NavContent from '../components/NavContent.svelte';

	export let segment: string;
</script>

<div class="hidden md:block w-48 py-4 px-6 fixed h-full bg-gray-900 z-10">
	<div class="mt-20">
		<div class="pb-4 rounded">
			<NavContent {segment} />
		</div>
	</div>
</div>

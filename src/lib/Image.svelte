<script lang="ts">
	export let alt = '';
	export let src = '';
	export let srcset = '';
	export let srcsetWebp = '';
	export let sizes = '(max-width: 1000px) 100vw, 1000px';
	export let ratio = '100%';
	export let width: string | number | null = null;
	export let height: string | number | null = null;
	export let lazy = true;
	export let wrapperClass = '';

	let className = '';
	export { className as class };
</script>

<div class={wrapperClass} style="min-height: 100px; width: 100%;">
	<div style="position: relative; overflow: hidden; width: 100%;">
		<div style="width: 100%; padding-bottom: {ratio};"></div>
		<picture>
			{#if srcsetWebp}
				<source type="image/webp" srcset={srcsetWebp} {sizes} />
			{/if}
			{#if srcset}
				<source {srcset} {sizes} />
			{/if}
			<img
				{src}
				{alt}
				{width}
				{height}
				loading={lazy ? 'lazy' : 'eager'}
				decoding="async"
				class={className}
			/>
		</picture>
	</div>
</div>

<style>
	img {
		object-position: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>

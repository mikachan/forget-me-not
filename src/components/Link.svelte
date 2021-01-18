<script lang="ts">
	export let href: string = 'javascript:void(0);';
	export let disabled: boolean = false;
	export let outbound: boolean = undefined;
	export let target: string = undefined;
	export let rel: string = undefined;
	export let download: string = undefined;

	$: if (typeof window !== 'undefined') {
		const isExternal = new URL(href, `${location.protocol}//${location.host}`).host !== location.host;
		if (isExternal && outbound === undefined) {
			outbound = true;
		}
	}

	$: if (outbound) {
		target = '_blank';
		if (rel === undefined) rel = 'noopener noreferrer';
	}

	function trackLink() {
		if (!outbound && !download) return false;
		
		if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
			if (outbound) {			
				(window as any).gtag('event', 'click', {
					event_category: 'outbound',
					event_label: href,
					transport_type: 'beacon',
				});
			}

			if (download) {
				(window as any).gtag('event', 'click', {
					event_category: 'download',
					event_label: href
				});
			}
		}
	}
</script>

{#if disabled}
	<span
		{...$$restProps}
		on:click
		on:mouseover
		on:mouseenter
		on:mouseout
		on:focus
		on:blur
		on:keydown>
		<slot />
	</span>
{:else}
	<a
		{...$$restProps}
		{href}
		{target}
		{rel}
		{download}
		on:click={() => { trackLink(); }}
		on:mouseover
		on:mouseenter
		on:mouseout
		on:focus
		on:blur
		on:keydown>
		<slot />
	</a>
{/if}
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import '../app.css';

	import favicon from '$lib/assets/favicon.svg';

	import { device, theme } from '$stores';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		device.init();
		theme.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

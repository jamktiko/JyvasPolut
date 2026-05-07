<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
	import { theme } from '$lib/theme.svelte';

	$effect(() => {
		document.body.className = theme.mode;
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />

{@render children()}

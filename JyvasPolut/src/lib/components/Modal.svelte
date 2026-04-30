<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		close?: () => void;
	}

	let { header, children, footer, close }: Props = $props();

	import { fly } from 'svelte/transition';

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
	}
</script>

<!-- virheilmotusten poisto -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<button onclick={() => close?.()}>
	<div class="backdrop"></div>
</button>

<!-- virheilmotusten poisto -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal" transition:fly={{ y: -300, delay: 50, duration: 500 }} onclick={handleClick}>
	<header>
		{@render header?.()}
	</header>

	{@render children()}

	<footer>
		{@render footer?.()}
	</footer>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(16, 29, 15, 0.75);
		z-index: 10;
	}

	.modal {
		padding: 1rem;
		position: fixed;
		top: 10vh;
		left: 10vw;
		width: 80%;
		max-height: 80vh;
		background: white;
		border-radius: 25px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		background: linear-gradient(to right, #064e3b, #0b0b1e);
	}
</style>

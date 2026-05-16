<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/theme.svelte';

	interface Props {
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		close?: () => void;
	}

	let { header, children, footer, close }: Props = $props();

	// Scrollaus vain modaliin, ei taustaan
	onMount(() => {
		// ECS-closes modal
		function handleWindowKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				close?.();
			}
		}
		// ECS-closes modal

		const original = document.body.style.overflow;

		// ECS-closes modal
		window.addEventListener('keydown', handleWindowKeyDown);
		// ECS-closes modal
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = original;
			window.removeEventListener('keydown', handleWindowKeyDown);
		};
	});
	// Scrollaus vain modaliin ei taustaan

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
	}
</script>

<!-- virheilmotusten poisto -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<button onclick={() => close?.()}>
	<div class="backdrop{theme.mode}"></div>
</button>

<!-- virheilmotusten poisto -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="modal{theme.mode}"
	transition:fly={{ y: -300, delay: 50, duration: 500 }}
	onclick={handleClick}
>
	<header>
		{@render header?.()}
	</header>

	{@render children()}

	<footer>
		{@render footer?.()}
	</footer>
</div>

<style>
	.backdropligth {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(34, 55, 33, 0.75);
		z-index: 1000;
	}

	.backdropdark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(16, 29, 15, 0.75);
		z-index: 1000;
	}

	.modalligth {
		padding: 1rem;
		position: fixed;
		top: 10vh;
		left: 10vw;
		width: 80%;
		max-height: 80vh;
		background: white;
		border-radius: 25px;
		z-index: 1001;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		background: linear-gradient(
			to bottom,
			#f5e0b0 0%,
			#e8a04a 18%,
			#c45c1a 40%,
			#7a2606 65%,
			#551504 85%,
			#1a0400 100%
		);
		/* overflow takaa ettei contentti valu yli modalista, display:flex; sekä Flex-direction:column mahdollistavat scrollauksen */
		overflow: hidden;
		display: flex;
		flex-direction: column;
		/*overflow takaa ettei contentti valu yli modalista  */
	}

	.modaldark {
		padding: 1rem;
		position: fixed;
		top: 10vh;
		left: 10vw;
		width: 80%;
		max-height: 80vh;
		background: white;
		border-radius: 25px;
		z-index: 1001;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		background: linear-gradient(to right, #064e3b, #0b0b1e);
		/* overflow takaa ettei contentti valu yli modalista, display:flex; sekä Flex-direction:column mahdollistavat scrollauksen */
		overflow: hidden;
		display: flex;
		flex-direction: column;
		/*overflow takaa ettei contentti valu yli modalista  */
	}
</style>

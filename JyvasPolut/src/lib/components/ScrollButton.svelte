<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		text?: string;
		onclick: () => void;
		disabled?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { class: classname = '', text, onclick, disabled, children }: Props = $props();
</script>

<button class={classname} {onclick} {disabled}>
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{/if}
</button>

<style>
	/* @@@@@@ Nämä tyylit vaikuttavat kuvien scroll buttoneihin @@@@@@ */ /* @@@@@@ Nämä tyylit vaikuttavat kuvien scroll buttoneihin @@@@@@ */
	.scrollButton {
		cursor: pointer;
	}
	.buttonLeft {
		position: absolute;
		top: 45%;
		left: 0;
		box-shadow:
			1px 1px 10px rgb(255, 255, 255) inset,
			0em 0 10px rgb(255, 255, 255);
		border-radius: 50%;
	}
	.buttonRight {
		position: absolute;
		top: 45%;
		right: 0;
		box-shadow:
			1px 1px 8px white inset,
			0em 0 5px rgb(255, 255, 255);

		border-radius: 55%;
	}
	/* @@@@@@ Nämä tyylit vaikuttavat kuvien scroll buttoneihin @@@@@@ */ /* @@@@@@ Nämä tyylit vaikuttavat kuvien scroll buttoneihin @@@@@@ */
</style>

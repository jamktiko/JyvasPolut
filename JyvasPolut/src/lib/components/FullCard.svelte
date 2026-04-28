<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	interface Props {
		name: string;
		description: string;
		trailLength: number;
		centreTime: string;
		difficulty: string;
		publicTransport: string;
		property: string;
		fireplace: boolean;
		images: string[] | null;
		hideProduct: () => void;
	}

	let {
		name,
		description,
		trailLength,
		centreTime,
		difficulty,
		publicTransport,
		property,
		fireplace,
		images,
		hideProduct
	}: Props = $props();
	let kuvaIndex = $state(0);
	let nykyinenKuva: string | null = $derived(images ? images[kuvaIndex] : null);

	function selaaKuviaEteen() {
		if (images && images.length > 0) {
			if (kuvaIndex < images?.length - 1) {
				kuvaIndex++;
			} else {
				kuvaIndex = 0;
			}
		}
	}
	function selaaKuviaTaakse() {
		if (images && images.length > 0) {
			if (kuvaIndex > 0) {
				kuvaIndex--;
			} else {
				kuvaIndex = images.length - 1;
			}
		}
	}
</script>

<Modal>
	{#snippet header()}
		<h1>{name}</h1>
	{/snippet}

	<div class="moreinfo">
		<div class="image">
			{#if nykyinenKuva}
				<button onclick={selaaKuviaTaakse}>&lt</button>
				<img src={nykyinenKuva} alt={name} height="200px" width="300px" />
				<button onclick={selaaKuviaEteen}>&gt;</button>
			{:else}
				<div class="placeholderimg">🌳</div>
			{/if}
		</div>
		<div class="details">
			<p>{description}</p>
			<p>{difficulty}</p>
			<p>{trailLength}km</p>
			<p>{property}</p>
			{#if fireplace}
				<p>Tulenteko paikka✅</p>
			{:else}
				<p>Tulenteko paikka❌</p>
			{/if}
			<p>{centreTime}</p>
			<p>{publicTransport}</p>
		</div>
	</div>

	{#snippet footer()}
		<button onclick={hideProduct}>Sulje</button>
	{/snippet}
</Modal>

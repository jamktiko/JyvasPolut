<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import ScrollButton from './ScrollButton.svelte';

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

	// kuvaIndex tells the current index the image is at
	let kuvaIndex = $state(0);
	// nykyinenKuva equals the current image
	// or if naturetrail.json doesn't have images, it sets it at null
	let nykyinenKuva: string | null = $derived(images ? images[kuvaIndex] : null);

	// selaaKuviaEteen function changes the kuvaIndex up so the image changes to the next one
	// or on the last one it goest to the start
	function selaaKuviaEteen() {
		if (images && images.length > 0) {
			if (kuvaIndex < images?.length - 1) {
				kuvaIndex++;
			} else {
				kuvaIndex = 0;
			}
		}
	}

	// selaaKuviaTaakse function changes the kuvaIndex down so the image changes to the previous one
	// or on the first one it goes to the end
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
			<!-- If images in the naturetrail.json are not null -->
			{#if nykyinenKuva}
				<ScrollButton onclick={selaaKuviaTaakse} text="&lt" />
				<img src={nykyinenKuva} alt={name} height="200px" width="300px" />
				<ScrollButton onclick={selaaKuviaEteen} text="&gt" />
				<!-- Else it shows an alternative emoji -->
			{:else}
				<div class="placeholderimg">🌳</div>
			{/if}
		</div>
		<div class="details">
			<!-- These are all the details naturetrail has -->
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
		<Button text="sulje" onclick={hideProduct} />
	{/snippet}
</Modal>

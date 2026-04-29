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
		mountain: boolean;
		bodyOfWater: BodyOfWater;
		fireplace: boolean;
		images: string[] | null;
		hideProduct: () => void;
	}

	export interface BodyOfWater {
		exist: boolean;
		type?: string;
	}

	// publicTransport,
	let {
		name,
		description,
		trailLength,
		centreTime,
		difficulty,
		mountain,
		bodyOfWater,
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
			<h2>Ominaisuudet</h2>
			<hr />
			<p>Haastavuustaso: {difficulty}</p>
			<p>Pituus: {trailLength}km</p>
			{#if mountain}
				<p>Vuori: ✅</p>
			{:else}
				<p>Vuori: ❌</p>
			{/if}
			{#if bodyOfWater.exist}
				<p>Vesistö: ✅</p>
				<p>Vesistötyyppi: {bodyOfWater.type}</p>
			{:else}
				<p>Vesistö: ❌</p>
			{/if}
			{#if fireplace}
				<p>Tulenteko paikka: ✅</p>
			{:else}
				<p>Tulenteko paikka: ❌</p>
			{/if}
			<h2>Etäisyys ja kulku keskustasta</h2>
			<hr />
			<p>{centreTime}</p>
			<!-- <p>{publicTransport}</p> -->
			<p>Linkki</p>
			<ul>
				<li>Linkkilinja: 12 | Pysäkki: Vanha hautausmaa 2</li>
				<li>Linkkilinja: S5 | Pysäkki: Tourunsilta 2</li>
				<li>Linkkilinja: S1 | Pysäkki: Tourunsilta 2</li>
			</ul>
		</div>
	</div>

	{#snippet footer()}
		<Button text="sulje" onclick={hideProduct} />
	{/snippet}
</Modal>

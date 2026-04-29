<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import ScrollButton from './ScrollButton.svelte';

	interface Props {
		name: string;
		description: string;
		trailLength: number;
		centreTime: string[];
		difficulty: string;
		publicTransport: string[];
		mountain: '✅' | '❌';
		bodyOfWater: BodyOfWater;
		fireplace: '✅' | '❌';
		images: string[] | null;
		hideProduct: () => void;
	}

	export interface BodyOfWater {
		exist: '✅' | '❌';
		type?: string;
	}

	let {
		name,
		description,
		trailLength,
		centreTime,
		difficulty,
		publicTransport,
		mountain,
		bodyOfWater,
		fireplace,
		images,
		hideProduct
	}: Props = $props();

	// i tells the current index the image is at
	let i = $state(0);
	// nykyinenKuva equals the current image
	// or if naturetrail.json doesn't have images, it sets it at null
	let currentImg: string | null = $derived(images ? images[i] : null);

	// switchImgToNext function changes the index up so the image changes to the next one
	// or on the last one it goes to the start
	function switchImgToNext() {
		if (images) {
			i = i < images.length - 1 ? i + 1 : 0;
		}
	}

	// switchImgToPrev function changes the index down so the image changes to the previous one
	// or on the first one it goes to the end
	function switchImgToPrev() {
		if (images) {
			i = i > 0 ? i - 1 : images.length - 1;
		}
	}
</script>

<!-- This gives Modal.svelte "hideProduct" props as "close" -->
<Modal close={hideProduct}>
	{#snippet header()}
		<h1>{name}</h1>
	{/snippet}

	<div class="moreinfo">
		<div class="image">
			<!-- If images in the naturetrail.json are not null -->
			{#if currentImg}
				<ScrollButton onclick={switchImgToPrev} text="&lt" />
				<img src={currentImg} alt={name} height="200px" width="300px" />
				<ScrollButton onclick={switchImgToNext} text="&gt" />
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
			<p>Vuori: {mountain}</p>
			<p>Vesistö: {bodyOfWater.exist}</p>
			{#if bodyOfWater.exist === '✅'}
				<p>Vesistötyyppi: {bodyOfWater.type}</p>
			{/if}
			<p>Tulenteko paikka: {fireplace}</p>

			<h2>Etäisyys ja kulku keskustasta</h2>
			<hr />

			{#each centreTime as time (time)}
				<p>{time}</p>
			{/each}

			<p>Linkki:</p>
			<ul>
				{#each publicTransport as pubTrans (pubTrans)}
					<li>{pubTrans}</li>
				{/each}
			</ul>
		</div>
	</div>

	{#snippet footer()}
		<Button text="sulje" onclick={hideProduct} />
	{/snippet}
</Modal>

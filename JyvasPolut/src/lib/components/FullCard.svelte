<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import ScrollButton from './ScrollButton.svelte';
	import CommentSection from './CommentSection.svelte';

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
		comments: Comment[];
		hideProduct: () => void;
	}

	interface BodyOfWater {
		exist: '✅' | '❌';
		type?: string;
	}
	interface Comment {
		commenter: string;
		commentTitle: string;
		commentText: string;
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
		comments,
		hideProduct
	}: Props = $props();

	// i tells the current index the image is at
	let i = $state(0);
	// currentImg equals the current image
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

	let commentsList = $derived([...comments]);
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
				<ScrollButton class="buttonLeft" onclick={switchImgToPrev}>
					<img class="scrollImg" src="/images/vektoreita/arrow_left.svg" alt="kuva" />
				</ScrollButton>

				<img src={currentImg} alt={name} height="200px" width="300px" />

				<ScrollButton class="buttonRight" onclick={switchImgToNext}>
					<img class="scrollImg" src="/images/vektoreita/arrow_right.svg" alt="kuva" />
				</ScrollButton>
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
			<div class="ominaisuus">
				<p>Haastavuustaso: {difficulty}</p>
				<p>Pituus: {trailLength}km</p>
				<p>Vuori: {mountain}</p>
			</div>
			<div class="ominaisuus">
				<p>Vesistö: {bodyOfWater.exist}</p>
				{#if bodyOfWater.exist === '✅'}
					<p>Vesistötyyppi: {bodyOfWater.type}</p>
				{/if}
				<p>Tulenteko paikka: {fireplace}</p>
			</div>
			<h2>Etäisyys ja kulku keskustasta</h2>

			<hr />

			{#each centreTime as time (time)}
				<p>{time}</p>
			{/each}

			<p>Linkki:</p>
			<ul class="list">
				{#each publicTransport as pubTrans (pubTrans)}
					<li>{pubTrans}</li>
				{/each}
			</ul>
		</div>
		<CommentSection commentsListJson={commentsList}></CommentSection>
	</div>

	{#snippet footer()}
		<Button text="sulje" onclick={hideProduct} />
	{/snippet}
</Modal>

<style>
	.ominaisuus {
		display: flex;
	}

	/* @@@@@@ Nämä vaikuttavat Korttien kuvien kokoon / asetteluun @@@@@@ */
	.scrollImg {
		width: 40px;
		height: 40px;
	}
	.image {
		position: relative;
		display: inline-block;
		border: 2px solid white;
		border-radius: 20px;
	}
	.image img {
		display: block;
		border-radius: 20px;
	}
	/* @@@@@@ Nämä vaikuttavat Korttien kuvien kokoon / asetteluun @@@@@@ */
	h1 {
		font-size: 3rem;
		padding: 1rem;
		color: white;
		text-shadow: 0 0 10px white;
	}
	h2 {
		font-weight: bold;
		font-size: 1.5rem;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
	}
	.moreinfo {
		overflow-y: auto;
		padding-left: 2rem;
	}
	p {
		font-size: 1.1rem;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
	}
	ul {
		font-size: 1.1rem;
		padding-left: 1.5rem;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
	}
	.list {
		padding-bottom: 40px;
	}
</style>

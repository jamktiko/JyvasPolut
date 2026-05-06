<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';

	import { filterInfo } from '$lib/filterInfo.svelte';

	import FullCard from '$lib/components/FullCard.svelte';

	import Filter from './Filter.svelte';

	import { favoriteList } from '$lib/favoriteListGS.svelte';

	import { visitedList } from '$lib/visitedListGS.svelte';
	// import { onMount } from 'svelte';

	// trailCards has the data from naturetrail.json
	// let trailCards: ItrailTypes[] = $state([]);

	// ECS-näppäimestä modalin sulkeminen
	function handleWindowKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
	// ECS-näppäimestä modalin sulkeminen

	// selected is the current selected natureTrail
	let selected = $state<ItrailTypes | null>(null);

	function open(item: ItrailTypes) {
		selected = item;
	}

	function close() {
		selected = null;
	}

	// onMount(async () => {
	// 	// ECS-näppäimestä modalin sulkeminen
	// 	window.addEventListener('keydown', handleWindowKeyDown);
	// 	// ECS-näppäimestä modalin sulkeminen, keydown = 'escape' on painettu

	// 	const response = await fetch('/data/naturetrail.json');

	// 	if (!response.ok) {
	// 		throw new Error('Cannot fetch the data');
	// 	}

	// 	trailCards = await response.json();
	// });

	// getTrails fetches the data from naturetrail.json when the function is called
	// getTrails can also have the data filtered.
	// when a button is pressed, it returns the filtered data
	export const getTrails = async (
		filterText?: string,
		difficulty?: 'Kevyt' | 'Rasittava' | 'Raskas'
	): Promise<ItrailTypes[]> => {
		// ECS-näppäimestä modalin sulkeminen
		window.addEventListener('keydown', handleWindowKeyDown);
		// ECS-näppäimestä modalin sulkeminen, keydown = 'escape' on painettu

		const response = await fetch('/data/naturetrail.json');

		if (!response.ok) {
			throw new Error('Cannot fetch the data');
		}

		let trailCards: ItrailTypes[] = await response.json();
		// filterText tells which filter button was pressed and what to print
		if (filterText) {
			if (filterText === 'mountain') {
				return await trailCards.filter(
					(f) => f.mountain === '✅' && f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'bodyOfWater') {
				return await trailCards.filter(
					(f) => f.bodyOfWater.exist === '✅' && f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'fireplace') {
				return await trailCards.filter(
					(f) => f.fireplace === '✅' && f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'difficulty') {
				return await trailCards.filter(
					(f) => f.difficulty === difficulty && f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'favorite') {
				return await favoriteList.getFavoriteList.filter(
					(f) => f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'visited') {
				return await visitedList.getVisitedList.filter(
					(f) => f.trailLength >= filterInfo.specificLength
				);
			}
			if (filterText === 'notVisited') {
				const visitedIds = visitedList.getVisitedList.map((v) => v.id);
				return await trailCards.filter(
					(f) => !visitedIds.includes(f.id) && f.trailLength >= filterInfo.specificLength
				);
			}
		}
		return await trailCards.filter((f) => f.trailLength >= filterInfo.specificLength);
	};
	let printTrail = $state(getTrails());
</script>

<Filter {getTrails} bind:printTrail />
<!-- This shows before the data has been successfully fetched-->
{#await printTrail}
	<div>Loading....</div>
	<!-- This shows after the data has been successfully fetched-->
{:then responseData}
	<div class="grid">
		{#each responseData as trailCard (trailCard.name)}
			<button onclick={() => open(trailCard)}>
				<Card
					{trailCard}
					title={trailCard.name}
					desc={trailCard.description2}
					difficulty={trailCard.difficulty}
					imgs={trailCard.images}
					fav={favoriteList.isFavorite(trailCard)}
					visit={visitedList.wasVisited(trailCard)}
				/>
			</button>
		{/each}
	</div>

	<!-- FullCard shows once a card has been selected -->
	{#if selected}
		<FullCard {...selected} hideProduct={close} />
	{/if}

	<!-- This shows when the data fetch has been unsuccessful -->
{:catch error}
	<div class="error">
		{error.message}
	</div>
{/await}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
		padding: 3rem;
	}
</style>

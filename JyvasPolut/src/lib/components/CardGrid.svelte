<script lang="ts">
	import type { ItrailTypes } from '$lib/trailInfo';
	import Card from '$lib/components/Card.svelte';
	import FullCard from '$lib/components/FullCard.svelte';
	import Filter from './Filter.svelte';
	import { filterInfo } from '$lib/filterInfo.svelte';
	import { favoriteList } from '$lib/favoriteListGS.svelte';
	import { visitedList } from '$lib/visitedListGS.svelte';
	import { fade } from 'svelte/transition';

	// selected is the current selected natureTrail
	let selected = $state<ItrailTypes | null>(null);

	function open(item: ItrailTypes) {
		selected = item;
	}

	function close() {
		selected = null;
	}

	// min max values for the slider-filter
	let minTrailLength: number = $state(0);
	let maxTrailLength: number = $state(0);
	// min max values for the slider-filter

	let filterPage = $state('');

	// getTrails fetches the data from naturetrail.json when the function is called
	// getTrails can also have the data filtered.
	// when a button is pressed, it returns the filtered data
	export const getTrails = async (
		filterText?: string,
		difficulty?: 'Kevyt' | 'Rasittava' | 'Raskas'
	): Promise<ItrailTypes[]> => {
		const response = await fetch('/data/naturetrail.json');

		if (!response.ok) {
			throw new Error('Cannot fetch the data');
		}

		let trailCards: ItrailTypes[] = await response.json();
		// filterText tells which filter button was pressed and what to print
		// filterPage tells which filter page is open

		// min max values for the slider-filter
		const lengths = trailCards.map((trail) => trail.trailLength);
		minTrailLength = Math.min(...lengths);
		maxTrailLength = Math.max(...lengths);
		if (filterInfo.specificLength === 0) {
			filterInfo.specificLength = minTrailLength;
		}
		// min max values for the slider-filter
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		if (filterText) {
			filterInfo.specificLength = minTrailLength;
			if (filterText === 'mountain') {
				filterPage = filterText;
				return await trailCards.filter((f) => f.mountain === '✅');
			}
			if (filterText === 'bodyOfWater') {
				filterPage = filterText;
				return await trailCards.filter((f) => f.bodyOfWater.exist === '✅');
			}
			if (filterText === 'fireplace') {
				filterPage = filterText;
				return await trailCards.filter((f) => f.fireplace === '✅');
			}
			if (filterText === 'difficulty' && difficulty) {
				filterPage = difficulty;
				return await trailCards.filter((f) => f.difficulty === difficulty);
			}
			if (filterText === 'favorite') {
				filterPage = filterText;
				return await favoriteList.getFavoriteList;
			}
			if (filterText === 'visited') {
				filterPage = filterText;
				return await visitedList.getVisitedList;
			}
			if (filterText === 'notVisited') {
				filterPage = filterText;
				// visitedIds checks all the visited lists ids
				// then we get the trails that are not in the visited list
				const visitedIds = visitedList.getVisitedList.map((v) => v.id);
				return await trailCards.filter((f) => !visitedIds.includes(f.id));
			}
		}
		filterPage = '';
		return await trailCards.filter((f) => f.trailLength >= filterInfo.specificLength);
	};
	let printTrail = $state(getTrails());
</script>

<Filter {getTrails} bind:printTrail {filterPage} {minTrailLength} {maxTrailLength} />
<!-- This shows before the data has been successfully fetched-->
{#await printTrail}
	<!-- <div>Loading....</div> -->
	<!-- This shows after the data has been successfully fetched-->
{:then responseData}
	<!-- The transition here is in charge of the card load in -->
	<div class="grid" out:fade={{ delay: 10, duration: 10 }}>
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
					{filterPage}
					{getTrails}
					bind:printTrail
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
		margin-top: 2rem;
		padding: 3rem;
	}
</style>

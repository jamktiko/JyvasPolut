<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';
	import { filterInfo } from '$lib/filterInfo.svelte';
	import FullCard from '$lib/components/FullCard.svelte';
	import Filter from './Filter.svelte';
	import { favoriteList } from '$lib/favoriteListGS.svelte';
	import { visitedList } from '$lib/visitedListGS.svelte';
	import { fade } from 'svelte/transition';

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

	let filterPage = $state('');

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
			filterInfo.specificLength = 0.5;
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
				const visitedIds = visitedList.getVisitedList.map((v) => v.id);
				return await trailCards.filter((f) => !visitedIds.includes(f.id));
			}
		}
		filterPage = '';
		return await trailCards.filter((f) => f.trailLength >= filterInfo.specificLength);
	};
	let printTrail = $state(getTrails());
</script>

<Filter {getTrails} bind:printTrail {filterPage} />
<!-- This shows before the data has been successfully fetched-->
{#await printTrail}
	<div>Loading....</div>
	<!-- This shows after the data has been successfully fetched-->
{:then responseData}
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

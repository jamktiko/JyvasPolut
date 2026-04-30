<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';

	import { filterInfo } from '$lib/filterInfo.svelte';

	import FullCard from '$lib/components/FullCard.svelte';

	import { onMount } from 'svelte';

	// trailCards has the data from naturetrail.json
	let trailCards: ItrailTypes[] = $state([]);

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

	// OnMount fetches the data from naturetrail.json on component load and sets it to trailCards
	onMount(async () => {
		// ECS-näppäimestä modalin sulkeminen
		window.addEventListener('keydown', handleWindowKeyDown);
		// ECS-näppäimestä modalin sulkeminen, keydown = 'escape' on painettu

		const response = await fetch('/data/naturetrail.json');

		if (!response.ok) {
			throw new Error('Cannot fetch the data');
		}

		trailCards = await response.json();
	});
	//---------------------------
	//---------------------------
	//---------------------------
	//---------------------------
	let filteredData: ItrailTypes[] = $state([]);
	let filtered = $derived(filteredData);

	if (filterInfo.allItems) {
		filteredData = trailCards;
	} else {
		filtered = trailCards.filter((r) => r.trailLength >= filterInfo.specificLength);
	}

	//---------------------------
	//---------------------------
	//---------------------------
</script>

<!-- This shows before the data has been successfully fetched-->
{#await filtered}
	<div>Loading....</div>
	<!-- This shows after the data has been successfully fetched-->
{:then responseData}
	<div class="grid">
		{#each responseData as trailCard (trailCard.name)}
			<button onclick={() => open(trailCard)}>
				<Card
					title={trailCard.name}
					desc={trailCard.description}
					difficulty={trailCard.difficulty}
					imgs={trailCard.images}
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

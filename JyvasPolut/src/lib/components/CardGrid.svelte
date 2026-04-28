<script lang="ts">
	import Card from './Card.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';

	import { trailLength } from '$lib/Length.svelte';

	import FullCard from './FullCard.svelte';

	import { onMount } from 'svelte';

	let trailCards: ItrailTypes[] = $state([]);

	let selected = $state<ItrailTypes | null>(null);

	function open(item: ItrailTypes) {
		selected = item;
	}

	function close() {
		selected = null;
	}

	onMount(async () => {
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
	let filtered = $derived(trailCards.filter((r) => r.trailLength >= trailLength.specificLength));

	//---------------------------
	//---------------------------
	//---------------------------
</script>

{#await filtered}
	<div>Loading....</div>
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
	{#if selected}
		<FullCard {...selected} hideProduct={close} />
	{/if}
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
		padding: 2rem;
	}
</style>

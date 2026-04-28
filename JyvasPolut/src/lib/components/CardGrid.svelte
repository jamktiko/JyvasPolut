<script lang="ts">
	import Card from './Card.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';

	import { onMount } from 'svelte';

	let trailCards: ItrailTypes[] = $state([]);

	onMount(async () => {
		const response = await fetch('/data/naturetrail.json');

		if (!response.ok) {
			throw new Error('Cannot fetch the data');
		}

		trailCards = await response.json();
	});
</script>

{#await trailCards}
	<div>Loading....</div>
{:then responseData}
	<div class="grid">
		{#each responseData as trailCard, i (i)}
			<Card title={trailCard.name} desc={trailCard.description} imgs={trailCard.images} />
		{/each}
	</div>
{:catch error}
	<div class="error">
		{error.message}
	</div>
{/await}

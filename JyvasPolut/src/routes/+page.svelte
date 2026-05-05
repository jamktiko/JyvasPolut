<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import LengthFilter from '$lib/components/LengthFilter.svelte';
	import { mapState } from '$lib/ShowMap.svelte';
	import Map from '$lib/components/Map.svelte';
	let teksti = 'asdasd';
</script>

<Map visible={mapState.showMap} />

<LengthFilter />
<Button text={teksti} onclick={() => console.log('naps')} />
<CardGrid />

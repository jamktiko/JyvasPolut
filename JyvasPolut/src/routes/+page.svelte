<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { mapState } from '$lib/ShowMap.svelte';
	import Map from '$lib/components/Map.svelte';
	import Button from '$lib/components/Button.svelte';
	let teksti = 'asdasd';
</script>

<Map visible={mapState.showMap} />

<Button text={teksti} onclick={() => console.log('naps')} />
<CardGrid />

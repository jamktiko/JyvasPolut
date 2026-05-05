<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { mapState } from '$lib/ShowMap.svelte';
	import Map from '$lib/components/Map.svelte';
</script>

<Map visible={mapState.showMap} />
<CardGrid />

<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import LengthFilter from '$lib/components/LengthFilter.svelte';
	let teksti = 'asdasd';
</script>

<LengthFilter />
<Button text={teksti} onclick={() => console.log('naps')} />
<CardGrid />

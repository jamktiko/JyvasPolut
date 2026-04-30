<script lang="ts">
	import { filterInfo } from '$lib/filterInfo.svelte';
	import Button from './Button.svelte';

	function nullFilters() {
		filterInfo.allItems = false;
		filterInfo.difficulty = null;
		filterInfo.mountain = false;
		filterInfo.bodyOfWater = false;
		filterInfo.fire = false;
		filterInfo.specificLength = 0.5;
	}
</script>

<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->

<div class="filter-section">
	<Button text="Kaikki" onclick={() => (nullFilters(), (filterInfo.allItems = true))}></Button>
	<Button text="Kevyt" onclick={() => (nullFilters(), (filterInfo.difficulty = 'Kevyt'))}></Button>
	<Button text="Rasittava" onclick={() => (nullFilters(), (filterInfo.difficulty = 'Rasittava'))}
	></Button>
	<Button text="Raskas" onclick={() => (nullFilters(), (filterInfo.difficulty = 'Raskas'))}
	></Button>
	<Button text="Vuori" onclick={() => (nullFilters(), (filterInfo.mountain = true))}></Button>
	<Button text="Vesistö" onclick={() => (nullFilters(), (filterInfo.bodyOfWater = true))}></Button>
	<Button text="Tuli" onclick={() => (nullFilters(), (filterInfo.fire = true))}></Button>
	<h2>Reitin pituus -filtteri</h2>
	<div class="slider-container">
		<label class="slider-label">
			<input
				class="kmFilter"
				type="range"
				min="0.5"
				max="5"
				step="0.1"
				bind:value={filterInfo.specificLength}
			/>
			<span class="value">{filterInfo.specificLength} km</span>
		</label>
	</div>
</div>

<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->

<style>
	.value {
		color: white;
	}

	.filter-section {
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		h2 {
			color: white;
			margin-bottom: 1rem;
		}
	}
</style>

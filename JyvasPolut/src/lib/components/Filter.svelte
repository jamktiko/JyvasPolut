<script lang="ts">
	import { filterInfo } from '$lib/filterInfo.svelte';
	import Button from './Button.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';

	interface Props {
		getTrails: (
			filterText?: string,
			difficulty?: 'Kevyt' | 'Rasittava' | 'Raskas'
		) => Promise<ItrailTypes[]>;
		printTrail: Promise<ItrailTypes[]>;
	}
	let { getTrails, printTrail }: Props = $props();
</script>

<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->

<div class="filter-section">
	<Button text="Kaikki" onclick={() => (printTrail = getTrails())}></Button>
	<Button text="Kevyt" onclick={() => (printTrail = getTrails('difficulty', 'Kevyt'))}></Button>
	<Button text="Rasittava" onclick={() => (printTrail = getTrails('difficulty', 'Rasittava'))}
	></Button>
	<Button text="Raskas" onclick={() => (printTrail = getTrails('difficulty', 'Raskas'))}></Button>
	<Button text="Vuori" onclick={() => (printTrail = getTrails('mountain'))}></Button>
	<Button text="Vesistö" onclick={() => (printTrail = getTrails('bodyOfWater'))}></Button>
	<Button text="Tuli" onclick={() => (printTrail = getTrails('fireplace'))}></Button>
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

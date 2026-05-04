<script lang="ts">
	import { trailLength } from '$lib/Length.svelte';
</script>

<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->
<!-------------------------------------------------------------------->

<div class="filter-section">
	<h2>Reitin pituus</h2>
	<div class="slider-container">
		<label class="slider-label">
			<input
				class="kmFilter"
				type="range"
				min="0.5"
				max="5"
				step="0.1"
				bind:value={trailLength.specificLength}
			/>
			<span class="value">{trailLength.specificLength} km</span>
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
		font-weight: 600;
		font-size: 1.1rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}
	h2 {
		text-align: center;
		font-size: 1.5rem;
	}

	.filter-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(323deg, #064E3B 4.45%, #082F2D 45.54%, #09272A 55.28%, #0B0B1E 92.57%);
		border-radius: 12px;
		width: fit-content;
		margin-left: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.05);
		position: relative;
		overflow: hidden;
	}

	.filter-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
	}

	.slider-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.slider-label {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.kmFilter {
		-webkit-appearance: none;
		appearance: none;
		width: 200px;
		height: 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		outline: none;
		cursor: pointer;
	}

	.kmFilter::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: linear-gradient(135deg, #34D399, #10B981);
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5), 0 0 0 3px rgba(16, 185, 129, 0.2);
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	.kmFilter::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6), 0 0 0 4px rgba(16, 185, 129, 0.25);
	}

	.kmFilter::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: linear-gradient(135deg, #34D399, #10B981);
		border-radius: 50%;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
	}

	h2 {
		color: white;
		margin-bottom: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}
</style>

<script lang="ts">
	import { favoriteList } from '$lib/favoriteListGS.svelte';
	import { visitedList } from '$lib/visitedListGS.svelte';
	import type { ItrailTypes } from '$lib/trailInfo';
	import { fade } from 'svelte/transition';
	import { theme } from '$lib/theme.svelte';

	interface Props {
		trailCard: ItrailTypes;
		title: string;
		desc: string;
		difficulty: string;
		imgs: string[] | null;
		fav: boolean;
		visit: boolean;
		filterPage: string;
		getTrails: (
			filterText?: string,
			difficulty?: 'Kevyt' | 'Rasittava' | 'Raskas'
		) => Promise<ItrailTypes[]>;
		printTrail: Promise<ItrailTypes[]>;
	}

	let {
		trailCard,
		title,
		desc,
		difficulty,
		imgs,
		fav,
		filterPage,
		getTrails,
		// eslint-disable-next-line no-useless-assignment
		printTrail = $bindable()
	}: Props = $props();

	// these functions add or remove from their lists
	// and check if the filter page is open and then reloading the cards
	function addToVisited(t: ItrailTypes) {
		visitedList.add(t);
		if (filterPage === 'notVisited') {
			printTrail = getTrails(filterPage);
		}
	}

	function removeFromVisited(t: ItrailTypes) {
		visitedList.remove(t);
		if (filterPage === 'visited') {
			printTrail = getTrails(filterPage);
		}
	}

	function favAddorRemove(t: ItrailTypes) {
		if (fav) {
			favoriteList.add(t);
		} else {
			favoriteList.remove(t);
		}
		if (filterPage === 'favorite') {
			printTrail = getTrails(filterPage);
		}
	}
</script>

<!-- This transition gets the card out quickly and smoothly -->
<div class="card{theme.mode}" out:fade={{ delay: 0, duration: 0 }}>
	<!-- If images in the naturetrail.json are not null -->
	{#if imgs}
		<img src={imgs[0]} alt={title} />
		<!-- Else it shows an alternative emoji -->
	{:else}
		<div>🌳</div>
	{/if}

	<div class="content">
		<!-- e.stopPropagation stops the modal from opening -->
		<input
			type="checkbox"
			bind:checked={fav}
			onclick={(e) => e.stopPropagation()}
			onchange={() => favAddorRemove(trailCard)}
		/>

		<h2>{title}</h2>
		<p>{desc}</p>
		<!-- Checks if trailCard is in the visited list and chancges the text based on that -->
		{#if visitedList.wasVisited(trailCard)}
			<button
				class="visited"
				onclick={(e) => {
					e.stopPropagation();
					removeFromVisited(trailCard);
				}}><p in:fade={{ delay: 1, duration: 0 }}>Käyty</p></button
			>
		{:else}
			<button
				class="visited"
				onclick={(e) => {
					e.stopPropagation();
					addToVisited(trailCard);
				}}><p in:fade={{ delay: 1, duration: 0 }}>Ei käyty</p></button
			>
		{/if}
		<div class="footer">
			{#if difficulty === 'Kevyt'}
				<p class="kevyt">{difficulty}</p>
			{:else if difficulty === 'Rasittava'}
				<p class="rasittava">{difficulty}</p>
			{:else if difficulty === 'Raskas'}
				<p class="raskas">{difficulty}</p>
			{/if}

			<button class="btn{theme.mode}">Lue lisää</button>
		</div>
	</div>
</div>

<style>
	.cardligth {
		background: linear-gradient(-38deg, #7c2d12 4%, #1c0a04 92%);
		position: relative;
		border-radius: 50px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.25);
		padding: 10px;
		padding-bottom: 2rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		height: 500px;
	}
	.carddark {
		background: linear-gradient(to right, #0f7a5a, #123f48, #1a1b3a);
		position: relative;
		border-radius: 50px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.25);
		padding: 10px;
		padding-bottom: 2rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		height: 500px;
	}
	.footer {
		position: absolute;
		bottom: 1rem;
		left: 0;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.cardligth:hover {
		transform: scale(1.03);
		box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.35);
	}

	.carddark:hover {
		transform: scale(1.03);
		box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.35);
	}
	.cardligth img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 40px;
		box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
	}
	.carddark img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 40px;
		box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
	}

	h2 {
		color: white;
		font-size: 1.75rem;
		padding-top: 1rem;
		font-weight: bold;
	}
	p {
		font-size: 1rem;
		color: #e2e8f0;
		text-align: center;
		margin: 0;

		font-style: italic;
	}

	.btnligth {
		width: 5rem;
		height: 2.5rem;
		padding: 0 0.875rem;
		background-color: rgb(136, 65, 18);
		border-radius: 50px;
		border: 1.4px solid rgba(0, 0, 0, 0.459);
		color: #f1f5f9;
		font-size: 0.7rem;
		font-weight: bold;
		font-family: Inter, sans-serif;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);

		cursor: pointer;
		transition: background 0.2s ease;
	}

	.btndark {
		width: 5rem;
		height: 2.5rem;
		padding: 0 0.875rem;
		background-color: #62a795;
		border-radius: 50px;
		border: 1px solid black;
		color: #f1f5f9;
		font-size: 0.7rem;
		font-weight: bold;
		font-family: Inter, sans-serif;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);

		cursor: pointer;
		transition: background 0.2s ease;
	}

	.btnligth:hover {
		background-color: rgb(164, 79, 22);
		transform: translateY(-2px);
	}

	.btndark:hover {
		background-color: #082f2d;
	}
	.kevyt {
		color: rgb(143, 189, 143);
		font-weight: bold;
	}
	.rasittava {
		color: orange;
		font-weight: bold;
	}
	.raskas {
		color: orangered;
		font-weight: bold;
	}
	button.visited {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		border: 2px solid black;
		border-radius: 999px;
		cursor: pointer;
		font-weight: bold;
		transition: 0.2s ease;
		margin-top: 0.8rem;
	}
	button.visited p {
		margin: 0;
		font-style: normal;
		color: white;

		font-size: 0.65rem;
		line-height: 1;
	}

	input[type='checkbox'] {
		width: 25px;
		height: 25px;
		cursor: pointer;
		border-radius: 6px;
		outline-color: black;

		color: #10b981;

		transform: scale(1.1);
		transition: transform 0.2s ease;
	}

	input[type='checkbox']:hover {
		transform: scale(1.2);
	}
	input[type='checkbox'] {
		appearance: none;
		-webkit-appearance: none;

		width: 32px;
		height: 32px;
		cursor: pointer;

		background-color: #f0f0f1;

		clip-path: path('M14 25 C-5 12 3 0 14 8 C25 0 33 12 14 25 Z');

		transition:
			transform 0.2s ease,
			background-color 0.2s ease;

		transform: scale(1);
	}

	/* checked */
	input[type='checkbox']:checked {
		background-color: #ef4444;
		transform: scale(1.15);
	}

	/* hover */
	input[type='checkbox']:hover {
		transform: scale(1.2);
	}
	.cardligth,
	.carddark {
		position: relative;
	}
	input[type='checkbox'] {
		position: absolute;

		top: 20px;
		right: 20px;

		z-index: 10;
	}
</style>

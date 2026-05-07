<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { mapState } from '$lib/ShowMap.svelte';

	interface Props {
		visible: boolean;
	}
	let { visible }: Props = $props();
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;
	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	//tyyppi importattu ylempänä

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			mapState.showMap = false;
			// visible = false;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/outdoors-v12',
			center: [25.7473, 62.2426],
			zoom: 12
		});

		// zoom: 9.4
		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.715217, 62.252864])
			.setPopup(new mapboxgl.Popup().setText('Haukanniemen luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.842459, 62.22228])
			.setPopup(new mapboxgl.Popup().setText('Iso-Haapasaaren luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.879744, 62.18534])
			.setPopup(new mapboxgl.Popup().setText('Jääskelän luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.80237, 62.267968])
			.setPopup(new mapboxgl.Popup().setText('Kangasvuoren luontopolku 🅿️'))
			.addTo(map);
		// tarvitsee koordinaatit tästä alaspäin
		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.695128, 62.257384])
			.setPopup(new mapboxgl.Popup().setText('Laajavuoren luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.484143, 62.36291])
			.setPopup(new mapboxgl.Popup().setText('Nyrölän luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.74918, 62.214013])
			.setPopup(new mapboxgl.Popup().setText('Sippulanniemen luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.753065, 62.248546])
			.setPopup(new mapboxgl.Popup().setText('Tourujoen luontopolku 🅿️'))
			.addTo(map);

		new mapboxgl.Marker({ color: 'green', scale: 1.2 })
			.setLngLat([25.755092, 62.296168])
			.setPopup(new mapboxgl.Popup().setText('Touruvuoren luontopolku 🅿️'))
			.addTo(map);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
		// return () => map.remove();
		// tämän jälkeen karttaa ei tuhota
	});
	$effect(() => {
		if (visible) {
			(document.body as HTMLBodyElement).style.overflow = 'hidden';
		} else {
			(document.body as HTMLBodyElement).style.overflow = '';
		}
		if (visible && map) {
			tick().then(() => {
				map.resize();
			});
		}
	});
</script>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="map-wrapper">
		<div
			class="backdrop"
			onclick={() => {
				mapState.showMap = false;
				// visible = false;
			}}
		></div>
		<button class="mapOffButton" onclick={() => (mapState.showMap = false)}>SULJE🗺️</button>
	</div>
{/if}

<div
	bind:this={mapContainer}
	id="map"
	class:hidden={!visible}
	style="width: 800px; height: 600px;"
></div>

<!-- style="width: 800px; height: 600px;" -->
<style>
	/* Tyylittelyt MapBoxin omille "default asetuksille! */
	/* Tyylittelyt MapBoxin omille "default asetuksille! */
	:global(.mapboxgl-popup-content) {
		font-size: 18px;
		border-radius: 15px;
		padding: 25px;
		/* padding-left: 5px; */
		background-color: rgb(147, 202, 147);
		border: solid;
		border-width: 1px;
	}
	:global(.mapboxgl-popup-close-button) {
		font-size: 30px;
		color: rgba(0, 0, 0, 0.623);
	}
	:global(.mapboxgl-popup-close-button:hover) {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
	}
	.hidden {
		/* display: none; */
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
	}
	/* Tyylittelyt MapBoxin omille "default asetuksille! */
	/* Tyylittelyt MapBoxin omille "default asetuksille! */
	#map {
		position: fixed;
		top: 23%;
		left: 26%;
		border-radius: 20%;
		border: 2px dashed rgba(0, 0, 0, 0.6);

		box-shadow: 40px 40px 20px #023b0b6b;
		z-index: 99999;
	}
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99998;
	}
	:global(.mapboxgl-canvas) {
		filter: brightness(85%);
	}
	.mapOffButton {
		position: fixed;
		left: 48%;
		/* top: 18%; */
		top: 26%;
		background-color: rgb(187, 187, 165);
		padding: 5px;
		border-radius: 15px;
		z-index: 100000;
		border-color: rgb(51, 99, 79);
		border-width: 2px;
	}
	.mapOffButton:hover {
		cursor: pointer;
		scale: 1.04;
	}
</style>

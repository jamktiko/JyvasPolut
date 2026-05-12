<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { mapState } from '$lib/ShowMap.svelte';
	import { places } from '$lib/routeStarts';
	import { routes } from '$lib/routeTrails';

	interface Props {
		visible: boolean;
	}
	let { visible }: Props = $props();
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;
	let map: mapboxgl.Map;

	// let mapContainer: HTMLDivElement;
	let mapContainer: HTMLDivElement | undefined = $state();

	//tyyppi importattu ylempänä

	let mapFailed: boolean = $state(false);

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			mapState.showMap = false;
			// visible = false;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		map = new mapboxgl.Map({
			container: mapContainer as HTMLDivElement,
			style: 'mapbox://styles/mapbox/outdoors-v12',
			center: [25.7473, 62.2426],
			zoom: 9.1
		});
		map.on('error', (e) => {
			console.log('Mapbox virhe:', e);
			mapFailed = true;
		});

		// all the trailroutes on map
		map.on('load', () => {
			routes.forEach((route) => {
				// SOURCE
				map.addSource(route.id, {
					type: 'geojson',
					data: {
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: route.coordinates
						}
					}
				});

				// LAYER
				map.addLayer({
					id: `${route.id}-line`,
					type: 'line',
					source: route.id,
					layout: {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': '#a94c15',
						'line-width': 4,
						'line-opacity': 0.7
					}
				});
			});
			// all the trail start points
			places.forEach((place) => {
				new mapboxgl.Marker({ color: 'green', scale: 1.2 })
					.setLngLat(place.coords)
					.setPopup(new mapboxgl.Popup().setText(place.name))
					.addTo(map);
			});
		});

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};

		// return () => map.remove();
		// tämän jälkeen karttaa ei tuhota, pysyy elossa niin kauan kuin F5
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

{#if mapFailed}
	<div id="mapError" class:hidden={!visible} style="width: 800px; height: 600px;">
		<h1 class="errorH1">Kartta ei saatavilla 🗺️</h1>
	</div>
{:else}
	<div
		bind:this={mapContainer}
		id="map"
		class:hidden={!visible}
		style="width: 800px; height: 600px;"
	></div>
{/if}

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
		border-radius: 10%;
		border: 2px dashed rgba(0, 0, 0, 0.6);

		box-shadow: 40px 40px 20px #023b0b6b;
		z-index: 99999;
	}

	#mapError {
		position: fixed;
		top: 23%;
		left: 26%;
		border-radius: 10%;
		border: 2px dashed rgba(0, 0, 0, 0.6);
		background-color: rgb(195, 192, 192);

		box-shadow: 40px 40px 20px #023b0b6b;
		z-index: 99999;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.errorH1 {
		color: black;
		font-size: 26px;
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

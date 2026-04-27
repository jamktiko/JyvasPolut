<script lang="ts">
	import { appInfo } from '$lib/appInfo';
</script>

<header>
	<span class="tree">🌲</span>
	<h1>{appInfo.appName}</h1>
	<span class="tree">🌲</span>
</header>

<style>
	header {
		background:linear-gradient(177deg, #0F172A 11.59%, #113139 49.92%, #134E4A 90.43%);
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-shadow: 20px 20px 20px rgba(0, 0, 0, 0.25);
		font-family: Inter;
	}
	.tree {
		font-size: 1.5rem;
	}
	h1 {
		margin: 0;
		font-size: 2rem;
		color: white;
		font-weight: bold;
		stroke: 1px black;
  		text-shadow: 1px 1px 2px white;

	}
	
</style>


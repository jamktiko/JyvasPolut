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
		background: linear-gradient(177deg, #0F172A 11.59%, #113139 49.92%, #134E4A 90.43%);
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-family: Inter, system-ui, sans-serif;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		height: 100px;
		position: relative;
		overflow: hidden;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.tree {
		font-size: 2rem;
	}
	h1 {
		margin: 0;
		font-size: 3rem;
		color: white;
		font-weight: bold;
		stroke: 1px black;
  		text-shadow: 1px 1px 2px white;

	}
	
</style>


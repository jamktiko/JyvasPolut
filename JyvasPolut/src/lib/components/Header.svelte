<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<header>
	<span class="tree">🌲</span>
	<h1>{appInfo.appName}</h1>
	<span class="tree">🌲</span>
	<nav>
		<!-- reititys -->
		<a class:is-active={page.url.pathname === '/'} href={resolve('/')}>Etusivu</a> /
		<a class:is-active={page.url.pathname === '/about-us'} href={resolve('/about-us')}>About Us</a>
	</nav>
	<!-- reititys -->
</header>

<style>
	header {
		background: linear-gradient(177deg, #0f172a 11.59%, #113139 49.92%, #134e4a 90.43%);
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-family: Inter, system-ui, sans-serif;

		box-shadow:
			0 4px 20px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);

		height: 120px;

		position: sticky;
		top: 0;
		z-index: 999;

		overflow: hidden;
	}

	header::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at 20% 50%, rgba(19, 78, 74, 0.3) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 50%, rgba(17, 49, 57, 0.3) 0%, transparent 50%);
		pointer-events: none;
	}

	.tree {
		font-size: 2rem;
	}

	h1 {
		margin: 0;
		font-size: 3rem;
		color: white;
		font-weight: bold;

		/* improved readability */
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
	}
</style>

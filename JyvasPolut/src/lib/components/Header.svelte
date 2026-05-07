<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { mapState } from '$lib/ShowMap.svelte';
</script>

<header>
	<span class="tree">🌲</span>
	<h1>{appInfo.appName}</h1>
	<span class="tree">🌲</span>
	<nav>
		<!-- reititys -->
		<a class:is-active={page.url.pathname === '/'} href={resolve('/')}>
			<img src="/images/vektoreita/Home.svg" alt="Etusivu" class="nav-icon" />
		</a>
		<a
			class:is-active={page.url.pathname === '/about-us'}
			href={resolve('/about-us')}
			title="About Us"
		>
			<img src="/images/vektoreita/Icon.svg" alt="About Us" class="nav-icon" />
		</a>
	</nav>
	<!-- reititys -->

	<!-- So that the button disappears after its ctivated, or when navigating out of "Etusivu" -->
	{#if page.url.pathname === '/'}
		<button class="mapOnButton" onclick={() => (mapState.showMap = true)}>
			<img src="/images/vektoreita/kartta.svg" alt="Avaa kartta" class="btn-icon" />
		</button>
	{/if}
	<!-- So that the button disappears after its ctivated, or when navigating out of "Etusivu" -->
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

	.nav-icon {
		width: 50px;
		height: 50px;
			padding: 0.4rem;
	border-radius: 12px;

	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(6px);

	box-shadow:
		0 4px 12px rgba(0, 0, 0, 0.35),
		inset 0 1px 0 rgba(255, 255, 255, 0.12);

	transition:
		transform 0.2s ease,
		background 0.2s ease,
		box-shadow 0.2s ease;
	}
	.btn-icon {
		width: 32px;
		height: 32px;
		display: block;
	}
	nav {
	position: absolute;
	left: 2rem;

	display: flex;
	align-items: center;
	gap: 1rem;
}
</style>

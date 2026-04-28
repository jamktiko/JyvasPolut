<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		difficulty: string;
		imgs: string[] | null;
	}

	let { title, desc, difficulty, imgs }: Props = $props();
</script>

<!-- Card container -->
<div>
	<!-- If images in the naturetrail.json are not null -->
	{#if imgs}
		<img src={imgs[0]} alt={title} />
		<!-- Else it shows an alternative emoji -->
	{:else}
		<div>🌳</div>
	{/if}

	<!-- Details container -->
	<div>
		<h2>{title}</h2>
		<p>{desc}</p>
		<!-- Footer container -->
		<div>
			<p>{difficulty}</p>
			<button>Lue lisää</button>
		</div>
	</div>
</div>

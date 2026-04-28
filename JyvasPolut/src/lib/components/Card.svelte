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
	{#if imgs}<!-- If images in the naturetrail.json are not null -->
		<img src={imgs[0]} alt={title} />
	{:else}<!-- Else it shows an alternative emoji -->
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

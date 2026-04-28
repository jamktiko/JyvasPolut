<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		difficulty: string;
		imgs: string[] | null;
	}

	let { title, desc, difficulty, imgs }: Props = $props();
</script>

<div>
	{#if imgs}
		<img src={imgs[0]} alt={title} />
	{:else}
		<div>🌳</div>
	{/if}

	<div>
		<h2>{title}</h2>
		<p>{desc}</p>
		<div>
			<p>{difficulty}</p>
			<button>Lue lisää</button>
		</div>
	</div>
</div>

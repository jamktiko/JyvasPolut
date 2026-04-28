<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		kuva: string[];
	}

	let { title, kuva, desc }: Props = $props();
</script>

<div>
	<img src={kuva[0]} alt={title} />
	<div>
		<h2>{title}</h2>
		<p>{desc}</p>
	</div>
</div>

<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		imgs: string[];
	}

	let { title, imgs, desc }: Props = $props();
</script>

<div>
	<img src={imgs[0]} alt={title} />
	<div>
		<h2>{title}</h2>
		<p>{desc}</p>
	</div>
</div>

<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		difficulty: string;
		imgs: string[];
	}

	let { title, desc, difficulty, imgs }: Props = $props();
</script>

<div>
	<img src={imgs[0]} alt={title} />
	<div>
		<h2>{title}</h2>
		<p>{desc}</p>
		<div>
			<p>{difficulty}</p>
			<button>Lue lisää</button>
		</div>
	</div>
</div>

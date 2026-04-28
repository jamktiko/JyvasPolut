<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
		disabled?: boolean;
	}

	let { text, onclick, disabled = false }: Props = $props();
</script>

<div class="flex gap-4 pl-4">
	<button
		{onclick}
		{disabled}
		class="rounded-full border border-white/20 bg-teal-900 px-4 py-2 text-white shadow-md"
		>{text}
	</button>
</div>

<script lang="ts">
	interface Props {
		title: string;
		desc: string;
		difficulty: string;
		imgs: string[] | null;
	}

	let { title, desc, difficulty, imgs }: Props = $props();
</script>

<div class="card">
	{#if imgs}
		<img src={imgs[0]} alt={title} />
		<!-- Else it shows an alternative emoji -->
	{:else}
		<div>🌳</div>
	{/if}

	<div class="content">
		<h2>{title}</h2>
		<p>{desc}</p>
		<div class="footer">
			<p>{difficulty}</p>
			<button class="btn">Lue lisää</button>
		</div>
	</div>
</div>

<style>
	.card {
		background: linear-gradient(to right, #064E3B, #0B0B1E);
		border-radius: 50px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.25);
		padding:10px;
	}
	h2 {
		color: white;

	}
	.btn {
    width: 5rem; 
    height: 2.5rem; 
    padding: 0 0.875rem; 
    background-color: #64748b; 
    border-radius: 50px;
    border: 1px solid black;
    color: #f1f5f9; 
    font-size: 0.75rem; 
    font-weight: 700;
    font-family: Inter, sans-serif;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn:hover {
    background-color: #475569;
  }
</style>

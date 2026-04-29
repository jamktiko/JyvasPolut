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
		padding: 10px;
		padding-bottom: 1.5rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: scale(1.03);
		box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.35);
	}
	.card img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 40px;
	}
	h2 {
		color: white;
		font-size: 1.75rem;

	}
	p {
		font-size: 0.875rem;
		color: #e2e8f0;
	}
	.btn {
    width: 5rem; 
    height: 2.5rem; 
    padding: 0 0.875rem; 
    background-color: #62A795; 
    border-radius: 50px;
    border: 1px solid black;
    color: #f1f5f9; 
    font-size: 0.6rem; 
    font-weight: 700;
    font-family: Inter, sans-serif;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn:hover {
    background-color: #082F2D;
  }
</style>

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
	<!-- If images in the naturetrail.json are not null -->
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

			{#if difficulty === 'Kevyt'}
				<p class="kevyt">{difficulty}</p>
				{:else if difficulty === 'Rasittava'}
					<p class="rasittava">{difficulty}</p>
				{:else if difficulty === 'Raskas'}
					<p class="raskas">{difficulty}</p>
				{/if}
		


			<button class="btn">Lue lisää</button>
		</div>
	</div>
</div>

<style>
	.card {
		background: linear-gradient(to right, #064e3b, #0b0b1e);
		position: relative;
		border-radius: 50px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.25);
		padding: 10px;
		padding-bottom: 4rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		height: 425px;
	}
	.footer {
		position: absolute;
		bottom: 1rem;
		left: 0;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
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
		box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
	}
	

	h2 {
		color: white;
		font-size: 1.75rem;
		padding-top: 1rem;
		font-weight: bold;
	}
	p {
		font-size: 1rem;
		color: #e2e8f0;
		text-align: center;
		margin: 0;
	
		font-style: italic;

	}
	.btn {
		width: 5rem;
		height: 2.5rem;
		padding: 0 0.875rem;
		background-color: #62a795;
		border-radius: 50px;
		border: 1px solid black;
		color: #f1f5f9;
		font-size: 0.7rem;
		font-weight: bold;
		font-family: Inter, sans-serif;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);

		cursor: pointer;
		transition: background 0.2s ease;
	}

	.btn:hover {
		background-color: #082f2d;
	}
	.kevyt {
		color: rgb(143, 189, 143);
		font-weight: bold;
	}
	.rasittava{
		color:orange;
		font-weight:bold;
	}
	.raskas {
		color: orangered;
		font-weight: bold;
	}
</style>

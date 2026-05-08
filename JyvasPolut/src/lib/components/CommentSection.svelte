<script lang="ts">
	interface Props {
		commentsList: Comment[];
	}
	interface Comment {
		commenter: string;
		commentTitle: string;
		commentText: string;
	}

	let { commentsList }: Props = $props();
	let commenterInput = $state('');
	let commentTitleInput = $state('');
	let commentTextInput = $state('');
	// svelte-ignore state_referenced_locally
	let list = $state(commentsList);

	function addToComments(inputComment: Comment) {
		list.push(inputComment);
	}
</script>

<div class="comment-container">
	<div class="comment-section">
		<div>
			<label>
				Kommentoija:
				<input type="text" bind:value={commenterInput} />
			</label>
		</div>
		<div>
			<label>
				Otsikko:
				<input type="text" bind:value={commentTitleInput} />
			</label>
		</div>
		<div>
			<label>
				*Viesti:
				<textarea bind:value={commentTextInput}></textarea>
			</label>
		</div>
		<div>
			<button
				onclick={() =>
					addToComments({
						commenter: commenterInput,
						commentTitle: commentTitleInput,
						commentText: commentTextInput
					})}>Lähetä</button
			>
		</div>
		<hr />
		{#each list as comment (comment)}
			<div class="comment">
				<p>{comment.commenter}</p>
				<hr />
				<h2>{comment.commentTitle}</h2>
				<p>{comment.commentText}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.comment-container {
		background-color: aliceblue;
		padding: 20px;
		margin: 20px;
	}
	.comment-section {
		background-color: rgb(221, 221, 221);
		padding: 50px;
		margin: 10px;
	}
	.comment {
		background-color: white;
		border: 1px solid black;
		padding: 10px;
		margin: 10px;
	}
	p {
		color: black;
	}
</style>

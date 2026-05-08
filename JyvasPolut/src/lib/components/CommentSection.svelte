<script lang="ts">
	interface Props {
		commentsListJson: Comment[];
	}
	interface Comment {
		commenter: string;
		commentTitle: string;
		commentText: string;
	}

	let { commentsListJson }: Props = $props();
	let commenterInput = $state('');
	let commentTitleInput = $state('');
	let commentTextInput = $state('');
	let commentTextInputVisited = $state(false);
	// svelte-ignore state_referenced_locally
	let commentsList = $state(commentsListJson);

	const validText = (text: string) => text.trim().length > 0;
	let validComment = $derived.by(() => validText(commentTextInput));

	function addToComments(inputComment: Comment) {
		commentsList.push(inputComment);
		commentTextInput = '';
		commentTitleInput = '';
		commenterInput = '';
		commentTextInputVisited = false;
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
				<textarea
					bind:value={commentTextInput}
					class:empty={!validComment && commentTextInputVisited}
					onblur={() => (commentTextInputVisited = !commentTextInputVisited)}
				></textarea>
				{#if !validComment && commentTextInputVisited}
					<p class="error">Kommentissa pitää olla viesti!</p>
				{/if}
			</label>
		</div>
		<div>
			<button
				onclick={() =>
					addToComments({
						commenter: commenterInput,
						commentTitle: commentTitleInput,
						commentText: commentTextInput
					})}
				disabled={!validComment}>Lähetä</button
			>
		</div>
		<hr />
		{#each commentsList as comment (comment)}
			<div class="comment">
				{#if comment.commenter === ''}
					<p>Vieras</p>
				{:else}
					<p>{comment.commenter}</p>
				{/if}
				<hr />
				{#if comment.commentTitle === ''}
					<!-- This checks if theres space at the end of the shortened string -->
					{#if /\s$/.test(comment.commentText.slice(0, 20))}
						<h2>{comment.commentText.slice(0, 19)}...</h2>
					{:else}
						<h2>{comment.commentText.slice(0, 20)}...</h2>
					{/if}
				{:else}
					<h2>{comment.commentTitle}</h2>
				{/if}
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

	.error {
		color: red;
		margin: 0.5rem 0;
	}

	.empty {
		border: 1px solid red;
	}
</style>

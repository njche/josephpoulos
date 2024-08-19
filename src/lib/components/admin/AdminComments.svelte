<script lang="ts">
    import { showAdminModal, adminDeleteReady } from "$lib/utils/stores";
    import { editTitle } from "$lib/utils/stores";
    import Modal from "./Modal.svelte";
    import type { Comment, Reply } from "@prisma/client";
    
    export let data
    let comments: Comment[] = []
    let replies: Reply[] = []
    let formDetails: { action: string, id: number, element: string } = {
        action: '',
        id: NaN,
        element: ''
    }
    $: comments
    $: replies
    const articleCommentsAndReplies = async () => {
        data.comments.forEach((comment: Comment) => {
            if (comment.articleTitle === $editTitle) {
                comments.push(comment)
            }
        })

        data.replies.forEach((reply: Reply) => {
            if (reply.articleTitle === $editTitle) {
                replies.push(reply)
            }
        })
    } 

    articleCommentsAndReplies()
</script>

<div class="article-comments">
    {#if comments.length > 0}
        <h1>
            Comments
        </h1>
        <div class="comments">
            {#each comments as comment, idx}
            <div class="comment-divider" id={`comment-${idx}`}>
                <div class="comment-container">
                    <h4>
                        {comment.name.toUpperCase()}
                    </h4>
                    <div>
                        <p>
                            {comment.content}
                        </p>
                            <Modal 
                                message={'Deleting this comment will delete it permanently, do you wish to continue?'} 
                                {formDetails}
                            />
                            <button 
                                type="button" 
                                on:click={() => {
                                    if (!$adminDeleteReady) {
                                        formDetails = {
                                            action: "?/deleteComment",
                                            id: comment.id,
                                            element: `comment-${idx}`
                                        }
                                        showAdminModal.set(true)
                                    }
                                }}
                            >
                            X
                            </button>
                        </div>
                        <span>
                            {comment.createdAt.toLocaleString()}
                        </span>
                    </div>
                        {#each replies as reply, idx}
                            {#if comment.id === reply.commentId}
                                <div class="reply-container" id={`reply-${idx}`}>
                                    <h4>
                                        {reply.name.toUpperCase()}
                                    </h4>
                                    <div>
                                        <p>
                                            {reply.content}
                                        </p>
                                        <Modal 
                                            message={'Deleting this comment will delete it permanently, do you wish to continue?'} 
                                            {formDetails}
                                        />
                                        <button 
                                            type="button" 
                                            on:click={() => {
                                                if (!$adminDeleteReady) {
                                                    formDetails = {
                                                        action: "?/deleteReply",
                                                        id: reply.id,
                                                        element: `reply-${idx}`
                                                    }
                                                    showAdminModal.set(true)
                                                }
                                            }}
                                        >
                                        X
                                        </button>
                                    </div>
                                    <span>
                                        {reply.createdAt.toLocaleString()}
                                    </span>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/each}
        </div>
    {/if}
</div>

<style>
    .article-comments {
        display: flex;
        flex-direction: column;
        grid-column: 2;
        grid-row: 2;
    }

    .article-comments h4 {
        font-weight: 400;
    }

    .article-comments span {
        font-size: .7rem;
    }

    .comment-divider {
        border-bottom: 4px solid gainsboro;
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .comment-container div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        outline: 1px solid grey;
        padding: 12px;
    }

    .comment-container div button {
        height: 25px;
    }

    .reply-container {
        margin-left: 50px;
    }

    .reply-container div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        outline: 1px solid grey;
        padding: 12px;
    }

    .reply-container div button {
        height: 25px;
    }
</style>
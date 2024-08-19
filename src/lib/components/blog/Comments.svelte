<script lang="ts">
    import { enhance } from "$app/forms";
    import { afterUpdate, onMount } from "svelte";
    export let comments
    export let replies
    export let title: string
    let replyToComment: number = NaN
    let replyToReply: number = NaN
    let modal: boolean = false
    let counter: number = 10
    let commentStatus: string = ''
    let commentMessage: string = ''
    let authReply: string = ''
    let authComment: string = ''

    $: authReply
    $: authComment

    onMount(() => {
        onComment()
    })
    
    afterUpdate(async () => {
        
        if (replyToComment && !authReply) {
            await onReply()
        }

        if (replyToReply && !authReply) {
            await onReply()
        }

        if (!replyToComment && !replyToReply && authReply) {
            await removeTurnstile(authReply)
        }
    })

    const showModal = () => {
        modal = true
        setTimeout(() => {
            counter--
            if (counter > -1) {
                showModal()
            } else {
                modal = false
                counter = 10
            }
        }, 1000)
    }
    
    const onComment = async () => {
        authComment = await turnstile.render('#comment', {
            sitekey: '0x4AAAAAAAM2-VFEiO9tDtUR',
            callback: async function(token: string) {
                console.log(`Challenge Success Comment`)
                console.log(authComment)
            },
        });
    }

    const onReply = async () => {
        authReply = await turnstile.render('#reply', {
            sitekey: '0x4AAAAAAAM2-VFEiO9tDtUR',
            callback: async function() {
                console.log(`Challenge Success Reply`)
            },
        });
    }

    const removeTurnstile = async (auth: string) => {
        const remove = await turnstile.remove(auth)
        authReply = ''
        return remove
    }
</script>
    
<div class="comments" id="comments">
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" defer></script>
    <h1>
        comments
    </h1>
    <form method="POST" id="comment" action="?/comment" use:enhance={() => {
        onComment()
        return async ({ result, update }) => {
            if (result.data.success) {
                update({ reset: true })
            } else {
                update({ reset: false })
            }
            commentStatus = result.data.success
            commentMessage = result.data.message
            showModal()
        };
	}}>
        <h3>
            name
        </h3>
        <input type="text" name="name" maxlength="40" required>
        <h3>
            comment
        </h3>
        <textarea name="comment" maxlength="4000" required/>
        <input name="title" type="hidden" bind:value={title}>
        <div class="button-wrapper">
            <div class="squares">
            <div class="square-1" />
            <div class="square-2" />
            </div>
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAAM2-VFEiO9tDtUR" data-callback="onComment" />
            <button disabled={modal ? true : false} style:background-color={modal ? 'grey' : 'black'}>
                Post Comment
            </button>
            <div class="squares" style="transform: scaleY(-1);" >
                <div class="square-1" />
                <div class="square-2" />
            </div>
        </div>
    </form>
    <div>
        {#if comments} 
            {#each comments as comment}
                <div class="comment">
                    <div class="comment-header">
                        <h3>
                            name: 
                            <div>
                                {comment.name}
                            </div>
                        </h3>
                        <h4>
                            {comment.createdAt.toLocaleString().replace(/\//g, "-")}
                        </h4>
                    </div>
                    <p>
                        {comment.content}
                    </p>
                    <button on:click={() => {
                        replyToComment === comment.id ? replyToComment = NaN : replyToComment = comment.id
                    }}>
                        Reply
                    </button>
                    {#if replyToComment === comment.id}
                    <div class="reply-form">
                        <div class="line" />
                        <form id="reply" method="POST" action="?/reply" use:enhance={() => {
                            return async ({ result, update }) => {
                                if (result.data.success) {
                                    replyToComment = NaN
                                    update({ reset: true })
                                } else {
                                    update({ reset: false })
                                }
                                commentStatus = result.data.success
                                commentMessage = result.data.message
                                showModal()
                            };
                        }}>
                            <input name="comment-id" type="hidden" hidden bind:value={comment.id}>
                            <h3 class="comment-name">
                                name
                            </h3>
                            <input type="text" name="name" maxlength="40" required>
                            <h3>
                                comment
                            </h3>
                            <textarea name="comment" maxlength="4000" required />
                            <input name="title" type="hidden" bind:value={title}>
                            <div class="button-wrapper">
                                <div class="squares" style:margin-left={'0px'}>
                                    <div class="square-1" />
                                    <div class="square-2" />
                                </div>
                                <div class="cf-turnstile" data-sitekey="0x4AAAAAAAM2-VFEiO9tDtUR" data-callback="onReply" />
                                <button disabled={modal ? true : false} style:background-color={modal ? 'grey' : 'black'}>
                                    Post Reply
                                </button>
                                <div class="squares" style="transform: scaleY(-1);" style:margin-left={'0px'}>
                                        <div class="square-1" />
                                        <div class="square-2" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    {/if}
                    {#each replies as reply}
                        {#if reply.commentId === comment.id}
                            <div class="reply">
                                <div class="reply-header">
                                    <h3>
                                        name: 
                                        <div>
                                            {reply.name}
                                        </div>
                                    </h3>
                                    <h4>
                                        {reply.createdAt.toLocaleString().replace(/\//g, "-")}
                                    </h4>
                                </div>
                                <div class="reply-content">
                                    {#if reply.replyId > 0}
                                        <blockquote>
                                            <em>
                                                {replies.find(e => e.id === reply.replyId).content}
                                                <br>
                                                <br>
                                            </em>
                                            <em style="float: right;">
                                                - {replies.find(e => e.id === reply.replyId).name}
                                            </em>
                                        </blockquote>
                                        <p>
                                            {reply.content}
                                        </p>    
                                    {:else}
                                        <blockquote>
                                            <em>
                                                {comment.content}
                                                <br>
                                                <br>
                                            </em>
                                            <em style="float: right;">
                                                - {comment.name}
                                            </em>
                                        </blockquote>
                                        <p>
                                            {reply.content}
                                        </p>
                                    {/if}
                                </div>
                                <button on:click={() => {
                                    replyToReply === reply.id ? replyToReply = NaN : replyToReply = reply.id
                                    console.log(replyToReply)
                                }}>
                                    Reply
                                </button>
                            </div>
                            {#if replyToReply === reply.id}
                                <div class="reply-form">
                                    <div class="line" />
                                    <form id="reply" method="POST" action="?/reply" use:enhance={() => {
                                        return async ({ result, update }) => {
                                            if (result.data.success) {
                                                replyToReply = NaN
                                                update({ reset: true })
                                            } else {
                                                update({ reset: false })
                                            }
                                            commentStatus = result.data.success
                                            commentMessage = result.data.message
                                            showModal()
                                        };
                                    }}>
                                        <input name="comment-id" type="hidden" hidden bind:value={comment.id}>
                                        <input name="reply-id" type="hidden" hidden bind:value={reply.id}>
                                        <h3 class="comment-name">
                                            name
                                        </h3>
                                        <input type="text" name="name" maxlength="40" required>
                                        <h3>
                                            comment
                                        </h3>
                                        <textarea name="comment" maxlength="4000" required />
                                        <input name="title" type="hidden" bind:value={title}>
                                        <div class="button-wrapper">
                                            <div class="squares" style:margin-left={'0px'}>
                                                <div class="square-1" />
                                                <div class="square-2" />
                                            </div>
                                            <div class="cf-turnstile" data-sitekey="0x4AAAAAAAM2-VFEiO9tDtUR" data-callback="onReply" />
                                            <button disabled={modal ? true : false} style:background-color={modal ? 'grey' : 'black'}>
                                                Post Reply
                                            </button>
                                            <div class="squares" style="transform: scaleY(-1);" style:margin-left={'0px'}>
                                                <div class="square-1" />
                                                <div class="square-2" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            {/if}
                        {/if}
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
</div>
{#if modal}
    <div class="comment-modal { commentStatus ? 'success' : 'failed'}">
        <div class="comment-modal-exit">
            <div class="comment-modal-closing">
                <p>
                    exiting in
                </p>
                <span>
                    {counter}
                </span>
            </div>
            <button on:click={() => {
                modal = false
                counter = -1
            }}>
                <p>
                    X
                </p>
            </button>
        </div>
        <div class="comment-status">
            <p>
                delivered : 
            </p>
            <span>
                <p>
                    {commentStatus}
                </p>
            </span>
        </div>
        <div class="comment-message">
            <p class="comment-message-header">
                message alert : 
            </p>
            <span>
                <p>
                    {commentMessage}
                </p>
            </span>
        </div>
    </div>
{/if}

<style>
    @keyframes modal {
        0% {
            transform: translate(-50%, 200px);
        } 4% {
            transform: translate(-50%, 0%);
        } 96% {
            transform: translate(-50%, 0%);
        } 100% {
            transform: translate(-50%, 200px);
        }
    }

    .comment-modal {
        animation: modal 11s;
    }    

    .comment-modal.success {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 200px);
        position: fixed;
        width: 300px;
        height: 150px;
        background: rgba(124, 255, 124, 0.618);
        z-index: 9;
        backdrop-filter: blur(2px);
        border-left: 1px solid green;
        border-right: 1px solid green;
        clip-path: polygon(10px 0%, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0% 10px);
    }

    .comment-modal.success .comment-modal-exit {
        position: fixed;
        right: 0px;
        top: 0px;
        width: 25px;
        height: 25px;
    }

    .comment-modal.success .comment-modal-exit .comment-modal-closing {
        position: fixed;
        color: rgba(0, 0, 0, 0.381);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        font-variant-caps: all-petite-caps;
        font-size: .7rem;
        font-weight: 700;
        letter-spacing: 1px;
        right: 70px;
        top: 8px;
        height: 100px;
    }

    .comment-modal.success .comment-modal-exit .comment-modal-closing p {
        margin: 0;
    }

    .comment-modal.success .comment-modal-exit button {
        position: fixed;
        top: 10px;
        right: 0px;
        width: 30px;
        height: 30px;
        border-radius: 20%;
        color: #ffffff;
        font-size: 18px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: red;
        filter: drop-shadow(0px 0px 4px black);
        border-bottom: 2px solid rgb(35, 35, 35);
    }

    .comment-modal.success .comment-modal-exit button:hover {
        filter: drop-shadow(0px 0px 2px rgb(0, 0, 0));
        border-bottom: none;
    }

    .comment-modal.success .comment-modal-exit button p {
        padding: 0;
        margin: 0;
        transform: translate(3px, -3px);
    }

    .comment-modal.success .comment-status {
        display: flex;
        flex-direction: row;
    }

    .comment-modal.success .comment-status p {
        margin: 0;
        color: rgb(0, 88, 0);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 700;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
        padding-left: 12px;
        padding-top: 4px;
    }
    
    .comment-modal.success .comment-status span p {
        color: rgb(0, 177, 0);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 700;
        padding-left: 6px;
        letter-spacing: 1px;
    }

    .comment-modal.success .comment-message {
        display: flex;
        flex-direction: column;
    }

    .comment-modal.success .comment-message span {
        display: flex;
        align-items: center;
        text-align: left;
        align-self: center;
        height: 80px;
        margin-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
        padding-bottom: 6px;
        align-self: right;
        background-color: rgba(0, 0, 0, 0.381);
        filter: drop-shadow(0px 0px 2px rgb(0, 70, 0));
        clip-path: polygon(10px 0%, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0% 10px);

    }

    .comment-modal.success .comment-message span p {
        margin: 0;
        color: rgb(255, 255, 255);
        max-width: 220px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        font-variant-caps: all-petite-caps;
    }

    .comment-modal.success .comment-message .comment-message-header {
        margin: 0;
        color: rgb(0, 88, 0);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 700;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
        padding-left: 24px;
        padding-top: 4px;
    }

    .comment-modal.success .comment-message p {
        margin: 0;
        color: white;
        font-size: .9rem;
        font-weight: 400;
    }

    /* success */

    .comment-modal.failed {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 200px);
        position: fixed;
        width: 300px;
        height: 150px;
        background: rgba(255, 0, 0, 0.618);
        z-index: 9;
        border-left: 1px solid red;
        border-right: 1px solid red;
        backdrop-filter: blur(2px);
        clip-path: polygon(10px 0%, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0% 10px);
    }

    .comment-modal.failed .comment-modal-exit {
        position: fixed;
        right: 0px;
        top: 0px;
        width: 25px;
        height: 25px;
    }
    
    .comment-modal.failed .comment-modal-exit .comment-modal-closing {
        position: fixed;
        color: rgba(0, 0, 0, 0.381);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        font-variant-caps: all-petite-caps;
        font-size: .7rem;
        font-weight: 700;
        letter-spacing: 1px;
        right: 70px;
        top: 8px;
        height: 100px;
    }

    .comment-modal.failed .comment-modal-exit .comment-modal-closing p {
        margin: 0;
    }
    
    .comment-modal.failed .comment-modal-exit button {
        position: fixed;
        top: 10px;
        right: 0px;
        width: 30px;
        height: 30px;
        border-radius: 20%;
        color: #ffffff;
        font-size: 18px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: red;
        filter: drop-shadow(0px 0px 4px black);
        border-bottom: 2px solid rgb(35, 35, 35);
    }

    .comment-modal.failed .comment-modal-exit button:hover {
        filter: drop-shadow(0px 0px 2px rgb(0, 0, 0));
        border-bottom: none;
    }

    .comment-modal.failed .comment-modal-exit button p {
        padding: 0;
        margin: 0;
        transform: translate(3px, -3px);
    }


    .comment-modal.failed .comment-status {
        display: flex;
        flex-direction: row;
        color: white;
    }

    .comment-modal.failed .comment-status p {
        margin: 0;
        color: white;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 400;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
        padding-left: 12px;
        padding-top: 4px;
    }
    
    .comment-modal.failed .comment-status span p {
        color: red;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 700;
        padding-left: 6px;
        letter-spacing: 0px;
    }

    .comment-modal.failed .comment-message {
        display: flex;
        flex-direction: column;
    }

    .comment-modal.failed .comment-message span {
        display: flex;
        align-items: center;
        text-align: left;
        align-self: center;
        max-width: 220px;
        height: 80px;
        margin-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
        padding-bottom: 6px;
        align-self: right;
        background-color: rgba(0, 0, 0, 0.618);
        filter: drop-shadow(0px 0px 2px red);
        clip-path: polygon(10px 0%, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0% 10px);
    }

    .comment-modal.failed .comment-message span p {
        margin: 0;
        color: rgba(255, 255, 255, 1);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        font-variant-caps: all-petite-caps;
    }


    .comment-modal.failed .comment-message .comment-message-header {
        
        margin: 0;
        color: white;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: .7rem;
        font-weight: 400;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
        padding-left: 24px;
        padding-top: 4px;
    }

    .comment-modal.failed .comment-message p {
        margin: 0;
        color: white;
        font-size: .9rem;
        font-weight: 400;
    }
    
    /* success */

    .button-wrapper {
        width: 200px;
        height: 50px;
        z-index: 3;
        margin-top: 2px;
    }

    .squares {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 200px;
        height: 0px;
        justify-content: space-between;
        align-content: space-between;
        margin-left: -20px;
        pointer-events: none;
    }

    .square-1 {
        margin-top: -10px;
        margin-left: -10px;
        width: 0px;
        height: 0px;
        opacity: 0%;
        border-top: 1px solid red;
        border-left: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }
    
    .square-2 {
        margin-top: -10px;
        margin-right: -10px;
        width: 0px;
        height: 0px;
        opacity: 0%;
        border-top: 1px solid red;
        border-right: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }

    .button-wrapper:hover .square-1 {
        width: 20px;
        height: 20px;
        opacity: 100%;
        border-top: 1px solid red;
        border-left: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }

    .button-wrapper:hover .square-2 {
        width: 20px;
        height: 20px;
        opacity: 100%;
        border-top: 1px solid red;
        border-right: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }

    form {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        width: 100%;
        margin: 0;
        padding: 0;
        padding-bottom: 50px;
        align-items: center;
        justify-content: flex-end;
    }

    h1 {
        text-align: center;
        width: 100%;
        color: #7e7e7e;
        letter-spacing: 4px;
        padding-top: 50px;
        padding-bottom: 50px;
        font-size: 1.5rem;
        font-weight: 400;
        font-variant: small-caps;
    }

    form h3 {
        color: #000000;
        flex: 20%;
        width: fit-content;
        height: fit-content;
        padding: 0;
        padding-right: 10px;
        padding-left: 10px;
        letter-spacing: 5px;
        font-size: 1rem;
        font-weight: 700;
        font-variant: small-caps;
        font-family: monospace;
        border-bottom: 1px solid grey;
        border-left: 4px solid grey;
    }

    input {
        height: 30px;
        display: block;
        margin: auto;
        margin-right: 20px;
        width: 50%;
        border-left: 4px solid grey;
        border-right: 1px solid grey;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        transition: .2s;
    }

    textarea {
        height: 100px;
        flex: 60%;
        display: block;
        margin: auto;
        width: 100%;
        margin-right: 20px;
        border-left: 4px solid grey;
        border-right: 1px solid grey;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        font-weight: 600;
        resize: none;
        z-index: 2;
        transition: .2s;
    }


    button {
        width: 200px;
        height: 50px;
        color: white;
        text-align: center;
        letter-spacing: 4px;
        margin-right: 20px;
        font-variant-caps: all-petite-caps;
        float: right;
        align-self: flex-end;
        background-color: #000000;
        border: none;
        cursor: pointer;
    }

    button:hover {
    background-color: red;
    }

    .comment {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-variant: small-caps;
        font-family: sans-serif;
        margin: auto;
        width: 100%;
        margin-bottom: 20px;
    }

    .comment button {
        width: 100px;
        height: 20px;
        color: white;
        text-align: center;
        letter-spacing: 4px;
        margin-right: 2px;
        font-variant-caps: all-petite-caps;
        float: right;
        align-self: flex-end;
        background-color: grey;
        border: none;
        cursor: pointer;
    }

    .comment button:hover {
    background-color: red;
    }

    .comment p {
        margin: 2px;
        padding: 32px;
        font-size: .8rem;
        color: black;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-variant: normal;
        background-color: rgb(252, 219, 184);
    }

    .comment h3 {
        display: flex;
        flex: 50%;
        color: #222;
        width: fit-content;
        height: 30px;
        padding: 0;
        margin: 0;
        padding-right: 10px;
        padding-left: 10px;
        font-size: 1rem;
        font-weight: 400;
        font-variant-caps: all-small-caps;
        font-family: monospace;
        background-color: rgb(249, 197, 108);
    }

    .comment h3 div {
        color: #000000;
        font-size: 1rem;
        font-weight: 700;
        text-indent: 10px;
    }

    .comment h4 {
        color: #000000;
        width: fit-content;
        height: 30px;
        padding: 0;
        margin: 0;
        padding-right: 10px;
        padding-left: 10px;
        font-size: 1rem;
        font-weight: 100;
        font-variant: small-caps;
        font-variant-caps: all-small-caps;
        font-family: monospace;
        background-color: rgb(249, 197, 108);
        justify-content: space-around;
    }

    .comment .line {
        height: 10px;
        width: 80%;
        float: right;
        margin-right: 50px;
        border-right: 4px solid gainsboro;
    }

    .comment form {
        float: right;
        display: flex;
        flex-direction: row;
        width: 80%;
    }

    .comment form .comment-name {
        background-color: rgb(249, 197, 108);
    }

    .comment form h3 {
        background-color: rgb(252, 219, 184);
    }

    .comment form input {
        border-top: none;
        margin-right: 0px;
        flex: 100%;
    }

    .comment form textarea {
        border-top: none;
        margin-right: 0px;
        flex: 100%;
    }

    .comment form button {
        width: 200px;
        height: 50px;
        color: white;
        text-align: center;
        letter-spacing: 4px;
        margin-right: 0px;
        font-variant-caps: all-petite-caps;
        float: right;
        align-self: flex-end;
        background-color: #000000;
        border: none;
        cursor: pointer;
    }

    .comment-header {
        display: flex;
        margin: 2px;
    }

    .reply {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-variant: small-caps;
        font-family: sans-serif;
        align-content: flex-end;
        width: 80%;
        margin-left: 20%;
        margin-bottom: 20px;
    }

    .reply-header {
        width: 100%;
        display: flex;
        margin: 2px;
    }

    .reply .reply-content {
        background-color: rgb(252, 219, 184);
        margin-right: 2px;
        margin-left: 2px;
    }

    .reply blockquote {
        font-size: .8rem;
        font-variant: none;
        padding: 24px;
        background-color: rgba(255, 255, 255, 0.618)    
    }

    .reply p {
        margin: 2px;
        padding: 32px;
        font-size: .8rem;
        color: black;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-variant: normal;
    }

    .reply h3 {
        display: flex;
        flex: 50%;
        color: #222;
        width: fit-content;
        height: 30px;
        padding: 0;
        margin: 0;
        padding-right: 10px;
        padding-left: 10px;
        font-size: 1rem;
        font-weight: 400;
        font-variant-caps: all-small-caps;
        font-family: monospace;
        background-color: rgb(249, 197, 108);
    }

    .reply h3 div {
        color: #000000;
        font-size: 1rem;
        font-weight: 700;
        text-indent: 10px;
    }

    .reply h4 {
        color: #000000;
        width: fit-content;
        height: 30px;
        padding: 0;
        margin: 0;
        padding-right: 10px;
        padding-left: 10px;
        font-size: 1rem;
        font-weight: 100;
        font-variant: small-caps;
        font-variant-caps: all-small-caps;
        font-family: monospace;
        background-color: rgb(249, 197, 108);
        justify-content: space-around;
    }
    
    @media only screen and (max-width: 1150px) {
        input {
            margin-right: 0px;
        }

        textarea {
            flex: 58%;
            margin-right: 0px;
        }

        form button {
            margin-right: 0px;
        }
    }
</style>
<script lang="ts">
    import { author } from "$lib/config";

    export let data
    let height: number
</script>

<svelte:window bind:innerHeight={height} />

<div class="sidebar" >
    <div>
        <h3>
            Article Details
        </h3>
        <div class="details">
            <div>
                <h4>
                    author
                </h4>
            </div>
            <div>
                <h4>
                    related categories
                </h4>
            </div>
            <div class="author">
                <div class="author-card">
                    <div class="author-image">
                        <img src="/author-small.webp" alt="">
                    </div>
                    <div class="author-details">
                        <p>
                            {author}
                        </p>
                    </div>
                </div>
            </div>
            <div class="tags">
                {#if data.categories}
                    {#each data.categories as tag}
                        <a href="category/{tag}" class="tag">
                            {tag.toUpperCase()}
                        </a>
                    {/each}
                {:else}
                    <div>
                        <h4>
                            {'N/A'}
                        </h4>
                    </div>
                {/if}
            </div>
            <div class="published">
                <div class="item">
                    <h4>published</h4>
                    <div class="line" />
                    <p>{data.date}</p>
                </div>
                <div class="line" />
                <div class="item">
                    <h4>views</h4>
                    <div class="line" />
                    <p>{data.views}</p>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .sidebar {
        width: 80%;
        min-width: 325px;
    }

    .sidebar a {
        text-decoration: none;
    }

    .sidebar h3 {
        width: fit-content;
        color: #7e7e7e;
        letter-spacing: 4px;
        padding: 0;
        padding-left: 10px;
        padding-right: 10px;
        font-size: .9rem;
        font-weight: 400;
        font-variant: small-caps;
    }

    .sidebar h4 {
        width: fit-content;
        color: #7e7e7e;
        letter-spacing: 1px;
        padding: 0;
        padding-left: 5px;
        padding-right: 2px;
        font-size: .7rem;
        font-weight: 400;
        font-variant: small-caps;
        overflow-wrap: break-word;
    }
    
    .tag {
        font-weight: 700;
        font-size: 10px;
        font-family: sans-serif;
        width: fit-content;
        height: fit-content;
        color: white;
        padding: 7px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: rgb(141, 174, 219);
        filter: drop-shadow(3px 3px 1px rgb(202, 202, 202));
    }

    .tag:hover {
        cursor: pointer;
        margin-left: 1px;
        margin-top: 1px;
        margin-right: 4px;
        margin-bottom: 4px;
        filter: drop-shadow(1px 1px 1px rgb(156, 156, 156));
    }

    .tags {
        min-height: 150px;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        padding-top: 10px;
        padding-left: 15px;
        padding-bottom: 5px;
        border-top: 4px solid gainsboro;
        border-left: 1px solid gainsboro;
        overflow-y: auto;
    }

    .details {
        display: grid;
        grid-template-columns: 38.1% 61.8%;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        align-self: center;
        filter: none;
    }

    .author {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top: 4px solid gainsboro;
        grid-row: span 2;
    }
    
    .author-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100%);
        min-width: 125px;
        z-index: -1;
    }

    .author-image {
        padding-top: 5px;
        display: flex;
        align-items: flex-end;
    }

    .author-image img {
        width: 100%;
    }

    .author-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .author-details p {
        color: white;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(219, 141, 141);
        text-align: center;
        width: 90%;
        padding-bottom: 2px;
        font-size: 1rem;
        word-spacing: 4px;
        font-variant-caps: all-petite-caps;
    }

    .published {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 100px;
        border-right: 1px solid gainsboro;
        border-left: 1px solid gainsboro;
        border-top: 4px solid gainsboro;
        grid-column: 2;
        text-align: center;
    }
    
    .published .line {
        height: 100%;
        width: 1px;
        background-color: gainsboro;
    }

    .published .item {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .published .item {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .published .item .line {
        height: 4px;
        width: 0px;
    }

    .published p {
        margin: 0;
        text-align: center;
        font-size: .65rem;
        font-weight: 700;
        color: grey;
        letter-spacing: 2px;
        text-indent: 3px;
        font-kerning: none;
    }
    
    .published h4 {
        margin: 0;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid gainsboro;
    }

    
    @media only screen and (max-width: 1150px) {
        .sidebar {
            width: 100%;
        }

        .author {
            align-items: flex-start;
        }
    }


    @media only screen and (max-width: 350px) {
        .sidebar {
            min-width: 0px;
        }

        .author-card {
            min-width: 100px;
        }
    }
    
</style>
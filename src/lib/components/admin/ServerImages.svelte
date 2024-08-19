<script lang="ts">
    import { PUBLIC_SERVER_URL } from "$env/static/public";
    import { afterUpdate, onMount } from "svelte";

    let data: {
        result: string[]
    }
    
    let showImages = false
    
    const handleClick = async () => {
        showImages = !showImages
    }
    
    afterUpdate(async () => {
        if (showImages) {
            data = await (await fetch(`${PUBLIC_SERVER_URL}/images`)).json()
        }
    })
</script>

<div class="server-images">
    <button
        type="button"
        on:click={handleClick}
    >
        {showImages ? 'hide server images' : 'show server images'}
    </button>
    {#if showImages}
        <ul>
            {#if data}
                {#each data.result as img}
                    <li>
                        <a 
                            href={`${PUBLIC_SERVER_URL}/${img}`}
                            target="_blank"
                        >
                            {img}
                        </a>
                    </li>
                {/each}
            {:else}
            <p>
                loading...
            </p>
            {/if}
        </ul>
    {/if}
</div>

<style>
    .server-images {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    button {
        color: grey;
        width: 160px;
        font-variant-caps: all-petite-caps;
        background-color: transparent;
        border: 1px solid grey;
    }

    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        overflow: auto;
        max-height: 200px;
        width: 100%;
        border: 1px solid gainsboro;
        background-color: white;
        list-style: none;
        margin: 0;
    }

    li {
        padding: 4px;
        width: fit-content;
        font-variant-caps: all-petite-caps;
    }

    li a {
        color: grey;
    }
</style>
<script lang="ts">
    import { page } from '$app/stores'
    import type { PageServerData } from './$types';
    export let data: PageServerData
    let height: number
</script>

<svelte:window bind:innerHeight={height} />
<svelte:head>
    <title>Categories - Joseph Poulos</title>
    <meta
		data-key="description"
		name="description"
		content="
            Articles and writings covering culture topics such as: 
            sports, movies, books, reviews, lifestyle and various musings
        "
	/>
	<meta property="og:title" content="Articles - Joseph Poulos" />
	<meta property="og:description" content="
        Articles and writings covering culture topics such as: 
        sports, movies, books, reviews, lifestyle and various musings
    "/>
    <meta property="og:image" content={`${$page.url.origin}/author.png`} />
	<meta name="twitter:title" content="Articles - Joseph Poulos"/>
	<meta name="twitter:description" content="
        Articles and writings covering culture topics such as: 
        sports, movies, books, reviews, lifestyle and various musings
    " />
	<meta name="twitter:image" content={`${$page.url.origin}/author.png`} />
</svelte:head>
<div style:height='{height - 105}px'>
    <h1>
        all article categories
    </h1>
    <ul>
        {#each data.categories as category}
            <li>
                <span>
                    <a href={`category/${category.title}`}>
                        {category.title}
                    </a>
                    <p>
                        {`(${category.count})`}
                    </p>
                </span>
            </li>
        {/each}
    </ul>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    h1 {
        font-size: 1.25rem;
        font-family: monospace;
        letter-spacing: 4px;
        padding-right: 40px;
        margin-left: 20px;
        border-bottom: 1px solid gainsboro;
        width: fit-content;
        font-weight: 400;
        font-variant-caps: all-petite-caps;
    }

    ul {
        width: fit-content;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        list-style-type: square;
        font-family: monospace;
        font-variant-caps: all-small-caps;
        margin-block: 0;
        padding-left: 60px;
        height: calc(100% - 60px);
    }
    
    li {
        font-size: 1rem;
        color: gainsboro;
        margin: 0;
        margin-block: 0;
    }
    
    span {
        font-size: 1.5rem;
        display: flex;
        flex-direction: row;
        padding-left: 0px;
        padding-right: 20px;
    }

    span a {
        color: rgb(24, 110, 151);
        text-decoration: none;
    }

    span p {
        padding-left: 10px;
        color: rgb(24, 110, 151);
        font-size: 1rem;
        margin: 0;
        font-style: italic;
    }
</style>
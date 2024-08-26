<script lang="ts">
    import '$lib/styles/blogIndex.css'
    import { page } from '$app/stores'
    import { afterNavigate } from '$app/navigation'
    import { afterUpdate } from 'svelte'
    import Pagination from '$lib/components/blogIndex/Pagination.svelte'
    export let data
    let width: number
    let loading: boolean = true
    let iteration: number
    let opacity = 0
    $: currentPage = Number($page.url.searchParams.get('page')) || 1 
    $: search = $page.url.searchParams.get('search') || ''
    $: iteration = Number(currentPage) > 1 ? iteration = Number(currentPage) * 6 - 5 : iteration = 1
    afterNavigate(async () => {
        loading = true
        opacity = 0
    });

    afterUpdate(() => {
        if (data) {
            loading = false
        }

        setTimeout(() => {
            if (opacity === 100) {
                return opacity = 100
            }
            opacity++
        }, 10)
    })
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
    <title>Articles - Joseph Poulos</title>
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
    <meta property="og:image" content={`${$page.url.origin}/author.webp`} />
	<meta name="twitter:title" content="Articles - Joseph Poulos"/>
	<meta name="twitter:description" content="
        Articles and writings covering culture topics such as: 
        sports, movies, books, reviews, lifestyle and various musings
    " />
	<meta name="twitter:image" content={`${$page.url.origin}/author.webp`} />
</svelte:head>

{#if !loading}
    <div class="blog-index-container">
        <div class="search">
            <form method="GET" action="?/search">
                <input 
                    type="text" 
                    placeholder={search ? `results for '${search}'` : 'search for articles'} 
                    name="search" 
                    id="search"
                >
                <button
                    class="clear" 
                    type="button"
                    on:click={() => {
                        let inputElement = document.getElementsByTagName('input')
                        let submit = document.getElementById('optical')
                        inputElement[0].value = ''
                        submit?.click()
                    }}
                />
                <button class="optical" type="submit" id="optical" />
            </form>
        </div>
        <div class="grid-articles">
            <div class="articles">
                {#each data.articles.results as article, idx}
                    {#key currentPage || search}
                        <a class="article" href="articles/{article.slug}">
                            <div class="card-container">
                                <div 
                                    class="card"
                                    id="card" 
                                    style="background-image: url({article.image}); opacity: {opacity / 100 - .001}" 
                                >
                                    <div class="arrow">
                                        <div class="arrow-1" />
                                    </div>
                                    <div class="card-index">
                                        <p>
                                            {idx + iteration}
                                        </p>
                                    </div>
                                    <div class="card-details">
                                        <div class="card-title">
                                            <h2>
                                                {article.title}
                                            </h2>
                                        </div>
                                        <div class="card-synopsis">
                                            {#if article.synopsis.length > 210}
                                                {article.synopsis.slice(0, article.synopsis.slice(0, 210).lastIndexOf(" ")) + " ..."}
                                                <strong>read more</strong>
                                            {:else}
                                                {article.synopsis}
                                            {/if}
                                        </div>
                                        <span class="card-date">
                                            {article.date}
                                        </span>
                                    </div> 
                                </div>
                            </div>
                        </a>
                    {/key}
                {/each}
            </div>
            <Pagination totalPages={data.articles.totalPages} currentPage={currentPage} search={search} />
        </div>
    </div>
{/if}

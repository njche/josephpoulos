<script lang="ts">
    import '$lib/styles/blog.css'
    import Comments from '$lib/components/blog/Comments.svelte'
    import Content from '$lib/components/blog/Content.svelte'
    import Track from '$lib/components/blog/Track.svelte'
    import Sidebar from '$lib/components/blog/Sidebar.svelte'
    import Recent from '$lib/components/blog/Recent.svelte';
    import { page } from "$app/stores"
    import { onMount } from 'svelte';
   
    export let data

    let windowInnerHeight: number
    let windowInnerWidth: number
    let contentHeight: number
    let mount = false
    const onLoad = async () => {
            fetch(`/api/articles/${$page.data.article.slug}`, {
                method: 'POST'
            });
        }
        
    onMount(async () => {
        mount = true
        await onLoad()
    })
</script>

<svelte:window bind:innerHeight={windowInnerHeight} bind:innerWidth={windowInnerWidth}/>
<svelte:head>
    <title>{data.article?.title} - Joseph Poulos</title>
	<meta data-key="description" name="description" content="{data.article?.synopsis}">
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.article?.title} />
	<meta property="og:description" content={data.article?.synopsis} />
	<meta property="og:image" content="{data.article?.image}" />
	<meta property="og:url" content="{$page.url}/" />
	<meta name="twitter:title" content={data.article?.title} />
	<meta name="twitter:description" content={data.article?.synopsis} />
	<meta name="twitter:image" content="{data.article?.image}" />
</svelte:head>

{#if mount && windowInnerWidth < 1151}
    <div class="blog-container" >
        <div>
            <div>
                <Content data={data.article}/>
            </div>
            <div>
                <Sidebar data={data.article}/>
            </div>
        </div>
        <div>
            <Comments comments={data.comments} replies={data.replies} title={data.article?.title} />
            <Recent data={data.recent} />
        </div>
    </div>
{:else}
    <div class="blog-container">
        <div>
            <Sidebar data={data.article}/>
            <Recent data={data.recent} />
        </div>
        <div>
            <Content data={data.article}/>
            <Comments comments={data.comments} replies={data.replies} title={data.article?.title} />
        </div>
        <div>
            <Track scale={.2} maxHeight={contentHeight}>
                <div bind:clientHeight={contentHeight}>
                    <Content data={data.article} />
                </div>
            </Track>
        </div>
    </div>
{/if}

<style>
    @keyframes slide-in {
        0% {
            opacity: 0;
            filter: saturate(0);
        } 100% {
            opacity: 1;
            filter: saturate(1);
        }
    }

    .blog-container {
        animation-name: slide-in;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
    }

    iframe {
        width: 100%;
    }
</style>
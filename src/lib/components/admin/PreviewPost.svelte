<script lang="ts">
    import '$lib/styles/blog.css'
    import { selected, selectedImage } from '$lib/utils/stores'
    export let title: string
    export let synopsis: string
    export let content: Promise<string>
    export let imgTag: string
    export let data
    $: select = $selected
    $: image = $selectedImage
</script>

<div class="preview">
    <div class="article">
        <div class="title">
            <h1>
                { title ? title : 'Title Here'}
            </h1>
        </div>
        <div class="synopsis">
            <p>
                {synopsis ? synopsis : 'Here is where your synopsis will be.'}
            </p>
        </div>
        <div class="cover">
            {#if image}
                <img src={String(image)} alt="">
                <h6>
                    {@html imgTag}
                </h6>
            {:else if data.articles[select]}
                <img src={data.articles[select].image} alt="">
                <h6>{@html imgTag ? imgTag : 'Courtesy of'}</h6>
            {/if}
        </div>
        <div class="content">
            <article>
                {#if content}
                    {@html content}
                {:else}
                    {'This is where your article will render'}
                {/if}
            </article>
        </div>
    </div>
</div>


<style>

    .preview {
        width: 100%;
        overflow-y: auto;
        scrollbar-gutter: stable;
        scroll-timeline-axis: x;
        height: 90vh;
        padding: 20px;
        background-color: white;
        filter: drop-shadow(0px 0px 50px rgb(175, 175, 175));
        grid-row: 1;
        grid-column: 2;
        z-index: 0;
        scrollbar-width: thin;
    }

    .title {
        align-self: center;
        width: 100%;
        border-bottom: 2px solid whitesmoke;
        border-top: 2px solid whitesmoke;
    }
    
    .synopsis {
        width: 85%;
        margin: auto;
        padding-top: 24px;
        padding-bottom: 24px;
        font-style: italic;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
    }

    .synopsis p { 
        letter-spacing: 1px;
        color: #8d8d8d;
        padding: 0;
        font-size: .8rem;
    }

    .cover {
        border-bottom: 4px solid gainsboro;
    }

    .cover h6 {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    h6 {
        max-width: 61.8%;
        text-align: center;
        align-self: center;
        margin: auto;
        padding: 0;
        color: rgb(0, 0, 0);
        font-weight: 400;
    }

    .cover {
        display: block;
        position: relative;
        margin: auto;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

    .cover img {
        width: 100%;
        border-radius: 5px;
        z-index: -1;
    }

    .content { 
        color: #333;
        font-size: 1rem;
        padding-top: 12px;
        padding-bottom: 12px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overflow-wrap: break-word;
    }
    
    @media only screen and (max-width: 954px) {
        .preview {
            width: calc(100% - 30px);
        }
    }
</style>
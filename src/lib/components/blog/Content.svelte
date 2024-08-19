<script>
    import '$lib/styles/blog.css'
    export let data
</script>

<div>
    <header>
        <div class="title">
            <h1>
                {data.title}
            </h1>
        </div>
        <div class="synopsis">
            <p>
                {data.synopsis}
            </p>
        </div>
        <div class="cover">
            <img src={data.image} width="100%" height="100%" alt={data.altImg}>
            <h6>
                {@html data.imageTag}
            </h6>
        </div>
    </header>
    <div class="content">
        <article>
            {@html data.mdHtml}
        </article>
    </div>
</div>

<style>
    .title {
        align-self: center;
        width: 100%;
        border-bottom: 2px solid whitesmoke;
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
</style>

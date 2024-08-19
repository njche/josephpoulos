<script>
    import '$lib/styles/slideUp.css'
    export let data
</script>

{#each data as article}
    <div 
        class='slide-wrapper-up'
    >
        <div class="slide-header">
            <h1>
                {article.title}
            </h1>
        </div>
        <div class="slide-header-2">
            {article.synopsis}
        </div>
        <div class="slide-content">
            {@html article.mdChopped}
        </div>
    </div>
{/each}

<style>

    .slide-wrapper-up {
        width: var(--landing-width);
        min-height: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
        pointer-events: none;
    }

    .slide-header {
        align-items: flex-start;
        text-align: center;
        width: 100%;
        margin: 0;
        padding: 0;
        padding-left: 15%;
    }

    h1 {
        color: white;
        animation-name: slide-2;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        text-align: left;
        width: fit-content;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 2px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 4px;
        padding-top: 4px;
        margin: 0;
        z-index: 9;
    }
    
    .slide-header-2 {
        color: white;
        animation-name: slide-3;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        width: 100%;
        font-size: .75rem;
        font-weight: 400;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        letter-spacing: 2px;
        padding-left: 5px;
        padding-right: 55px;
        padding-top: 0px;
        padding-bottom: 5px;
        margin: 0;
    }
    
    
    .slide-content {
        color: white;
        animation-name: slide-4;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        width: var(--width);
        font-size: .5rem;
        font-weight: 400;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        letter-spacing: 2px;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 0px;
        padding-bottom: 0px;
        line-height: 1;
        border-left: 1px solid white;
    }
</style>
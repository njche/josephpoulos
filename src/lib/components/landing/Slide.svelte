<script>
    import { selected, selectedSlide, selectedSlideRow } from "$lib/utils/stores";
    export let data
    export let slideRow
    import '$lib/styles/slide.css'
    import { afterUpdate } from "svelte";

    afterUpdate(() => {
    })
</script>
{#each data as article, idx}
    <div 
        class={$selectedSlide === idx && $selectedSlideRow === slideRow ? 'slide-wrapper selected' : 'slide-wrapper'} 
        on:click={() => {
                selectedSlide.set(idx)
                selectedSlideRow.set(slideRow)
            }
        }
        on:keypress
        role='menuitem'
        tabindex={-1}
    >
        <div class="squares">
            <div class={$selectedSlide === idx && $selectedSlideRow === slideRow ? 'square-1 selected' : 'square-1'} />
            <div class={$selectedSlide === idx && $selectedSlideRow === slideRow ? 'square-2 selected' : 'square-2'} />
        </div>
        <div class="slide-header">
            <h1>
                {article.title}
            </h1>
            <img src={article.image} alt={article.imageAlt}>
        </div>
        <div class="slide-header-2">
            {article.synopsis}
        </div>
        <div class="slide-content">
            {@html article.mdChopped}
        </div>
        <div 
            class="squares" 
            style="
                transform: scaleY(-1); 
                position:relative; 
                margin-top: -10px; 
                margin-left: 4px" 
        >
            <div class={$selectedSlide === idx && $selectedSlideRow === slideRow ? 'square-1 selected' : 'square-1'} />
            <div class={$selectedSlide === idx && $selectedSlideRow === slideRow ? 'square-2 selected' : 'square-2'} />
        </div>
    </div>
{/each}

<style>
    .squares {
        position: fixed;
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        justify-content: space-between;
        align-content: space-between;
        transform: translate(2px, 2px);
        pointer-events: none;
        z-index: 9;
    }

    .square-1 {
        margin-top: -10px;
        margin-left: -10px;
        width: 50px;
        height: 50px;
        opacity: 0%;
        border-top: 4px solid red;
        border-left: 4px solid red;
        background-color: transparent;
        transition: 0s;
        transform: scaleX(0) scaleY(0);
    }

    .square-2 {
        margin-top: -10px;
        margin-right: -10px;
        width: 50px;
        height: 50px;
        opacity: 0%;
        border-top: 4px solid red;
        border-right: 4px solid red;
        background-color: transparent;
        transition: 0s;
        transform: scaleX(0) scaleY(0);
    }

    .square-1.selected {
        margin-top: -10px;
        margin-right: 25px;
        width: 50px;
        height: 50px;
        opacity: 100%;
        border-top: 4px solid red;
        border-left: 4px solid red;
        background-color: transparent;
        transition: .15s;
        transform: scaleX(1) scaleY(1);
    }

    .square-2.selected {
        margin-top: -10px;
        width: 50px;
        height: 50px;
        opacity: 100%;
        border-top: 4px solid red;
        border-right: 4px solid red;
        background-color: transparent;
        transition: .15s;
        transform: scaleX(1) scaleY(1);
    }

    .slide-wrapper.selected {
        color: black;
        filter: hue-rotate(0deg);
    }
    
    .slide-wrapper.selected .slide-header h1 {
        color: white;
        background-color: rgba(24, 110, 151, 0.512);
        /* filter: hue-rotate(170deg); */
    }
    
    .slide-wrapper.selected .slide-header-2 {
        color: white;
        background-color: red;
        background-color: rgb(24, 110, 151);
        /* filter: hue-rotate(170deg); */
    }
    
    .slide-wrapper.selected .slide-content {
        background-color: rgba(0, 89, 68, 0.512);
        background-color: rgba(24, 110, 151, 0.512);
        filter: hue-rotate(0deg) brightness(200%);
    }

    .slide-wrapper.selected .slide-header img {
        z-index: 9;
    }

    .slide-wrapper {
        width: var(--landing-width);
        min-height: 100%;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        letter-spacing: 1px;
    }
    
    .slide-header {
        align-items: flex-start;
        text-align: center;
        width: 100%;
        margin: 0;
        padding: 0;
        padding-left: 15%;
        cursor: pointer;
    }

    .slide-header img {
        mix-blend-mode: hard-light;
        animation-name: slide-5;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        position: fixed;
        top: 0;
        max-height: 100px;
        max-width: 300px;
        filter: sepia(100%) hue-rotate(120deg) saturate(200%);
        opacity: 30.05%;
        cursor: pointer;
    }
    
    h1 {
        color: black;
        animation-name: slide-2;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        text-align: left;
        width: 80%;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 2px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 4px;
        padding-top: 4px;
        background-color: rgba(245, 245, 245, 0.381);
        margin: 0;
        z-index: 8;
        filter: drop-shadow(0px 0px 4px rgb(144, 144, 144));
    }
    
    .slide-header-2 {
        color: white;
        animation-name: slide-3;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        width: 80%;
        font-size: .75rem;
        font-weight: 400;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        letter-spacing: 2px;
        padding-left: 5px;
        padding-right: 55px;
        padding-top: 0px;
        padding-bottom: 5px;
        border-bottom: 1px solid gainsboro;
        background-color: rgba(0, 0, 0, .618);
        margin: 0;
        cursor: pointer;
        filter: drop-shadow(0px 0px 4px rgb(144, 144, 144));
    }
    
    
    .slide-content {
        mix-blend-mode: multiply;
        animation-name: slide-4;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-delay: 30s;
        animation-duration: 60s;
        animation-timing-function: linear;
        width: 80%;
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
        cursor: pointer;
        filter: drop-shadow(0px 0px 4px rgb(144, 144, 144));
    }
</style>
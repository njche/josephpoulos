<script lang="ts">
    import Slide from "./Slide.svelte";
    import SlideUp from "./SlideUp.svelte";
    export let data
    export let width: number
    export let height: number
    const reversedArray = []

    for(let i = data.result.slide.length - 1; i >= 0; i--) {
        const valueAtIndex = data.result.slide[i]
        
        reversedArray.push(valueAtIndex)
    }
</script>

<div class="slide-container">
    {#if width > 1024 && height > 730}
        <div class="slide" style:z-index='2'>
            <Slide data={data.result.slide} slideRow={0} />
        </div>
        <div class="slide-copy" style:z-index='2'>
            <Slide data={data.result.slide} slideRow={0} />
        </div>
        <div class="slide-2" style:z-index='3' style:flex-direction='row'>
            <Slide data={data.result.slide2} slideRow={1} />
        </div>
        <div class="slide-2-copy" style:z-index='3' style:flex-direction='row'>
            <Slide data={data.result.slide2} slideRow={1} />
        </div>
        <div class="slide-3" style:z-index='4'>
            <Slide data={data.result.slide3} slideRow={2} />
        </div>
        <div class="slide-3-copy" style:z-index='4'>
            <Slide data={data.result.slide3} slideRow={2} />
        </div>
    {/if}
    <div class="slide-up">
        <SlideUp data={data.result.slide3} />
    </div>
</div>

<style>
    @keyframes slide {
        0% {
            transform: translate(-100%, 0%) scale(1);
        } 100% {
            transform: translate(100%, 0%) scale(1);
        } 
    }

    @keyframes load {
        0% {
            opacity: 0%;
        } 100% {
            opacity: 38.1%;
        }
    }
    
    @keyframes slide-up {
        0% {
            transform: scale(1) translate(0px, 0%);
            opacity: 0%;
        } 5% {
            opacity: 100%;
        } 100% {
            transform: scale(1) translate(0px, -100%);
        } 
    }

    .slide-container {
        animation-name: load;
        animation-duration: 5s;
        animation-iteration-count: 1;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        opacity: 38.1%;
        user-select: none;
        -webkit-user-select: none;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 1;
    }

    .slide-container:nth-child(0) {
        background-color: red;
        scale: .5;
    }

    .slide {
        position: fixed;
        top: 1%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 4;
        height: fit-content;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-1-duration);
        animation-timing-function: linear;
    }

    .slide-copy {
        position: fixed;
        top: 1%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 2;
        height: fit-content;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-1-duration);
        animation-delay: calc(var(--slide-1-duration) / 2);
        animation-timing-function: linear;
        transform: translate(-100%, 0%);
    }
    
    
    .slide-2 {
        position: fixed;
        top: 33%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 2;
        height: fit-content;
        opacity: 100%;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-2-duration);
        animation-timing-function: linear;
    }

    .slide-2-copy {
        position: fixed;
        top: 33%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 2;
        height: fit-content;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-2-duration);
        animation-delay: calc(var(--slide-2-duration) / 2);
        animation-timing-function: linear;
        transform: translate(-100%, 0%);
    }

    .slide-3 {
        position: fixed;
        top: 66%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 2;
        height: fit-content;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-3-duration);
        animation-timing-function: linear;
    }

    .slide-3-copy {
        position: fixed;
        top: 66%;
        display: flex;
        flex-direction: row-reverse;
        width: var(--slide-width);
        z-index: 2;
        height: fit-content;
        animation-name: slide;
        animation-iteration-count: infinite;
        animation-duration: var(--slide-3-duration);
        animation-delay: calc(var(--slide-3-duration) / 2);
        animation-timing-function: linear;
        transform: translate(-100%, 0%);
    }

    .slide-up {
        animation-name: slide-up;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-delay: -25s;
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        z-index: 1;
    }
</style>
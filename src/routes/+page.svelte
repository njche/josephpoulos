<script lang="ts">
    import { selectedSlide } from '$lib/utils/stores.js';
    import Slides from '$lib/components/landing/Slides.svelte';
    import { onMount } from 'svelte';
    export let data

    let height: number
    let width: number
    let mounted: boolean

    const handleKeydown = ({ key }: KeyboardEvent) => {

        if (width <= 1024) {
            if (key === 'ArrowDown') {
                $selectedSlide + 3 > data.result.slide.length ? 
                    selectedSlide.set(($selectedSlide + 2) - (data.result.slide.length)) : 
                    selectedSlide.set($selectedSlide + 2)
            }
    
            if (key === 'ArrowUp') {
                $selectedSlide - 2 < 0 ? 
                    selectedSlide.set(($selectedSlide - 2) + (data.result.slide.length)) : 
                    selectedSlide.set($selectedSlide - 2)
            }

            if (key === 'ArrowLeft') {
            $selectedSlide <= 0 ? 
                selectedSlide.set(data.result.slide.length - 1) :
                selectedSlide.set($selectedSlide - 1)
            
            }

            if (key === 'ArrowRight') {
                $selectedSlide >= (data.result.slide.length - 1) ? 
                    selectedSlide.set(0) :
                    selectedSlide.set($selectedSlide + 1);
            }
        }


        if (key === 'ArrowUp') {
            $selectedSlide <= 0 ? 
                selectedSlide.set(data.result.slide.length - 1) :
                selectedSlide.set($selectedSlide - 1)
            
        }

        if (key === 'ArrowDown') {
            $selectedSlide >= (data.result.slide.length - 1) ? 
                selectedSlide.set(0) :
                selectedSlide.set($selectedSlide + 1);
        }
    }

    onMount(() => {
        mounted = true
    })
</script>

<svelte:window
    bind:innerHeight={height} 
    bind:innerWidth={width}
    on:keydown={handleKeydown}
/>

<svelte:head>
    <title>
        Joseph Poulos
    </title>
    <meta property="og:title" content="Joseph Poulos" />
	<meta
		data-key="description"
		property="og:description"
		name="description"
		content="Writer, bookworm, and NBA fan"
	/>
	<meta property="og:image" content="http:localhost:5173/author.png" />
	<meta name="twitter:image" content="http:localhost:5173/author.png" />
</svelte:head>
{#if mounted}
    <div 
        class="container" 
        style:height='{height}px' 
        style:width='{width}px' 
        style:--width='{width}px'
        style:--landing-height='{height}px' 
        style:--landing-width='{width * .85}px' 
        style:--slide-width='{width * ((6 / 9) * data.result.slide.length)}px'
        style:--slide-1-duration='{(308 / 9) * data.result.slide.length}s'
        style:--slide-2-duration='{(350 / 9) * data.result.slide.length}s'
        style:--slide-3-duration='{(284 / 9) * data.result.slide.length}s'
    >
    <header>
        <div class="info">
            <div style:flex='100%'>
                <div class="name">
                    <h1 class="first">
                        Joseph
                    </h1>
                    <h1 class="last">
                        Poulos
                    </h1>
                </div>
                <p class="specialty">
                    writer
                </p>
            </div>
            {#if width <= 1024 && width > 600 && height > 310}
                {#each data.result.slide as article, idx}
                    <div 
                        class={$selectedSlide === idx ? 'slide-nav-item selected' : 'slide-nav-item'} 
                        style="background-image: url({article.image});"
                        on:click={() => {
                            selectedSlide.set(idx)
                        }} 
                        on:keydown
                        role="menuitem"
                        tabindex={idx}
                    />
                {/each}
            {/if}
        </div>
        <nav>
            <div class="link">
                <div class="arrow">
                    <div class="arrow-1" />
                    </div>
                    <a href="/about">
                        About
                    </a>
                </div>
                <div class="link">
                    <div class="arrow">
                        <div class="arrow-1" />
                    </div>
                    <a href="/articles?page=1">
                        Articles
                    </a>
                </div>
                <div class="link">
                    <div class="arrow">
                        <div class="arrow-1" />
                    </div>
                    <a href="/contact">
                        Contact
                    </a>
                </div>
            </nav>
        </header>
        <div class="content">
            <Slides data={data} width={width} height={height} />
            {#if width <= 600 && height > 320}
                <div class="slide-show">
                    <a class="slide-card-wrapper" href={`articles/${data.result.slide[$selectedSlide].slug}`}>
                        <div class="slide-card-header">
                            <h1>
                                {data.result.slide[$selectedSlide].title}
                            </h1>
                        </div>
                        <a href={`articles/${data.result.slide[$selectedSlide].slug}`} class="read-more">
                            <p>
                                view article
                            </p>
                        </a>
                        <div
                            class="slide-card" 
                        >
                            <div 
                            class="slide-details" 
                            style="
                                    background-image: url({data.result.slide[$selectedSlide].image});
                                "
                            />
                        </div>
                    </a>
                </div>
                <div class="slide-nav">
                    {#each data.result.slide as article, idx}
                        <div 
                            class={$selectedSlide === idx ? 'slide-nav-item selected' : 'slide-nav-item'} 
                            style="background-image: url({article.image});"
                            on:click={() => {
                                selectedSlide.set(idx)
                            }} 
                            on:keydown
                            role="menuitem"
                            tabindex={idx}
                        />
                    {/each}
                </div>
            {:else if width > 600 && height > 655}
                <div class="slide-show">
                    <a class="slide-card-wrapper" href={`articles/${data.result.slide[$selectedSlide].slug}`}>
                        <a class="slide-card-header" href={`articles/${data.result.slide[$selectedSlide].slug}`}>
                            <h1>
                                {data.result.slide[$selectedSlide].title}
                            </h1>
                            <div style:display="flex" style:width={'100%'}>
                                <div class="slide-details-wrapper">
                                    <div class="two">
                                        {#if data.result.slide[$selectedSlide].synopsis.length > 300}
                                        <p>
                                            {data.result.slide[$selectedSlide].synopsis.slice(0, data.result.slide[$selectedSlide].synopsis.slice(0, 300).lastIndexOf(" ")) + " [... continued]"}
                                        </p>
                                        {:else}
                                        <p>
                                            {data.result.slide[$selectedSlide].synopsis}
                                        </p>
                                        {/if}
                                        <a class="read-more" href={`articles/${data.result.slide[$selectedSlide].slug}`}>
                                            READ MORE
                                        </a>
                                    </div>
                                    <div class="meta">
                                        <p style:text-align="left">
                                            {data.result.slide[$selectedSlide].slug}
                                        </p>
                                        <p>
                                            {data.result.slide[$selectedSlide].createdAt}
                                        </p>
                                        <p>
                                            {data.result.slide[$selectedSlide].categories}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {#if width > 1024}
                                <div class="decal-1" />
                                <div class="decal-2" />
                                <div class="decal-3" />
                                <div class="decal-4" />
                                <div class="decal-5" />
                            {/if}
                        </a>
                        <div class="arrow">
                            <div class="arrow-1" />
                        </div>
                        <div 
                            class="slide-card" 
                        >
                            <div 
                                class="slide-details" 
                                style="
                                background: url({data.result.slide[$selectedSlide].image});
                                "
                            >

                            </div>
                        </div>
                    </a>
                    {#if width > 1024}
                        <div class="slide-nav">
                            {#each data.result.slide as article, idx}
                                <div 
                                    class={$selectedSlide === idx ? 'slide-nav-item selected' : 'slide-nav-item'} 
                                    style="background-image: url({article.image});"
                                    on:click={() => {
                                        selectedSlide.set(idx)
                                    }} 
                                    on:keydown
                                    role="menuitem"
                                    tabindex={idx}
                                />
                            {/each}
                    </div>
                    {/if}
                </div>
            {:else if height < 655 && width <= 1024}
                <div class="slide-show">
                    <a class="slide-card-wrapper" href={`articles/${data.result.slide[$selectedSlide].slug}`}>
                        <div class="slide-card-header">
                            <h1>
                                {data.result.slide[$selectedSlide].title}
                            </h1>
                        </div>
                        <a href={`articles/${data.result.slide[$selectedSlide].slug}`} class="read-more">
                            <p>
                                view article
                            </p>
                        </a>
                        <div
                            class="slide-card" 
                        >
                            <div 
                            class="slide-details" 
                            style="
                                    background-image: url({data.result.slide[$selectedSlide].image});
                                "
                            />
                        </div>
                    </a>
                </div>
                {#if width > 1024}
                    <div class="slide-nav">
                        {#each data.result.slide as article, idx}
                            <div 
                                class={$selectedSlide === idx ? 'slide-nav-item selected' : 'slide-nav-item'} 
                                style="background-image: url({article.image});"
                                on:click={() => {
                                    selectedSlide.set(idx)
                                }} 
                                on:keydown
                                role="menuitem"
                                tabindex={idx}
                            />
                        {/each}
                    </div>   
                {/if}
            {/if}
        </div>
    </div>
{/if}
<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Julius+Sans+One&display=swap');

    @keyframes arrow-landing {
        0% {
            margin-left: -50px;
        } 100% {
            margin-left: -10px;
        } 
    }

    @keyframes bounce {
        0% {
            transform: translateY(0px);
        } 80% {
            transform: translateY(20px);
        } 100% {
            transform: translateY(0px);
        } 
    }

    @keyframes load {
        0% {
            opacity: 0%;
        } 100% {
            opacity: 38.1%;
        }
    }

    @keyframes load-in {
        0% {
            transform: translate(0px, 100%)
        } 100% {
            transform: translate(0px, 0px)
        }
    }

    @keyframes load-in-side {
        0% {
            opacity: 0;
            transform: translate(100%)
        } 75% {
            opacity: 0;
            transform: translate(100%)
        } 100% {
            opacity: 1;
            transform: translate(0%)
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        } 100% {
            opacity: 1;
        }
    }

    .slide-card-wrapper {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 48px;
        right: 12px;
        width: 38.1%;
        min-width: 620px;
        min-height: 380px;
        height: 50%;
        z-index: 9;
        max-height: 730px;
    }

    .slide-details-wrapper {
        animation-name: load-in;
        animation-duration: .75s;
        animation-iteration-count: 1;
        display: flex;
        flex-direction: row;
        min-width: 620px;
        min-height: 380px;
        width: 50%;
        z-index: 10;
    }

    .slide-card {
        animation-name: load-in;
        animation-duration: .75s;
        animation-iteration-count: 1;
        mix-blend-mode: color;
        background-color: rgba(255, 255, 255, 0.649);
        min-height: 380px;
        opacity: .381;
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 48px;
        right: 12px;
        width: 38.1%;
        min-width: 620px;
        height: 50%;
        z-index: 2;
        border-left: 1px solid rgb(0, 0, 0);
        border-top: 4px solid rgb(0, 0, 0);
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 50px 100%, 0% calc(100% - 50px));
        max-height: 730px;
    }

    .slide-card-header {
        animation-name: load-in;
        animation-duration: .75s;
        animation-iteration-count: 1;
        display: flex;
        flex-direction: column;
        align-content: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 50px 100%, 0% calc(100% - 50px));
    }

    .slide-card-wrapper:hover .slide-card {
        border-left: 1px solid rgb(255, 0, 0);
        border-top: 4px solid rgb(255, 0, 0);
    }

    .slide-card-wrapper:hover .slide-card-header h1 {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 0, 0, 0.618);
        border-left: 4px solid rgba(255, 255, 255, 1);
    }

    .slide-card-wrapper:hover .arrow-1 {
        animation-name: arrow-landing;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0, 0, 0, 0);
        animation-delay: 0s;
        animation-duration: .618s;
        opacity: 1;
        z-index: 3;
    }

    .slide-card-wrapper:hover .read-more {
        color: white;
        background: rgba(255, 0, 0, 0.618);
    }

    .slide-card-wrapper:hover .two {
        background-color: rgba(255, 255, 255, .618);
    }

    .slide-card-wrapper:hover .two p {
        color: red;
    }

    .slide-card-wrapper:hover .decal-3 {
        background-color: rgb(248, 223, 223);
        filter: drop-shadow(0px 0px 2px rgb(248, 223, 223));
    }
    
    .slide-card-wrapper h1 {
        color: #555;
        font-family: monospace;
        text-align: left;
        font-variant: all-small-caps;
        letter-spacing: 1px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 10;
        margin: 10px;
        margin-right: 40px;
        min-height: 110px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 4px;
        background: rgba(255, 255, 255, 0.381);
        border-left: 4px solid rgba(255, 255, 255, 0.25);
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0% 100%);
        z-index: 999;
    }

    .slide-nav-item {
        background-position: center;
        background-size: cover;
        height: 32px;
        width: 76px;
        filter: contrast(50%) brightness(125%);
        transition: .1s;
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .slide-nav-item:hover {
        transform: translate(-14px);
        z-index: 2;
        cursor: pointer;
    }

    .slide-nav-item.selected {
        scale: 1.75;
        transform: translate(-30px);
        z-index: 9;
        filter: contrast(70%) brightness(150%);
        outline: 1px solid white;
    }
    
    .slide-nav {
        animation-name: load-in-side;
        animation-duration: 1s;
        animation-iteration-count: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: fixed;
        bottom: 0px;
        right: 4px;
        width: 96px;
        margin-bottom: 75px;
        height: 250px;
        max-height: 730px;
        z-index: 30;
    }

    .read-more {
        mix-blend-mode: normal;
        width: 120px;
        font-size: 1.2rem;
        color: rgb(255, 255, 255);
        padding-bottom: 8px;
        text-decoration: underline;
        text-underline-offset: 4px;
        letter-spacing: 1px;
        font-family: monospace;
        font-weight: 700;
        text-decoration-thickness: 4px;
        text-align: center;
        font-variant: all-small-caps;
        background: rgb(255, 128, 0);
        z-index: 10;
    }

    .slide-details {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        justify-content: space-between;
        background-position: center !important;
        background-size: cover !important;
        mix-blend-mode:darken;
        filter: contrast(200%) blur(2px) saturate(200%);
    }
    

    .two {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 61.8%;
        min-width: 200px;
        min-height: 180px;
        height: fit-content;
        font-weight: 700;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        text-align: left;
        letter-spacing: 2px;
        font-size: 1rem;
        margin: 20px;
        padding: 24px;
        padding-bottom: 12px;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.618);
     }
    
    .two p {
        color: white;
        font-weight: 700;
        margin: 0;
        padding: 0;
        padding-bottom: 12px;
    }

    .meta {
        bottom: 0px;
        right: 50px;
        color: black;
        height: 350px;
        width: 60px;
        font-weight: 400;
        font-family: monospace;
        font-variant-caps: all-petite-caps;
        text-align: left;
        letter-spacing: 2px;
        font-size: .5rem;
        margin-top: 10px;
        z-index: 1;
        word-wrap: break-word;
    }

    .decal-5 {
        animation-name: lines;
        animation-duration: 10s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        width: 100%;
        height: 1px;
        background-color: rgb(223, 238, 248);
    }

    .decal-4 {
        animation-name: lines;
        animation-duration: 2s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        width: 100%;
        height: 1px;
        background-color: rgb(223, 238, 248);
    }
    
    .decal-3 {
        position: absolute;
        margin: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation-name: lines-down;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        width: 100vw;
        height: 100px;
        background-color: rgb(242, 223, 248);
        filter: drop-shadow(0px 0px 2px rgb(242, 223, 248));
        z-index: 9;
    }

    .decal-2 {
        position: fixed;
        animation-name: lines-2;
        animation-duration: 10s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        width: 1px;
        height: 1000px;
        background-color: rgb(223, 238, 248);
    }

    .decal-1 {
        position: fixed;
        animation-name: lines-2;
        animation-duration: 10s;
        animation-delay: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        width: 1px;
        height: 1000px;
        background-color: rgb(223, 238, 248);
    }

    @keyframes lines {
        0% {
            transform: translate(0%, -500px)
        } 90% {
            transform: scaleY(1);
        } 100% {
            transform: translate(0%, 200px) scaleY(0)
        } 
    }

    @keyframes lines-down {
        0% {
            transform: translate(-50%, -500px)
        } 50% {
            transform: translate(-50%, 500px)
        } 100% {
            transform: translate(-50%, 500px)
        }
    }

    @keyframes lines-2 {
        0% {
            transform: translate(100vw, 0%) scale(1);
        } 100% {
            transform: translate(-10px, 0%) scale(1);
        } 
    }

    @keyframes slide {
        0% {
            transform: translate(-100%, 0%) scale(1);
        } 100% {
            transform: translate(100%, 0%) scale(1);
        } 
    }

    @keyframes slide-2 {
        0% {
            transform: translate(-45%, 0%) scale(1);
        } 100% {
            transform: translate(0%, 0%) scale(1);
        } 
    }

    @keyframes slide-3 {
        0% {
            transform: translate(-10%, 0%)
        } 100% {
            transform: translate(0%, 0%)
        } 
    }

    @keyframes slide-4 {
        0% {
            transform: translate(5%, 0%)
        } 100% {
            transform: translate(0%, 0%)
        } 
    }

    @keyframes slide-5 {
        0% {
            transform: translate(-50%, 0%) scale(1);
            transform: scale(1);
        } 100% {
            transform: translate(50%, 20%) scale(1);
        } 
    }  
    
    .container {
        height: 100%;
        animation: fade-in 2s;
        display: flex;
        flex-direction: column;
        background: linear-gradient(to left, gainsboro, white);
        background-size: cover;
        background-blend-mode: screen;
        overflow: hidden;
    }
    
    .container header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .info {
        width: 40%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        z-index: 0;
    }
    
    .info .name {
        flex: 100%;
        width: 100%;
        justify-content: center;
        font-family: 'Bebas Neue';
        letter-spacing: -1px;
        display: flex;
        flex-direction: row;
        margin-block-end: -40px;
        pointer-events: none;
    }
    
    .info .name .first {
        font-size: 6rem;
        font-weight: 100;
        color: #555;
        display: flex;
        flex-direction: row;
        padding-right: 20px;
        margin-bottom: 0;
    }
    
    .info .name .last {
        font-size: 6rem;
        font-weight: 700;
        color: rgb(24, 151, 115);
        color: rgb(24, 110, 151);
        display: flex;
        flex-direction: row;
        margin-bottom: 0;
        padding-left: 20px;
    }
    
    .info .specialty {
        color: rgb(117, 207, 181);
        color: rgb(24, 110, 151);
        font-size: 1.1rem;
        font-weight: 400;
        letter-spacing: 4px;
        font-variant-caps: all-small-caps;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    header nav {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 38.1%;
        margin: 0;
        margin-top: 80px;
        padding-right: 20px;
        z-index: 2;
        filter: drop-shadow(0px 0px 4px rgb(177, 177, 177));
    }

    header nav a {
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 10px;
        padding-bottom: 12px;
        min-width: 120px;
        color: rgb(255, 255, 255);
        text-decoration: none;
        font-variant-caps: all-small-caps;
        font-weight: 400;
        font-size: 1rem;
        background-color: rgb(117, 207, 182);
        background-color: rgb(24, 110, 151);
        clip-path: polygon(0 10.00px,10.00px 0,100% 0,100% calc(100% - 10.00px),calc(100% - 10.00px) 100%,0 100%);
        pointer-events: all;
    }

    header nav a:hover {
        background-color: rgb(255, 138, 138);
    }

    nav .link:hover .arrow {
        pointer-events: none;
    }


    nav .link:hover .arrow-1 {
        animation-name: arrow-landing;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0, 0, 0, 0);
        animation-delay: 0s;
        animation-duration: .618s;
        opacity: 1;
        z-index: 3;
    }

    .link {
        height: fit-content;
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 24px;
    }
    
    .arrow {
        position: fixed;
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: flex-start;
        align-items: center;
        align-content: space-between;
        pointer-events: none;
        z-index: 3;
    }

    .arrow-1 {
        width: 50px;
        height: 50px;
        opacity: 0%;
        border-top: 1px solid red;
        border-left: 1px solid red;
        background-color: red;
        transform: rotate(90deg);
        clip-path: polygon(50% 50%, 0% 100%, 100% 100%);
        z-index: 3;
        display: block;
    }

    .container .content {
        display: flex;
        flex-direction: row;
        height: var(--landing-height);
    }

   

    @media only screen and (max-width: 1366px) {
        header {
            flex-direction: column;
        }
        
        header .info {
            width: auto;
            justify-content: center;
        }

        header nav {
            padding: 0;
            width: auto;
            margin-top: 0;
        }

        header nav {
            padding: 0;
            width: auto;
        }
    }
    
    @media only screen and (max-width: 1024px) {
        .container .content {
            height: 61.8%;
        }

        header {
            flex-direction: row-reverse;
            height: 30.823%;
            padding-top: 7.277%;
        }
        
        header nav {
            height: auto;
            width: 38.1%;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        header .info {
            width: 61.8%;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-block-end: 0px;
            z-index: 2;
        }

        .info .name {
            justify-content: flex-start;
            align-items: center;
            padding-bottom: 10px;
        }

        .info .specialty {
            height: fit-content;
            font-size: .9rem;
            text-align: left;
        }

        .info .name .first {
            font-size: 4rem;
            margin: 0;
        }

        .info .name .last {
            font-size: 4rem;
            margin: 0;    
        }

        .slide-card-wrapper {
            justify-content: flex-end;
            width: calc(100%);
            height: 100%;
            bottom: 0;
            height: 61.8%;
            width: 95%;
            bottom: 0;
            z-index: auto;
        }

        .slide-card-header {
            width: 95%;
            height: 61.8%;
            position: fixed;
            z-index: 9;
            mix-blend-mode: normal;
            bottom: 0;
            right: 12px;
            justify-content: flex-start;
        }

        .slide-details-wrapper {
            width: 61.8%;
        }

        .arrow {
            margin-right: -35px;
            z-index: 9;
        }

        .two {
            width: auto;
        }

        .slide-card-header h1 {
            width: 90%;
            font-size: 1.25rem;
            justify-content: center;
            align-content: center;
        }

        .slide-card {
            height: 61.8%;
            width: 95%;
            bottom: 0;
            max-height: none;
        }

        .slide-show {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: center
        }

        .slide-card-wrapper {
            flex-direction: row;
            position: relative;
            width: 100%;
            height: auto;
            padding-right: 20px;
            bottom: 0;
            right: 0;
            max-height: none;
        }

        .slide-nav {
            display: flex;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            width: 100%;
            height: auto;
            margin-bottom: 0px;
            right: none;
        }

        .slide-nav-item {
            min-height: 50px;
            width: 32%;
            opacity: .381;
            transition: 0s;
            border: 2px solid white;
            transition: .25s;
        }

        .slide-nav-item:hover {
            transform: none;
            opacity: 1;
            cursor: pointer;
        }

        .slide-nav-item.selected {
            scale: 1;
            transform: none;
            z-index: 9;
            outline: none;
            opacity: 1;
            transition: 0s;
        }
    }

    @media only screen and (max-width: 1024px) and (max-height: 900px) {
        header {
            flex-direction: row-reverse;
            padding: 0;
        }
        
        .slide-nav {
            top: 0px;
            bottom: none;
        }

        .slide-card .slide-details {
            height: 100%;
            width: 100%;
            clip-path: none;
            background-image: none;
        }

        header {
            transition: .5s;
        }

    }
    
    @media only screen and (max-width: 750px) {
        header nav {
            flex-direction: column;
        }

        .info .name .first {
            font-size: 4rem;
        }

        .info .name .last {
            font-size: 4rem;
        }
    }
    
    @media only screen and (max-width: 640px) {
        .slide-card {
            min-height: auto;
            min-width: auto;
        }

        .slide-nav-item {
            width: 30%;
            margin: 2px;
            opacity: .9;
        }
    }

    @media only screen and (max-width: 600px) {
        .slide-card-wrapper {
            pointer-events: none;
        }

        .slide-card-wrapper:hover .slide-card-header * {
            transition: .25s;
        }
        
        .container {
            align-items: center;
        }

        .container header {
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            width: 100%;
            height: 100%;
            z-index: 5;
            background: linear-gradient(rgba(255, 255, 255, 1), transparent);
            filter: drop-shadow(0px 0px 30px rgb(255, 255, 255));

        }

        .container .content {
            width: 100%;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center
        }

        header .info {
            width: 100%;
            align-items: center;
        }

        header nav {
            width: 100%;
            flex-direction: row;
            justify-content: space-evenly;
        }

        .info .name {
            justify-content: center;
        }

        .info .specialty {
            text-align: center;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .link {
            margin: 2px;
        }

        .link a {
            min-width: 70px;
        }
        
        .slide-show {
            max-height: 200px;
        }

        .slide-nav {
            justify-content: space-around;
        }

        .slide-card-wrapper {
            min-height: 0px;
            max-height: 200px;
            width: 95%;
            min-width: auto;
            padding: 0;
        }

        .slide-card-wrapper a {
            height: 100%;
            margin-top: 0;
        }

        .slide-card-header {
            justify-content: center;
        }
        
        .slide-card-header h1 {
            font-size: 1.25rem;
            width: 80%;
            padding-left: 10px;
            padding-right: 10px;
            margin: 0;
            background-color: aliceblue;
            border-left: none;
        }

        .slide-card-wrapper:hover .slide-card-header h1 {
            border-left: none;
        }

        .slide-card-wrapper:hover .slide-card-header .read-more {
            color: rgba(255, 0, 0, 0.618);
            background-color: white;
        }
        
        .slide-card-header {
            height: fit-content;
            right: auto;
            width: 100%;
            position: relative;
            height: auto;
            align-items: center;
            filter: drop-shadow(0px 0px 15px rgb(81, 81, 81));
            clip-path: none;
            z-index: 1;
        }

        .slide-card-wrapper:hover .slide-card {
            border-left: none;
            border-top: none;
        }

        .slide-card {
            width: 100%;
            height: 100%;
            right: 0px;
            border-left: none;
            border-top: none;
            clip-path: none;
        }

        .slide-card-wrapper:hover * {
            border-top: none;
        }

        .read-more {
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 1rem;
            text-decoration: none;
            margin-top: 38px;
            height: fit-content;
            width: fit-content;
            min-height: 72px;
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 4px;
            background-color: rgba(0, 0, 0, 0.275);
            filter: drop-shadow(0px 0px 10px rgb(0, 0, 0));
            pointer-events: all;
        }

        .slide-card-wrapper:hover .read-more {
            color: rgb(255, 255, 255);
            filter: none;
            background-color: rgba(255, 0, 0, 0.381);
        }

        .read-more p {
            padding: 0;
            margin: 0;
        }

        .slide-nav {
            right: auto;
            width: 90%;
            padding-top: 5%;
            padding-bottom: 5%;
            min-width: 300px;
        }

        .slide-nav-item {
            transition: .25s;
            min-height: 20px;
        }

        .slide-nav-item.selected {
            transition: .1s;
            filter: contrast(70%) brightness(150%) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.0));
        }
    }

    @media only screen and (max-height: 710px) and (min-width: 1024px) {
        .slide-card-wrapper {
            bottom: 0px;
        }

        .slide-card {
            bottom: 0px;
        }
    }

    @media only screen and (max-height: 710px) and (max-width: 1024px) and (min-width: 600px) {
        .container header {
            align-items: flex-start;
            height: 61.8%;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 1), transparent);
            z-index: 10;
        }

        header nav {
            padding-top: 12px;
            margin: 0;
        }

        .container {
            justify-content: space-between;
        }

        .slide-card-wrapper:hover .slide-card-header * {
            transition: .25s;
        }

        .info .first {
            margin: 0;
        }

        .info .last {
            margin: 0;
        }

        .link {
            margin: 12px;
        }

        .container .content {
            width: 100%;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            height: 38.1%;
        }

        .slide-show {
            align-items: flex-end;
            width: 61.8%;
        }

        .slide-nav-item {
            min-height: 0px;
        }

        .slide-card-wrapper:hover .slide-card-header h1 {
            border-left: none;
        }

        .slide-card-wrapper:hover .slide-card-header .read-more {
            color: rgba(255, 0, 0, 0.618);
            background-color: white;
        }

        .slide-card-wrapper a {
            height: 100%;
            margin-top: 0;
        }

        .slide-card-header {
            height: fit-content;
            right: auto;
            width: 100%;
            position: relative;
            height: auto;
            align-items: center;
            filter: drop-shadow(0px 0px 15px rgb(81, 81, 81));
            clip-path: none;
            z-index: 1;
        }

        .slide-card-wrapper:hover .slide-card {
            border-left: none;
            border-top: none;
        }

        .slide-card {
            height: 100%;
            width: 100%;
            bottom: 0px;
            border-left: none;
            border-top: none;
            clip-path: none;
            /* filter: saturate(2) */
        }

        .slide-card-wrapper:hover * {
            border-top: none;
        }

        .read-more {
            font-size: 1rem;
            text-decoration: none;
            margin-top: 38px;
            height: fit-content;
            width: fit-content;
            min-height: 72px;
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 4px;
            background-color: rgba(0, 0, 0, 0.275);
            filter: drop-shadow(0px 0px 10px rgb(0, 0, 0));
            pointer-events: all;
        }

        .slide-card-wrapper:hover .read-more {
            color: red;
            mix-blend-mode: color;
            filter: none;
            background-color: rgba(255, 0, 0, 0.618);
        }

        .slide-card-wrapper:hover .slide-card-header * {
            transition: .25s;
        }

        .slide-card-wrapper {
            display: flex;
            align-items: center;
            width: 38.1%;
            bottom: 0px;
            min-width: 620px;
            min-height: unset;
            height: 100%;
            z-index: 9;
            position: relative;
            right: unset;
            bottom: unset;
            pointer-events: none;
        }

        .slide-card-header h1 {
            font-size: 1.25rem;
            width: 80%;
            padding-left: 10px;
            padding-right: 10px;
            margin: 0;
            background-color: aliceblue;
            border-left: none;
        }

        .slide-card-wrapper:hover .slide-card-header h1 {
            border-left: none;
        }

        .slide-card-wrapper:hover .slide-card-header .read-more {
            color: rgba(255, 0, 0, 0.618);
            background-color: white;
        }

        .slide-card-header {
            height: fit-content;
            right: auto;
            width: 100%;
            position: relative;
            height: auto;
            align-items: center;
            filter: drop-shadow(0px 0px 15px rgb(81, 81, 81));
            clip-path: none;
            z-index: 1;
        }

        .slide-card-wrapper:hover .slide-card {
            border-left: none;
            border-top: none;
        }

        .slide-details {
            filter: contrast(200%) blur(4px) saturate(200%);;
        }

        .slide-card-wrapper:hover * {
            border-top: none;
        }

        .read-more {
            display: flex;
            align-items: center;
        }

        .read-more p {
            padding: 0;
            margin: 0;
        }
    }

    @media only screen and (max-height: 370px) and (max-width: 1024px) {
        .slide-card-header h1 {
            font-size: 1rem;
            min-height: 70px;
            height: 70px;
        }
    }

    @media only screen and (max-height: 310px) and (max-width: 600px) {
        .slide-card-wrapper {
            padding-right: 0;
        }

        .read-more {
            padding: 0
        }
    }

    @media only screen and (max-width: 320px) {
        .container {
            background: linear-gradient(45deg, #555, #ffffff);
        }

        .slide-show {
            display: none;
        }

        .slide-nav {
            display: none;
        }

        .container .content {
            display: none;
        }

        header nav {
            flex-direction: column;
            justify-content: space-evenly;
            filter: drop-shadow(0px 0px 1px white);
        }

        header .link {
            width: 61.8%;
            margin: 16px;
            filter: none;
        }

        .info .name .first {
            padding: 0;
        }

        .info .name .last {
            padding: 0;
        }
    }

    @media only screen and (max-height: 500px) and (max-width: 500px) {
        .container {
            background: linear-gradient(45deg, #555, #ffffff);
        }

        .slide-show {
            display: none;
        }

        .slide-nav {
            display: none;
        }

        .container .content {
            display: none;
        }

        header nav {
            flex-direction: column;
            justify-content: space-evenly;
            filter: drop-shadow(0px 0px 1px white);
        }

        header .link {
            width: 61.8%;
            margin: 16px;
            filter: none;
        }

        .info .name .first {
            padding: 0;
        }

        .info .name .last {
            padding: 0;
        }
    }

    @media only screen and (max-height: 310px) {
        .container {
            background: linear-gradient(45deg, #555, #ffffff);
        }
        
        .container header {
            height: 100%;
        }

        .container .content {
            display: none;
        }

        header nav {
            height: 100%;
            justify-content: space-evenly;
        }

        .slide-card-wrapper {
            padding-right: 0;
        }

        .read-more {
            padding: 0
        }

        .slide-show {
            display: none;
        }
    }

</style>
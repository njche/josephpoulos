<script lang="ts">
    import '$lib/styles/blogIndex.css'
    let width: number
    let active: boolean = false
    const handleClick = () => {
        active = !active
    }
</script>
{#if width <= 600}
    <nav>
        <div class={active ? 'drop-down active' : 'drop-down'}>
            <div class="close-container" on:keydown on:click={handleClick}>
                <div class="close" />
            </div>
            <div class="link" style:transition-delay={'.1s'}>
                <div class="arrow">
                    <div class="arrow-1" />
                </div>
                <a href="/about" on:click={handleClick}>
                    About
                </a>
            </div>
            <div class="link" style:transition-delay={'.15s'}>
                <div class="arrow">
                    <div class="arrow-1" />
                </div>
                <a href="/articles?page=1" on:click={handleClick}>
                    Articles
                </a>
            </div>
            <div class="link" style:transition-delay={'.2s'}>
                <div class="arrow">
                    <div class="arrow-1" />
                </div>
                <a href="/contact" on:click={handleClick}>
                    Contact
                </a>
            </div>
        </div>
    </nav>
{/if}
<div class="header">
    <a href="/">
        <div class="info">
            <div class="name">
                <h1 class="first">
                    Joseph
                </h1>
                <h1 class="last">
                    Poulos
                </h1>
            </div>    
        </div>
    </a>
    <nav>
        {#if width <= 600}
            <div 
                role="menu"
                tabindex="0"
                class="hamburger" 
                on:keydown 
                on:click={() => {
                    active = !active
                    console.log(active)
                }}
            >
                <p>
                    site navigation
                </p>
                <div 
                    class={active ? 'triangle active' : 'triangle'}
                />
            </div>
        {:else}
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
        {/if}
    </nav>
</div>

<svelte:window bind:innerWidth={width} />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Julius+Sans+One&display=swap');

    .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: sticky;
        top: 0;
        align-self: center;
        width: 100vw;
        z-index: 8;
        height: 80px;
        background: linear-gradient(to left, gainsboro, white);
        border-bottom: 1px solid gainsboro;
        padding-left: 20px;
        padding-right: 20px;
        overflow: hidden;
        scrollbar-gutter: stable;
        filter: drop-shadow(0px 1px 3px gainsboro);
    }
    
    .header a {
        text-decoration: none;
    }

    .info {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        z-index: 0;
    }
    
    .info .name {
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
        font-weight: 100;
        color: #555;
        display: flex;
        flex-direction: row;
        margin-bottom: 0;
    }
    
    .info .name .last {
        font-weight: 700;
        color: rgb(24, 110, 151);
        display: flex;
        flex-direction: row;
        margin-bottom: 0;
        padding-left: 10px;
    }
    
    .header nav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 61.8%;
        margin: auto 0;
        z-index: 2;
    }

    nav a {
        display: block;
        text-align: center;
        width: 120px;
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
        background-color: rgb(24, 110, 151);
        clip-path: polygon(0 10.00px,10.00px 0,100% 0,100% calc(100% - 10.00px),calc(100% - 10.00px) 100%,0 100%);
        pointer-events: all;
    }

    nav a:hover {
        background-color: rgb(255, 138, 138);
    }

    nav .link:hover .arrow {
        pointer-events: none;
    }


    nav .link:hover .arrow-1 {
        animation-name: arrow-landing;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0, 0, 0, 0);
        animation-duration: .618s;
        opacity: 1;
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
        z-index: 9;
    }

    .arrow-1 {
        display: block;
        width: 50px;
        height: 50px;
        opacity: 0;
        border-top: 1px solid red;
        border-left: 1px solid red;
        transform: rotate(90deg);
        clip-path: polygon(50% 50%, 0% 100%, 100% 100%);
        z-index: 9;
    }

    @keyframes arrow-landing {
        0% {
            margin-left: -50px;
        } 100% {
            margin-left: -10px;
        } 
    }

    @media only screen and (max-width: 900px) {
        .link a {
            margin: 2px;
        }

        .link a {
            width: 60px;
            min-width: 90px;
        }
    }

    @media only screen and (max-width: 600px) {
        .header {
            overflow-y: visible;
        }

        .header nav {
            justify-content: flex-end;
        }

        nav .hamburger {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            cursor: pointer;
            user-select: none;
        }

        nav .hamburger p {
            color: #777;
            font-size: 1.2rem;
            font-variant: small-caps;
            font-family: monospace;
            margin: 0;
        }

        .hamburger .triangle {
            width: 8px;
            height: 8px;
            background-color: #777;
            clip-path: polygon(0 0, 100% 0, 100% 100%);
            transition: .2s;
        }

        .hamburger .triangle.active {
            width: 8px;
            height: 8px;
            background-color: #777;
            clip-path: polygon(100% 0, 0% 100%, 100% 100%);
            transition: .2s;
        }

        .drop-down {
            position: fixed;
            top: 66px;
            right: 0px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-end;
            transition: .2s;
            transform: translateX(500px);
            z-index: 9;
            padding-right: 10px;
            padding-left: 10px;
            padding-top: 10px;
        }

        .drop-down.active {
            transform: translateX(0px);
        }

        .drop-down .link {
            transition-duration: .2s;
            transform: translateX(500px);
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .drop-down.active .link {
            transition-duration: .2s;
            transform: translateX(0px);
        }

        .drop-down a {
            display: block;
            text-align: center;
            width: 120px;
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
            border-left: 4px solid rgba(255, 255, 255, 0.618);
            border-bottom: 2px solid rgba(255, 255, 255, 0.381);
            clip-path: polygon(0 10.00px,10.00px 0,100% 0,100% calc(100% - 10.00px),calc(100% - 10.00px) 100%,0 100%);
            pointer-events: all;
            backdrop-filter: blur(20px) brightness(80%);
        }

        .drop-down .link:hover a {
            background-color: rgb(255, 138, 138);
            backdrop-filter: blur(20px) brightness(100%);
        }

        .drop-down .close-container {
            position: fixed;
            top: -11px;
            left: -11px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.381);
            background-color: rgba(220, 220, 220, 0.381);
        }

        .drop-down .close {
            position: fixed;
            top: -6px;
            left: -6px;
            width: 12px;
            height: 12px;
            background-color: #ff0000;
            filter: drop-shadow(0px 0px 4px red);
            clip-path: polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%);
        }
        
    }

    @media only screen and (max-width: 450px) {
        .header {
            flex-wrap: nowrap;
        }

        .drop-down {
            top: 86px;
        }
    }

    @media only screen and (max-width: 305px) {
        .header {
            padding-right: 0px;
            padding-left: 5px;
        }
    }
</style>
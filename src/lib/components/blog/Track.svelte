<script lang="ts">
    export let scale: number
    export let maxHeight: number
    let newLocation = 0
    let active: boolean
    let height: number
</script>

<svelte:window bind:scrollY={newLocation} bind:innerHeight={height} />
<div
    role="menubar"
    tabindex="-1"
    class="track-container"
    on:mousedown={() => {
        active = true
    }}
    on:mouseup={() => {
        active = false
    }}
    on:mouseleave={() => {
        active = false
    }}
    on:mousemove={(e) => {
        if (active) {
            if (e.movementY > 0) {
                newLocation += e.clientY * .05
                if (newLocation + e.clientY * .05 > ((maxHeight + 130) - height)) {
                    newLocation = (maxHeight + 130) - height
                }
            }

            if (e.movementY < 0) {
                newLocation -= e.clientY * .05
                if (newLocation - e.clientY * .05 < 0) {
                    newLocation = 0
                }
            } 
        }
    }}
>
    <div class="view" style:scale={scale} style:height={height}>
        <div class="sight" style:--height='{height - 78}px'>
            <h1>
                {#if Math.round(newLocation / ((maxHeight + 130) - height) * 100) > 100}
                    100%
                {:else if Math.round(newLocation / ((maxHeight + 130) - height) * 100) < 0}
                    0%
                {:else}
                    {Math.round(newLocation / ((maxHeight + 130) - height) * 100)}%
                {/if}
            </h1>
        </div>
    </div>

    <div 
        class="track" 
        style:scale={scale}  
        style:height='{height - 74}px' 
        style:transform='translate(0, -{newLocation > (maxHeight + 130) - height ? (maxHeight + 130) - height : newLocation}px)'
    >
        <slot />
    </div>
</div>

<style>

    .track-container {
        position: fixed;
        width: 100%;
        height: 100%;
        cursor: grab;
        overflow: hidden;
    }

    .track-container:active {
        cursor: grabbing;
    }

    .view {
        padding: var(--height);
        position: absolute;
        top: 0;
        margin-left: -3.6470075%;
        height: var(--height);
        width: 38.19601%;
        z-index: 2;
    }

    .sight {
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -25px;
        margin-right: -25px;
        background: rgba(255, 255, 255, 0.381);
        border: 1px solid black;
        height: var(--height);
        filter: drop-shadow(0px 0px 25px white);
        z-index: 3;
        border-radius: 25px;
        user-select: none;
    }

    .sight h1 {
        position: fixed;
        font-size: 6rem;
    }

    .track {
        margin-left: -3.6470075%;
        position: absolute;
        top: 0;
        width: 38.19601%;
        padding: 0;
        z-index: 1;
        pointer-events: none;
    }
</style>
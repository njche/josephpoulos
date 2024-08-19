<script>
    export let data
</script>

<div class="recent">
    <h3>
        recent articles
    </h3>
    {#each data as card}
        <div class="card-container">
            <a href="{card.slug}">
            <div 
                class="card"
                id="card" 
                style="background-image: url({card.image});" 
            >
                <div class="squares">
                    <div class="square-1" />
                    <div class="square-2" />
                </div>
                <div class="card-title">
                    <h2>
                        {card.title}
                    </h2>
                </div>
                <div class="card-synopsis">
                    {#if card.synopsis.length > 200}
                        <em>
                            {card.synopsis.slice(0, card.synopsis.slice(0, 200).lastIndexOf(" ")) + " ..."}
                        </em>
                    {:else}
                        <em>
                            {card.synopsis}
                        </em>
                    {/if}
                    <em class="read-more">
                        read more
                    </em>    
                </div>
                <div class="squares" style="transform: scaleY(-1);">
                    <div class="square-1" />
                    <div class="square-2" style="margin-right: -11px;" />
                </div>
            </div>
            <div class="card-date">
                {card.date}
            </div>
        </a>
        </div>
    {/each}
</div>


<style>
    .recent {
        width: 80%;
        min-width: 324px;
        border-top: 1px solid gainsboro;
        border-right: 1px solid gainsboro;
        padding-bottom: 15px;
        margin-left: -1px;
    }

    .recent a {
        text-decoration: none;
    }

    .recent h3 {
        margin-top: 40px;
        margin-bottom: 40px;
        width: fit-content;
        color: #7e7e7e;
        letter-spacing: 4px;
        padding: 0;
        padding-left: 10px;
        padding-right: 10px;
        font-size: .9rem;
        font-weight: 400;
        font-variant: small-caps;
    }

    .card {
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 100%;
        height: 200px;
        background-color: rgba(255, 255, 255, 0.2);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: screen;
        margin-bottom: 9px;
        transform: scale(.9);
        transition: .1s;
    }

    .card-container a {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    
    .card-container:hover .square-1 {
        margin-top: -10px;
        margin-left: -10px;
        width: 50px;
        height: 50px;
        opacity: 100%;
    }

    .card-container:hover .square-2 {
        margin-top: -10px;
        margin-right: -10px;
        width: 50px;
        height: 50px;
        opacity: 100%;
    }
    
    .card-container:hover .card {
        transform: scale(1);
        background-color: rgb(255, 138, 138);
    }

    .card-container:hover .card-title {
        opacity: 0%;
    }

    .card-container:hover .card-date {
        opacity: 0%;
    }

    .card-container:hover .card-synopsis {
        opacity: 100%;
    }

    .card-title {
        position: fixed;
        bottom: 0;
        width: fit-content;
        max-width: 100%;
        margin: 10px;
        margin-left: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .card-title h2 {
        font-weight: 100;
        font-size: 1.5rem;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: rgb(255, 255, 255);
        margin: 0;
        background-color: rgba(0, 0, 0, 0.235);
        padding-right: 8px;
        padding-left: 8px;
        filter: drop-shadow(0px 0px 2px black);
    }

    .card-synopsis {
        display: flex;
        position: fixed;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        color: rgb(0, 0, 0);
        width: 80%;
        background-color: rgba(255, 255, 255, 1);
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 10px;
        word-wrap:normal;
        font-weight: 400;
        font-size: .8rem;
        opacity: 0%;
        height: 60%;
        overflow: hidden;
        transition: .15s;
        clip-path: polygon(0 10.00px,10.00px 0,100% 0,100% calc(100% - 10.00px),calc(100% - 10.00px) 100%,0 100%);
    }

    .card-synopsis em {
        text-decoration: none;
    }

    .card-synopsis .read-more {
        position: fixed;
        color: rgb(0, 0, 0);
        width: 80px;
        font-size: 12px;
        font-weight: 700;
        font-variant: small-caps;
        bottom: 0;
        right: 15px;
    }

    .card-container {
        display: flex;
        flex-direction: row;
        margin-left: 5%;
        width: 90%;
    }

    .card-date {
        display: flex;
        padding: 0;
        margin-top: 52px;
        margin-left: -12px;
        width: 0%;
        height: 100%;
        white-space: nowrap;
        color: #444444;
        padding-left: 10px;
        padding-right: 10px;
        transform: rotateZ(90deg);
        font-size: .55rem;
        font-weight: 400;
        font-variant: small-caps;
        font-family: sans-serif;
        letter-spacing: 5px;
        pointer-events: none;
        z-index: 2;
    }

    .squares {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-content: space-between;
    }

    .square-1 {
        margin-top: -10px;
        margin-left: -10px;
        width: 0px;
        height: 0px;
        opacity: 0%;
        border-top: 1px solid red;
        border-left: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }
    
    .square-2 {
        margin-top: -10px;
        margin-right: -10px;
        width: 0px;
        height: 0px;
        opacity: 0%;
        border-top: 1px solid red;
        border-right: 1px solid red;
        background-color: transparent;
        transition: .15s;
    }

    @media only screen and (max-width: 1150px) {
        .recent {
            width: 100%;
            min-width: 0px;
        }
    }
</style>
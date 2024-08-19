<script lang="ts">
    export let userName
    export let social
    export let img
    export let link
    let isCopied = false
    let copied = ''
    const animation = (string: string, speed: number) => {
        let iteration = 0
        let letters = string.split("")
        // add backward
        const backward = () => {
            iteration = letters.length
            let interval = setInterval(() => {
                if (iteration < 0) {
                    isCopied = false
                    console.log(copied, copied.length)
                    return clearInterval(interval)
                }
                copied = copied.slice(0, iteration)
                iteration--
            }, speed)
        }
        let forward = setInterval(() => {
            if (iteration > letters.length - 1) {
                setTimeout(() => {
                    backward()
                }, 618)
                return clearInterval(forward)
            }
            copied += letters[iteration]
            iteration++
        }, speed)
    }
</script>

<div class="link-container">
    <a class="mail" href={link} target="_blank">
        <img class="" src={img} alt={social}>
    </a>
    <h3>
        {social}
    </h3>
    <div class="link">
        <a class="anchor" href={link} target="_blank">
            {userName}
        </a>
        <div>
            {#if isCopied}
                <div class='copied'>
                    <p>
                        {copied}
                    </p>
                </div>
            {/if}
            <button 
                class="clipboard"
                on:click={
                    (async () => {
                        await navigator.clipboard.writeText(userName)
                        if (!isCopied) {
                            isCopied = true
                            animation('copied', 20)
                        }
                    })
                } 
            >
                <img src="copy.svg" alt="">
            </button>
        </div>
    </div>
</div>

<style>
    .mail img {
        height: 75px;
    }

    button img {
        width: 100px;
    }

    .link-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 61.8%;
        height: 75px;
        margin-bottom: 32px;
    }
    
    .link-container h3 {
        color: #000000;
        height: 20px;
        width: 38.1%;
        padding: 0;
        padding-right: 10px;
        padding-left: 10px;
        letter-spacing: 5px;
        font-size: 1rem;
        font-weight: 700;
        font-variant: small-caps;
        font-family: monospace;
        border-bottom: 1px solid grey;
        text-align: center;
    }

    .link {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 36px;
        height: 30px;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        border-top: 1px solid grey;
        border-left: 4px solid grey;
        padding: 2px;
    }

    .link p, .anchor {
        font-family: monospace;
        font-size: 1rem;
        margin: 0;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 2px;
        text-decoration: underline;
    }
    
    .link div {
        display: flex;
        flex-direction: row;
    }

    .link .clipboard {
        font-size: 1rem;
        text-decoration: none;
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 2px;
        margin-left: 2px;        
        border: none;
        border: 1px solid gainsboro;
        cursor: pointer;
    }

    .link .clipboard img {
        width: 10px;
        scale: 2;
    }

    .copied {
        position: absolute;
        margin-left: 40px;
        font-family: monospace;
        font-size: .9rem;
        font-variant: all-small-caps;
        letter-spacing: 2px;
    }
    
    @media only screen and (max-width: 700px) {
        .link {
            margin-top: 0px;
            min-width: fit-content;
        }

        .link-container {
            height: auto;
            width: 95%;
            flex-direction: column;
            margin-bottom: 50px;
        }

        .link-container h3 {
            width: 0px;
            padding-top: 10px;
            padding-bottom: 10px;
            margin: 0;
            margin-top: -5px;
            margin-left: 15px;
            border-bottom: none;
            border-left: 1px solid grey;
        }
    }
</style>
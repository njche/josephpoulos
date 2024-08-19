<script lang="ts">
    import Footer from '$lib/components/Footer.svelte'
    let height: number
</script>

<svelte:head>
    <title>About - Joseph Poulos</title>
	<meta data-key="description" name="description" content="Learn more about Joseph Poulos">
</svelte:head>

<div 
    class="about-container"
>
    <img src="/author.webp" alt="Joe Poulos"/>
    <div class="bio">
        <div class="about-info">
            <div class="biography-content">
                <h1>
                    Joe
                </h1>
                <p>
                    Joseph Poulos is a writer from Grand Rapids, Michigan. He has published over 140 articles on various subjects including: television, film, video games, literature, history and general news. In 2021, he served as the Feature Editor for Grand Rapids Community College's student newspaper, The Collegiate. In 2022, he served as the Editor-in-Chief for the same publication. 
                </p>
                <p>
                    Poulos' work has been honored numerous times by the Michigan Community College Press Association. In 2021, he won third place for Critical Review for his story, 
                    <a href="https://www.sociomix.com/diaries/entertainment/a-night-at-the-new-beverly-in-my-capacity-as-a-los-angeles-native/1627860886" target="_blank">"A Night at the New Beverly, In My Capacity as a Los Angeles Native."</a>
                    In 2023, he won second place for the same award, this time for his film review, 
                    <a href="https://thecollegiatelive.com/202207/elvis-presley-died-for-your-sins-an-elvis-review" target="_blank">"Elvis Presley Died for Your Sins."</a>
                    That same year, the MCCPA also gave him an honorable mention in the Headline Writing Category for his Jordan Peele critique, 
                    <a href="https://thecollegiatelive.com/2022/8/nope-is-a-definite-yep" target="_blank">"Nope is a Definite Yep."</a>
                </p>                    
                <p>
                    He is currently employed as a News Reporter for Grand Valley State University's student publication, The Lanthorn. In his spare time, he writes creative fiction and spends time with his wife and two children. His work has appeared on many platforms including: 
                    <a href="https://thecollegiatelive.com/author/jpoulos" target="_blank">The Collegiate</a>, 
                    <a href="https://lanthorn.com/staff_name/joseph-poulos" target="_blank">The Lanthorn</a>, 
                    <a href="https://defactofilmreviews.com/author/joseph-poulos" target="_blank">DeFactoFilmReviews</a>, 
                    <a href="https://wwww.gtabase.com/team/josephpoulos" target="_blank">GTABase</a>, 
                    <a href="https://www.gamesatlas.com/team/joseph-poulos" target="_blank">GamesAtlas</a>
                    and 
                    <a href="https://sociomix.com/u/joe" target="_blank">Sociomix</a>.
                </p>
                <a 
                    class="pinterest"
                    href="https://pin.it/2lDgl6Y59"
                    target="_blank"
                >
                    <span>
                        <p>
                            View more on 
                        </p>
                        <img src="pinterest.svg" alt="pinterest logo" >
                    </span>
                </a>
            </div>
        </div>
    </div>
</div>
<Footer />

<svelte:window bind:innerHeight={height} />
<style>
    
    .about-container {
        width: 100%;
        height: calc(100vh - 81px);
        display: flex;
        flex-direction: row;
        background: linear-gradient(to left, transparent, #dddddd);
        overflow: hidden;
        margin-block-end: -40px;
    }
    
    .bio {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
        z-index: 2;
    }

    img {
        position: absolute;
        top: 0; left: -50px; bottom: 0;
        width: 50%;
        margin: auto;
        background-size: contain;
        background-repeat: no-repeat;
        object-fit: cover;
    }

    .about-info {
        font-size: 1rem;
        font-family: monospace;
        width: 61.8%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-left: 1px solid grey;
        padding: 0;
        margin: 0;
    }

    .about-info p {
        color: #333;
        letter-spacing: -1px;
        word-spacing: 2px;
        padding: 0;
        margin-bottom: 32px;
    }

    .about-info h1 {
        font-variant-caps: all-small-caps;
        font-size: 4rem;
        padding: 0;
        margin: 0;
    }
    
    .biography-content {
        padding-right: 50px;
        padding-top: 50px;
        padding-bottom: 50px;
        margin-left: 50px;
        margin-bottom: 50px;
        word-break: keep-all;
    }

    .biography-content a {
        color: #E60023;
        padding-left: 4px;
        padding-right: 4px;
        width: fit-content;
        text-underline-offset: 2px;
        text-decoration: underline;
    }

    .biography-content a:hover {
    }

    .biography-content img {
        position: relative;
        width: 32px;
        height: auto;
        top: 0; left: 0; bottom: 0;
        margin: 0;
    }

    .biography-content .pinterest {
        width: 160px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0;
        text-decoration: none;
        background-color: white;
        border: 1px solid #E60023;
        border-radius: 16px;
        filter: drop-shadow(2px 2px 0px #E60023);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .biography-content .pinterest:hover {
        cursor: pointer;
        filter: drop-shadow(1px 1px 0px #E60023);
        translate: 1px 1px;
    }
    
    .biography-content .pinterest span {
        padding: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 16px;
    }
    
    .biography-content span p {
        font-weight: 700;
        color: #E60023;
        letter-spacing: 0px;
        text-align: center;
        margin: 0px;
        padding-right: 6px;
        translate: 0px -1px;
    }

    @media only screen and (max-width: 900px) {
        img {
            width: 80%;
            top: 20px; left: 0; bottom: 0;
            position: relative;
        }

        .bio {
            justify-content: center
        }

        .about-container {
            height: 100%;
            flex-direction: column;
        }

        .about-info {
            width: 100%;
            border-left: none;
        }

        .biography-content {
            padding-top: 0px;
        }
    }

</style>
<script lang="ts">
    import { email } from "$lib/config";
    import EmailLink from "./EmailLink.svelte";
    import SocialLink from "./SocialLink.svelte";
</script>

<div class="about-container">
    <h1>
        Contact / Socials
    </h1>
    
    <EmailLink email={email} />

    <SocialLink 
        userName={'www.pinterest.com/joepoulos'}
        social={'pinterest'}
        img={'pinterest.svg'}
        link={'https://pin.it/2lDgl6Y59'}
    />
</div>


<style>
    h1 {
        font-variant: all-small-caps;
        font-weight: 100;
        font-size: 1.25rem;
        letter-spacing: 5px;
    }
    
    .about-container {
        font-family: monospace;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        width: 100%;
        min-height: calc(100vh - 81px);
        margin-bottom: -40px;
        overflow: hidden;
    }
    
    @media only screen and (max-width: 700px) {
        .about-container {
            width: 100%;
            height: auto;
            min-height: calc(100vh - 81px);
        }
    }
</style>
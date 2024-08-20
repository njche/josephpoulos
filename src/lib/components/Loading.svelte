<script>
    export let loading
</script>

<div class="loading" style:opacity={loading ? '1' : '0'}>
    <div 
        class="circle"
        style:animation-delay={".2s"}   
    >
        
    </div>
    <div 
        class="circle"
        style:animation-delay={".3s"}
    >
        
    </div>
    <div 
        class="circle"
        style:animation-delay={".4s"}
    >
        
    </div>
</div>

<style>
    @keyframes loading {
        0% {
            scale: 1
        } 50% {
            scale: .75
        } 100% {
            scale: 1
        }
    }

    .loading {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .circle {
        margin: 2px;
        width: 8px;
        height: 8px;
        background-color: rgb(5, 90, 130);
        opacity: 1;
        filter: drop-shadow(0px 0px 2px rgb(0, 55, 255));
        border-radius: 50%;
        scale: 1;
        animation-name: loading;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }
</style>
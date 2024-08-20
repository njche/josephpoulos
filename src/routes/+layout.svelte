<script>
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import Loading from "$lib/components/Loading.svelte";

    let loading = false

    beforeNavigate(() => {
        loading = true
    })

    afterNavigate(() => {
        loading = false
    })
</script>

<Loading {loading} />
<slot />
<script>
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import Loading from "$lib/components/Loading.svelte";
    import { isLoading } from "$lib/utils/stores";

    beforeNavigate(() => {
        isLoading.set(true)
    })

    afterNavigate(() => {
        isLoading.set(false)
    })
</script>

<Loading loading={$isLoading} />
<slot />
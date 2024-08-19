<script lang="ts">
    import { goto } from "$app/navigation";
    export let totalPages: number
    export let currentPage: number
    export let search: string
    const handlePrev = () => goto(`?page=${currentPage - 1}&search=${search}`)
    const handleNext = () => goto(`?page=${currentPage + 1}&search=${search}`)
</script>

<div class="pagination">
    <div 
        role="button"
        tabindex="0"
        on:keydown
        on:click={handlePrev}
        class="prev" 
        style={currentPage > 1 ? 'opacity: 100%' : 'opacity: 50%; pointer-events: none;'}
    >
        {'<'}
    </div>
    {#if totalPages <= 9}
        {#each Array(totalPages) as _, idx}
            <div 
                role="button"
                tabindex="0"
                on:keydown
                on:click={() => goto(`?page=${idx + 1}&search=${search}`)} 
                style={currentPage == idx + 1 ? 'color: red' : ''}
            >
                {idx + 1}
            </div>
        {/each}
    {:else}
        {#if currentPage >= 5}
            {#if currentPage > 5}
                <div
                    role="button"
                    tabindex="0"
                    on:keydown 
                    on:click={() => goto(`?page=${(currentPage - 5)}&search=${search}`)}
                >
                    {'...'}
                </div>
            {/if}
            {#if totalPages - currentPage < 5}
                {#each Array(9) as _, idx}
                    <div 
                        role="button"
                        tabindex="0"
                        on:keydown
                        on:click={() => goto(`?page=${(totalPages - 8) + (idx)}&search=${search}`)} 
                        style={currentPage == (totalPages - 8) + (idx) ? 'color: red' : '' }
                    >
                        {(totalPages - 8) + (idx)}
                    </div>
                {/each}
            {:else}
                {#each Array(5) as _, idx}
                    <div 
                        role="button"
                        tabindex="0"
                        on:keydown
                        on:click={() => goto(`?page=${(currentPage - 5) + (idx + 1)}&search=${search}`)} 
                        style={currentPage == (currentPage - 5) + (idx + 1) ? 'color: red' : '' }
                    >
                        {(currentPage - 5) + (idx + 1)}
                    </div>
                {/each}
                {#each Array(4) as _, idx}
                    <div
                        role="button"
                        tabindex="0"
                        on:keydown 
                        on:click={() => goto(`?page=${currentPage + (idx + 1)}&search=${search}`)}
                    >
                        {currentPage + (idx + 1)}
                    </div>
                {/each}
            {/if}
            {#if currentPage + 4 < totalPages}
                <div 
                    role="button"
                    tabindex="0"
                    on:keydown
                    on:click={() => goto(`?page=${currentPage + 5}&search=${search}`)}>
                    {'...'}
                </div>
            {/if}
        {:else}
            {#each Array(9) as _, idx}
                <div 
                    role="button"
                    tabindex="0"
                    on:keydown
                    on:click={() => goto(`?page=${idx + 1}&search=${search}`)}
                    style={currentPage == idx + 1 ? 'color: red' : '' }>
                    {idx + 1}
            </div>
            {/each}
            {#if totalPages > 9}
                <div
                    role="button"
                    tabindex="0"
                    on:keydown
                    on:click={() => goto(`?page=${10}&search=${search}`)} 
                >
                    {'...'}
                </div>
            {/if}
        {/if}
    {/if}
    <div 
        role="button"
        tabindex="0"
        on:keydown 
        on:click={handleNext} 
        class="prev" 
        style={currentPage < totalPages ? 'opacity: 100%' : 'opacity: 50%; pointer-events: none;'}
    >
        {'>'}
    </div>
</div>

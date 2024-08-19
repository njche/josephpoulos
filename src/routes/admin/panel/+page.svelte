<script lang="ts">
    import { isThisNew, editArticle, editTitle, editMarkdown, editSynopsis, imageTag } from '$lib/utils/stores'
    import { marked } from 'marked'
    import PreviewPost from '$lib/components/admin/PreviewPost.svelte'
    import SelectPost from '$lib/components/admin/SelectPost.svelte'
    import CreatePost from '$lib/components/admin/CreatePost.svelte'
    import AdminComments from '$lib/components/admin/AdminComments.svelte'
    export let data
    let writersMode = false
    $: title = $editTitle
    $: synopsis = $editSynopsis
    $: markdown = $editMarkdown
    $: imgTag = $imageTag
</script>

<div class="admin-main">
    <!-- <button class="writers-mode" on:click={() => writersMode = !writersMode}>
        <img src="/writermode.svg" alt="">
    </button> -->
    <div style={ writersMode ? 'grid-template-columns: 61.8% 38.19601%' : null } class="create">
        {#if !$isThisNew}
            {#each data.articles as article}
                {#if (article.slug === $editArticle)}
                <div class="create-parent">
                    <CreatePost 
                        writersMode={writersMode}
                        data={data}
                    />
                </div>

                <div class="preview-parent">
                    <PreviewPost 
                        title={title}
                        synopsis={synopsis}
                        imgTag={imgTag}
                        content={
                            marked(markdown, { 
                                headerIds: false, 
                                mangle: false 
                            })
                        }
                        data={data}
                    />

                    <AdminComments data={data.comments} />
                </div>
                {/if}
            {/each}
        {/if}
        {#if $isThisNew}
            <div class="create-parent">
                <CreatePost 
                    writersMode={writersMode}
                    data={data}
                />
            </div>
            
            <div class="preview-parent">
                <PreviewPost 
                    title={title}
                    synopsis={synopsis}
                    imgTag={imgTag}
                    content={
                        marked(markdown, { 
                            headerIds: false, 
                            mangle: false 
                        })
                    }
                    data={data}
                />

                <AdminComments data={data.comments} />
            </div>
        
        {/if}
        <div class="select-parent">
            <SelectPost data={data} />
        </div>
    </div>
</div>


<style>
    .writers-mode {
        position: fixed;
        bottom: 4px;
        left: 4px;
        width: fit-content;
        height: 40px;
        width: 40px;
        z-index: 9;
        border: 1px solid gainsboro;
        border-radius: 8px;
    }

    .writers-mode img {
        width: 100%;
    }

    .admin-main {
        overflow-x: hidden;
        background-color: rgb(245, 245, 245);
    }

    .create {
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
        grid-template-columns: 30.901995% 38.19601% calc(30.901995% - 30px);
        min-height: 100vh;
        transition: .2s;
    }

    .create::-webkit-scrollbar {
        scrollbar-gutter: stable;
    }

    .create-parent {
        width: calc(30.901995% - 8px);
        margin-left: 8px;
    }

    .preview-parent {
        width: 38.19601%;
    }
    
    .select-parent {
        width: 30.901995%;            
    }

    @media only screen and (max-width: 954px) {
        .admin-main {
            padding: 8px;
            width: 100%;
        }

        .create {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .create-parent {
            width: 100%;
            padding-left: 0px;
            margin-bottom: 30px;
        }

        .preview-parent {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        
        .select-parent {
            width: 100%;            
        }
    }
</style>
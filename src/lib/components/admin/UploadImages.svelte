<script lang="ts">
    import { enhance } from "$app/forms";
    import { isLoading } from "$lib/utils/stores";
    import ServerImages from "./ServerImages.svelte";
    let images: Array<File> = []
    let files: FileList | null | undefined
    function imageUpload(event: Event) {
        const fileList = (event.target as HTMLInputElement)?.files;
        if (!fileList) {
            return;
        } else {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                images.push(file)
            }
        }
        
        const makeFileList = (fileList: File[]) => {
            const reducer = (dataTransfer: DataTransfer, file: File) => {
                dataTransfer.items.add(file);
                return dataTransfer;
            }
            files = fileList.reduce(reducer, new DataTransfer()).files
            return fileList.reduce(reducer, new DataTransfer()).files;
        }
        
        makeFileList(images)
    }
</script>
<h2>
    Upload Images
</h2>
<form 
    action="?/imageUpload" 
    enctype="multipart/form-data" 
    id="file-list"
    method="POST"
    use:enhance={({ cancel }) => {
        if (!images.length) {
            cancel()
        }

        isLoading.set(true)

        return async ({ result, update }) => {
            isLoading.set(false)
            if (result.type === 'success') {
                console.log(result)
                images = []
                files = undefined
                update({ reset: true })
            }
        };
    }}
>   
    <ServerImages />
    <div 
        style:display={'flex'}
        style:flex-direction={'column'}
        style:align-items={'center'}
    >
        <p>
            All images will be saved as a .webp file
        </p>
            <label for="images" form="file-list">
                <img src="/upload.png" alt="">
                <input 
                    class="file" 
                    type="file"
                    name="image"
                    form="file-list"
                    id="images" 
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    multiple
                    hidden
                    bind:files={files}
                    on:change={(e) => {
                        imageUpload(e)
                    }}
                >
            </label>
            <ul>
                {#if files}
                    <div 
                        style:display={'flex'}
                        style:justify-content={'space-between'}
                    >
                        <p>
                            [{files.length}] selected images:
                        </p>
                        <button 
                            on:click={() => {
                                images = []
                                files = undefined
                            }}
                            type="button"
                        >
                            clear
                        </button>
                    </div>
                    {#each files as image}
                        <li>
                            <p>
                                {image?.name}
                            </p>
                        </li>
                    {/each}
                {:else}
                    <p>
                        No images selected.
                    </p>
                {/if}
            </ul>
        <button type="submit">
            Upload
        </button>
    </div>
</form>

<style>

    h2 {
        text-align: center;
    }

    form {
        position: relative;
        outline: 4px solid rgb(219, 226, 235);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        height: 100%;
        width: 100%;
    }

    button {
        cursor: pointer;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        cursor: pointer;
    }

    label img {
        width: 50px;
    }

    form button {
        font-variant-caps: all-petite-caps;
        color: green;
        font-size: 1rem;
        border-radius: 0px;
        filter: none;
        background-color: transparent;
        border: 1px solid green;
        margin: 16px;
        cursor: pointer;
    }

    form p {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-style: italic;
        font-size: 1rem;
        color: grey;
    }

    form ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        overflow: auto;
        max-height: 200px;
        width: 100%;
        border: 1px solid gainsboro;
        background-color: white;
    }

    form ul button {
        color: red;
        border: 1px solid red;
    }
    
    form ul li {
        margin-left: 40px;
    }

    div p {
        padding-left: 16px;
    }
</style>
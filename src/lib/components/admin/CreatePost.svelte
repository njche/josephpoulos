<script lang="ts">
    import { 
        altImage,
        isThisNew, 
        editTitle,
        editSynopsis,
        editCategories, 
        editMarkdown, 
        editArticle, 
        selected, 
        selectedImage, 
        imageName,
        imageTag,

        isLoading

    } from '$lib/utils/stores'
    import { applyAction, enhance } from '$app/forms'
    import { invalidateAll } from '$app/navigation';
    import UploadImages from './UploadImages.svelte';
    export let data
    export let writersMode: boolean
    let image: string
    let category: string
    let cover: string
    let file: FileList
    let input: HTMLInputElement
    let height: number
    let open: number = NaN
    let error = false
    let errorMessage: string = ''
    $: selectedCategories = $editCategories
    $: title = $editTitle
    $: synopsis = $editSynopsis
    $: markdown = $editMarkdown
    $: image = $imageName
    $: imgTag = $imageTag
    $: altImg = $altImage

    function handleInput(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
        if (!reader.result) return;
            cover = reader.result.toString()
            selectedImage.set(cover)
            imageName.set(file.name)
            image = String($imageName)
        };
        reader.readAsDataURL(file);
    }

    function handleSlide(index: number) {
        if (open === index) {
            open = NaN
            return
        }
        open = index
    }
</script>

<svelte:window bind:innerHeight={height} />
<div class="create-container">
    {#if error === true}
        <div class="error" 
            on:click={() => {
                error = false
            }}
            on:keypress
            role='none'
        >
            <div class="error-module">
                <h1>
                    ERROR:
                </h1>
                <p>
                    {errorMessage}
                </p>
                <button on:click={() => {
                    error = false
                }}>
                    continue
                </button>
            </div>
        </div>
    {/if}
        <form 
            method="POST" 
            action={$isThisNew ? '?/create' : '?/modify'} 
            enctype="multipart/form-data" 
            use:enhance={({ cancel }) => {
                isLoading.set(true)
                if (!image) {
                    error = true
                    errorMessage = 'You must choose a cover image.'
                    isLoading.set(false)
                    return cancel()
                }
                return async ({ result, update }) => {
                    applyAction(result)
                    invalidateAll()
                    isLoading.set(false)
                    if (result.type === 'success') {
                        if (result.data?.success) {
                            editTitle.placehold()
                            editSynopsis.placehold()
                            editCategories.set([])
                            editMarkdown.placehold()
                            selected.placehold()
                            imageName.placehold()
                            selectedImage.placehold()
                            imageTag.placehold()
                            input.value = ''
                            isThisNew.reset()
                            update({ reset: true })
                        } else {
                            errorMessage = String(result.data?.message)
                            error = true
                            update({ reset: false })
                        }
                    } else {
                        update({ reset: false })
                    }
                };
            }}
        >
        <div class="form-container" 
            style="
                --height: {height - 300}px;
                --slideHeight: {500}px;
                --imageHeight: {height - 600}px;
            "
            style:display={writersMode === true ? 'none' : 'block'}
        >
            <h1>
                {$isThisNew === true ? 'Create Article' : 'Modify Article'}
            </h1>
            <button type="button" on:click={() => handleSlide(0)}>
                <h4>
                    Headers
                </h4>
                <div class="count">
                    {#if title && synopsis}
                        <div style:color={'green'}>
                            {'2 / 2'}
                        </div>
                    {:else if title || synopsis}
                        <div style:color={'orange'}>
                            {'1 / 2'}
                        </div>
                    {:else}
                        <div style:color={'rgb(200, 0, 0)'}>
                            {'0 / 2'}
                        </div>
                    {/if}
                </div>
                <div class={open === 0 ? 'minus' : 'plus'}>
                    {open === 0 ? '-' : '+'}
                </div>
            </button>
            <div class="split-0" class:active={open === 0 ? true : false}>
                <h4>
                    Title
                </h4>
                <div>
                    <input 
                        name="old" 
                        style="display: none" 
                        bind:value={$editArticle}
                    >
                    <input 
                        name="title" 
                        placeholder="Title" 
                        autocomplete="off"
                        required 
                        bind:value={title}
                        on:input={() => editTitle.set(title)}
                    >
                    <h4>
                        Synopsis
                    </h4>
                    <input 
                        name="synopsis" 
                        placeholder="Synopsis" 
                        autocomplete="off" 
                        required 
                        bind:value={synopsis}
                        on:input={() => editSynopsis.set(synopsis)}
                    >
                </div>
            </div>
            <!-- header end -->
            <button type="button" on:click={() => handleSlide(1)}>
                <h4>
                    Cover Image
                </h4>
                <div class="count">
                    {#if image && imgTag}
                        <div style:color={'green'}>
                            {'2 / 2'}
                        </div>
                    {:else if image || imgTag}
                        <div style:color={'orange'}>
                            {'1 / 2'}
                        </div>
                    {:else}
                        <div style:color={'rgb(200, 0, 0)'}>
                            {'0 / 2'}
                        </div>
                    {/if}
                </div>
                <div class={open === 1 ? 'minus' : 'plus'}>
                    {open === 1 ? '-' : '+'}
                </div>
            </button>
            <div class="split-1" class:active={open === 1 ? true : false}>
                <label>
                    <h4>
                        Click Here to Upload Cover Image
                    </h4>
                    {#if data.articles[$selected]}
                        {#if data.articles[$selected].image === image}
                            <img src={String(image)} alt={image} />
                        {/if}
                    {:else}
                        {#if image !== undefined}
                            <img src={String($selectedImage)} alt={image} />
                        {:else}
                            <img src="/svelte.png" alt={'There was an error displaying this image.'} />
                        {/if}
                    {/if}
                    <input 
                        class="file" 
                        type="file"
                        name="image"
                        id="image" 
                        accept="image/png, image/jpeg, image/webp"
                        bind:files={file}
                        bind:this={input}
                        on:change={(e) => {
                            handleInput(e)
                        }}
                    >
                </label>
                <h4>
                    Image Tag [HTML Enabled]
                </h4>
                <input 
                    class="img-tag"
                    type="text"
                    name="img-tag"
                    placeholder="Courtesy of"
                    bind:value={imgTag}
                    on:input={() => imageTag.set(imgTag)}
                >
                <h4>
                    Image Description
                </h4>
                <input 
                    class="alt"
                    type="text"
                    name="alt"
                    placeholder=""
                    bind:value={altImg}
                    on:input={() => altImage.set(altImg)}
                    required
                >
                <input 
                    type="text"
                    name="name"
                    class="file"
                    style="display: none;"
                    bind:value={image}
                >
            </div>
            <!-- cover end -->
            <button type="button" on:click={() => handleSlide(2)}>
                <h4>
                    Categories
                </h4>
                <div class="count">
                    {#if $editCategories.length === 0}
                        <div style:color={'rgb(200, 0, 0)'}>
                            {'0 / 1'}
                        </div>
                    {:else}
                        <div style:color={'green'}>
                            {'1 / 1'}
                        </div>
                    {/if}
                </div>
                <div class={open === 2 ? 'minus' : 'plus'}>
                    {open === 2 ? '-' : '+'}
                </div>
            </button>
                <div class="split-2" class:active={open === 2 ? true : false}>
                    <h4>
                        Add Category
                    </h4>
                    <div>
                        <input 
                            class="categories"
                            autocomplete="off"
                            on:keypress={(k) => {
                                if (k.key === 'Enter') {
                                    let collide = false
                                    $editCategories.forEach((e) => {
                                        if (category.toLowerCase().trim() === e) {
                                            collide = true
                                        }
                                    })
                                    if (collide) {
                                        k.preventDefault()
                                        category = ''
                                        return
                                    }
                                    selectedCategories.push(category.toLowerCase().trim())
                                    editCategories.set(selectedCategories)
                                    k.preventDefault()
                                    category = ''
                                }
                            }}
                            bind:value={category}
                        >
                        <button 
                            class="add"
                            class:active={open === 2 ? true : false}
                            type="button"
                            id="add"
                            on:click={(e) => {
                                let collide = false
                                $editCategories.forEach((e) => {
                                    if (category.toLowerCase().trim() === e) {
                                        collide = true
                                        return
                                    }
                                })
                                if (collide) {
                                    e.preventDefault()
                                    category = ''
                                    return
                                }
                                selectedCategories.push(category.toLowerCase().trim())
                                editCategories.set(selectedCategories)
                                e.preventDefault()
                                category = ''
                            }}
                        >
                            add >
                        </button>
                    </div>
                    <input 
                        name="categories" 
                        style="display: none" 
                        bind:value={$editCategories}
                    >
                    <h4>
                        Selected Categories
                    </h4>
                    <div class="tags">
                        {#each $editCategories as tag }
                        <div class="tag">
                            {tag.toUpperCase()}
                            <button on:click={() => {
                                editCategories.set(selectedCategories.filter(n => n !== tag))
                            }}>
                                X
                            </button>
                        </div>  
                        {/each}
                    </div>
                </div>
                <!-- categories end -->
            <button type="button" on:click={() => handleSlide(3)}>
                <h4>
                    Markdown
                </h4>
                <div class="count">
                    {#if markdown}
                        <div style:color={'green'}>
                            {'1 / 1'}
                        </div>
                    {:else}
                        <div style:color={'rgb(200, 0, 0)'}>
                            {'0 / 1'}
                        </div>
                    {/if}
                </div>
                <div class={open === 3 ? 'minus' : 'plus'}>
                    {open === 3 ? '-' : '+'}
                </div>
            </button>
            <div class="split-3" class:active={open === 3 ? true : false}>
                <h4>
                    Markdown / Text
                </h4>
                <textarea
                    class="markdown"
                    name="markdown"
                    required 
                    autocomplete="off"
                    bind:value={markdown}
                    on:input={() => {
                            editMarkdown.set(markdown)
                        }
                    }
                />
            </div>
            <!-- markdown end -->
        </div>
        <div class="bottom">
            {#if writersMode}
                <textarea
                    class="markdown"
                    name="markdown"
                    style:height={(height - 200) + 'px'}
                    required 
                    autocomplete="off"
                    bind:value={markdown}
                    on:input={() => {
                            editMarkdown.set(markdown)
                        }
                    }
                />
            {/if}
            <button class="submit" type="submit">
                {$isThisNew === true ? 'Publish' : 'Save Changes'}
            </button>
        </div>
        <UploadImages />
    </form>
</div>

<style>
    .create-container {
        height: 90vh;
    }

    .error {
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.381);
        width: 100%;
        height: 100%;
    }

    .error button {
        color: white;
        align-self: center;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-variant: small-caps;
        font-size: 1rem;
        background-color: rgb(124, 124, 124);
        width: 80%;
    }

    .error button:hover {
        cursor: pointer;
    }

    .error p {
        color: black;
        align-self: center;
        width: 80%;
        font-family: monospace;
    }

    .error h1 {
        font-size: 1.5rem;
        color: red;
        align-self: center;
        border: none;
    }

    .error-module {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
        background-color: rgb(255, 255, 255);
        min-width: 300px;
        max-width: 50%;
        height: 300px;
        filter: drop-shadow(5px solid rgb(255, 0, 0));
    }

    .split-0 {
        font-variant: normal;
        height: 0px;
        transition: .25s;
        overflow: hidden;
        scrollbar-gutter: stable;
        width: auto;
    }

    .split-1 {
        font-variant: normal;
        height: 0px;
        transition: .25s;
        overflow: hidden;
        scrollbar-gutter: stable;
        width: auto;
    }

    .split-2 {
        height: 0px;
        transition: .25s;
        overflow: hidden;
        scrollbar-gutter: stable;
        width: auto;
    }

    .split-3 {
        height: 0px;
        transition: .25s;
        overflow: hidden;
        scrollbar-gutter: stable;
        width: auto;
    }

    .split-0.active {
        display: flex;
        flex-direction: column;
        height: 300px;
        transition: .25s;
        scrollbar-gutter: stable;
    }

    .split-1.active {
        display: flex;
        flex-direction: column;
        height: 480px;
        transition: .25s;
        scrollbar-gutter: stable;
    }

    .split-2.active {
        display: flex;
        flex-direction: column;
        height: 450px;
        transition: .25s;
        scrollbar-gutter: stable;
    }

    .split-3.active {
        display: flex;
        flex-direction: column;
        height: var(--slideHeight);
        transition: .25s;
        scrollbar-gutter: stable;
    }

    button {
        display: flex;
        height: 50px;
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        text-align: left;
        outline: none;
        border: none;
    }

    button .plus {
        margin: auto 0;
        color: grey;
        font-size: 20px;
        translate: -15px;
        width: 0%;
    }

    button .minus {
        margin: auto 0;
        color: grey;
        font-size: 20px;
        margin-top: 1px;
        width: 0%;
        translate: -15px;
        transform: scaleX(1.68);
    }

    button .count {
        opacity: 50%;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: grey;
        font-weight: 700;
        flex: 60%;
        margin: auto 0;
    }

    button h4 {
        flex: 10%;
        margin: auto 0;
    }

    button:focus {
        outline: none;
        border: none;
    }
   
    form {
        display: flex;
        flex-flow: column;
        width: 90%;
        height: 100%;
    }

    input {
        font-variant-caps: normal;
        letter-spacing: 0px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        width: 80%;
        color: grey;
        height: 32px;
        margin-left: 20px;
        font-size: 1rem;
        padding: 4px;
        padding-left: 20px;
        border: none;
        outline: 5px solid rgb(219, 226, 235);
        background-color: white;
        transition: .5s;
    }

    input:focus {
        outline: 5px solid rgb(145, 173, 209);
    }

    .categories {
        width: 25%;
    }

    h1 {
        color: var(--blue);
        width: 100%;
        text-align: center;
        grid-column: 1;
    }

    h4 {
        color: rgb(117, 117, 117);
        padding-left: 4px;
    }

    .submit {
        display: flex;
        align-self: center;
        justify-content: center;
        height: 100%;
        max-height: 64px;
        width: 100%;
        color: rgb(255, 255, 255);
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        background: linear-gradient(to right, rgb(40, 70, 40), rgb(101, 248, 96));
        border: none;
    }

    .add {
        display: inline;
        position: relative;
        color: lightcoral;
        font-size: 14px;
        text-align: center;
        margin-block-start: 5px;
        margin-left: -70px;
        top: 5px;
        height: 30px;
        width: 60px;
        background: none;
        filter: none;
        border: 2px solid lightcoral;
        border-radius: 5px;
        z-index: 2;
    }

    .add:focus {
        position: relative;
        color: lightcoral;
        font-size: 14px;
        text-align: center;
        margin-block-start: 5px;
        margin-left: -70px;
        top: 5px;
        height: 30px;
        width: 60px;
        background: none;
        filter: none;
        border: 2px solid lightcoral;
        border-radius: 5px;
        z-index: 2;
    }

    .add:active {
        color: white;
        border: 2px solid lightcoral;
        background-color: lightcoral;
    }

    .categories {
        padding-right: 70px;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-left: 10px;
        width: 90%;
        max-width: 100%;
        min-height: 50px;
        padding: 2%;
        background-color: rgba(0, 0, 0, 0.1);
        overflow-y: scroll;
    }

    .tag {
        display: flex;
        flex-direction: row;
        width: fit-content;
        height: fit-content;
        color: white;
        padding: 5px;
        margin: 5px;
        background-color: lightcoral;
    }

    .tag button {
        margin-left: 10px;
        height: fit-content;
        width: fit-content;
    }

    .markdown {
        color: var(--blue);
        font-size: 1rem;
        font-weight: 600;
        padding: 2%;
        width: 90%;
        margin-left: 3%;
        margin-block-end: 5%;
        background-color: rgb(233, 233, 233);
        border-radius: 10px;
        border: none;
        resize: none;
        z-index: 3;
        height: var(--slideHeight);
        height: 100vh;
    }
    
    .markdown:focus {
        outline: none;
    }

    .bottom {
        display: flex;
        flex-flow: column;
        text-align: center;
        margin-bottom: 50px;
    }

    label:hover {
        cursor: pointer;
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 95%;
        height: 150px;
        outline: 5px solid rgb(219, 226, 235);
    }

    .file {
        display: none;
    }

    ::-webkit-input-placeholder {
        white-space:nowrap;
    }

    @media only screen and (max-width: 954px) {
        .create-container {
            display: flex;
            flex-direction: column;
            height: auto;
            align-items: center
        }
    }
</style>

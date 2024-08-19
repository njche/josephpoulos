<script lang="ts">
    import {
        altImage,
        editArticle,
        editCategories,
        editMarkdown,
        editSynopsis,
        editTitle,
        imageName,
        imageTag,
        isThisNew,
        selected,
        selectedImage,
    } from "$lib/utils/stores";
    import { applyAction, enhance } from "$app/forms";
    export let data;
    $: select = $selected;
    let confirmationModal = false;
</script>

<div class="modify">
    <h1>Published Articles</h1>
    <div class="posts">
        {#each data.articles as article, idx}
            <div
                class="modify-article"
                class:selected={select === idx}
                id={`${idx}`}
                style={idx === 0
                    ? "border-top: 2px solid white"
                    : "border-top: none"}
            >
                <span>
                    <a 
                        data-sveltekit-preload-data="tap"
                        href="/articles/{article.slug}/"
                    >
                        {article.title}
                    </a>
                </span>
                <div style="display: flex; flex-direction: row;">
                    <span class="views">
                        {article.views} views
                    </span>
                    <button
                        on:click={() => {
                            if (select === idx) {
                                document
                                    .getElementById(`${idx}`)
                                    ?.classList.toggle("selected");
                                editTitle.placehold();
                                editSynopsis.placehold();
                                editCategories.placehold();
                                editMarkdown.placehold();
                                selected.placehold();
                                imageName.placehold();
                                selectedImage.placehold();
                                imageTag.placehold();
                                altImage.placehold();
                                isThisNew.reset();
                                select = NaN;
                                return;
                            }
                            selected.set(idx);
                            editArticle.set(article.slug);
                            editTitle.set(article.title);
                            editSynopsis.set(article.synopsis);
                            editMarkdown.set(article.markdown);
                            editCategories.set(article.categories);
                            imageName.set(article.image);
                            imageTag.set(article.imageTag);
                            altImage.set(article.imageAlt);
                            selectedImage.placehold();
                            isThisNew.false();
                        }}
                    >
                        <svg
                            fill="#3398d7"
                            height="16px"
                            width="16px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 259.858 259.858"
                            xml:space="preserve"
                            stroke="#3398d7"
                            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g><g id="SVGRepo_iconCarrier">
                                <path
                                    d="M259.857,18.309c0-4.891-1.904-9.488-5.363-12.946C251.036,1.904,246.438,0,241.548,0c-4.636,0-8.997,1.729-12.385,4.853 c-3.869-1.231-7.945-1.878-12.122-1.878c-10.642,0-20.646,4.145-28.172,11.669L177.343,26.17c-0.113,0.101-0.228,0.197-0.336,0.305 L24.256,179.226c-2.834,2.834-5.995,8.283-7.049,12.147L0.28,253.437c-0.521,1.912-0.308,3.621,0.603,4.813 c0.792,1.038,2.06,1.609,3.572,1.609c0.619,0,1.28-0.095,1.964-0.281l62.065-16.927c3.866-1.056,9.315-4.218,12.146-7.05 L233.382,82.85c0.108-0.108,0.204-0.224,0.305-0.336l11.526-11.526c10.877-10.877,14.126-26.529,9.77-40.27 C258.121,27.325,259.857,22.955,259.857,18.309z"
                                ></path>
                            </g></svg
                        >
                    </button>
                    <button
                        class="delete"
                        type="button"
                        on:click={() => {
                            confirmationModal = true;
                            selected.set(idx);
                            editArticle.set(article.slug);
                            editTitle.set(article.title);
                            editSynopsis.set(article.synopsis);
                            editMarkdown.set(article.markdown);
                            editCategories.set(article.categories);
                            imageName.set(article.image);
                            imageTag.set(article.imageTag);
                            altImage.set(article.imageAlt);
                            selectedImage.placehold();
                            isThisNew.false();
                            return;
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line
                                x1="2"
                                y1="2"
                                x2="22"
                                y2="22"
                                stroke="red"
                                stroke-width="2"
                            />
                            <line
                                x1="22"
                                y1="2"
                                x2="2"
                                y2="22"
                                stroke="red"
                                stroke-width="2"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        {/each}
    </div>
</div>
{#if confirmationModal}
    <form
        method="POST"
        action="?/delete"
        use:enhance={() => {
            return async ({ result, update }) => {
                confirmationModal = false;
                if (result.type === "success") {
                    // show deleted file in `message` Modal
                    update({ reset: true });
                }
                editTitle.placehold();
                editSynopsis.placehold();
                editCategories.placehold();
                editMarkdown.placehold();
                selected.placehold();
                imageName.placehold();
                selectedImage.placehold();
                imageTag.placehold();
                altImage.placehold();
                isThisNew.reset();
                select = NaN;

                return await applyAction(result);
            };
        }}
    >
        <input
            type="hidden"
            name="delete-title"
            value={data.articles[select].title}
        />
        <input
            type="hidden"
            name="delete-slug"
            value={data.articles[select].slug}
        />
        <input
            type="hidden"
            name="delete-image"
            value={data.articles[select].image}
        />
        <div class="confirm-background">
            <div class="confirm">
                <h1>Warning</h1>
                <p>
                    {`This will permanently delete the article "${data.articles[select].title}", are you sure you want to delete this?`}
                </p>
                <div
                    style:display={"flex"}
                    style:flex-direction={"row"}
                >
                    <button class="continue" type="submit">
                        delete
                    </button>
                    <button
                        class="cancel"
                        on:click={() =>{
                                confirmationModal = false
                                document.getElementById(`${select}`)
                                    ?.classList.toggle("selected");
                                editTitle.placehold();
                                editSynopsis.placehold();
                                editCategories.placehold();
                                editMarkdown.placehold();
                                selected.placehold();
                                imageName.placehold();
                                selectedImage.placehold();
                                imageTag.placehold();
                                altImage.placehold();
                                isThisNew.reset();
                                select = NaN;
                                return;
                            }
                        }
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </form>
{/if}
<style>
    a {
        color: black;
        display: inline-block;
    }

    span {
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        color: #999;
        text-align: center;
    }

    .modify {
        text-align: center;
        width: 90%;
        height: auto;
        scrollbar-gutter: stable both-edges;
        margin-left: 10%;
        grid-row: 1;
        grid-column: 3;
    }

    .modify a {
        width: 100%;
        padding: 10px;
        text-decoration: none;
        text-align: left;
    }

    .modify a:hover {
        text-decoration: underline;
    }

    .modify-article {
        margin: auto;
        width: 80%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
        border-left: 2px solid white;
        padding: 4px;
    }

    .modify-article span {
        width: 100%;
        text-align: left;
    }

    .modify-article .views {
        width: fit-content;
        padding-right: 8px;
        padding-left: 16px;
    }

    .selected {
        background-color: rgb(97, 228, 103);
        filter: drop-shadow(0px 0px 5px rgba(0, 255, 0, 1));
    }

    .modify-article.selected {
        color: antiquewhite;
        margin: auto;
        width: 80%;
        grid-template-columns: 60% 20% 12% 8%;
        border-bottom: 2px solid rgba(255, 255, 255, 0.4);
        border-right: 2px solid rgba(255, 255, 255, 0.8);
        border-left: 2px solid rgba(255, 255, 255, 0.8);
        padding: 4px;
    }

    .modify-article.selected a {
        color: white;
    }

    .modify button {
        height: 24px;
        width: 24px;
        min-width: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        cursor: pointer;
        border: none;
    }

    .delete {
        height: 24px;
        width: 24px;
        outline: 1px solid red;
        cursor: pointer;
        margin-left: 4px;
        background-color: rgb(240, 240, 240);
    }

    .confirm {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 25px;
        background-color: aliceblue;
        border-radius: 4px;
        z-index: 999;
        filter: drop-shadow(2px 4px 6px rgb(81, 81, 81));
    }

    .confirm .continue {
        color: red;
        font-size: 1.2rem;
        width: 100%;
        height: 48px;
        font-variant-caps: all-small-caps;
        background-color: rgba(255, 123, 123, 0.303);
        border: 2px solid rgb(255, 0, 0);
        border-radius: 4px;
        margin-left: 12px;
        margin-right: 12px;
        cursor: pointer;
    }

    .confirm .cancel {
        color: rgb(0, 0, 0);
        font-size: 1.2rem;
        height: 48px;
        width: 100%;
        font-variant-caps: all-small-caps;
        background-color: rgba(134, 134, 134, 0.303);
        border: 2px solid rgb(65, 65, 65);
        border-radius: 4px;
        margin-left: 12px;
        margin-right: 12px;
        cursor: pointer;
    }

    .confirm-background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.381);
    }

    @media only screen and (max-width: 954px) {
        .modify {
            width: auto;
            margin: 0;
        }
    }
</style>

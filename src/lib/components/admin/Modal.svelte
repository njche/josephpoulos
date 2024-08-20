<script lang="ts">
    import { enhance } from "$app/forms";
    import { showAdminModal, adminDeleteReady, isLoading } from "$lib/utils/stores";
    export let message: string
    export let formDetails: { action: string, id: number, element: string }
    let submitter: HTMLButtonElement
</script>

{#if $showAdminModal}
    <form method="POST" action={formDetails.action} use:enhance={() => {
        isLoading.set(true)
        showAdminModal.set(false)
        return ({ result, update }) => {
            isLoading.set(false)
            if (result.type === 'success') {
                update({ reset: true })
                if (formDetails.action === '?/deleteComment') {
                    const comment = document.getElementById(formDetails.element)
                    comment?.remove()
                } else {
                    const reply = document.getElementById(formDetails.element)
                    reply?.remove()
                }
                adminDeleteReady.set(false)
            }
        }
    }}>
        <input type="text" name="id" value={formDetails.id} hidden>
        <button 
            type="submit"
            bind:this={submitter}>
        </button>
    </form>
    <div class="admin-modal">
        <div class="modal-message">
            <p>
                {message}
            </p>
            <div>
                <button on:click={() => {
                    adminDeleteReady.set(true)
                    submitter.click()
                }}>
                    Continue
                </button>
                <button on:click={() => {
                    showAdminModal.set(false)
                    adminDeleteReady.set(false)
                }}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .admin-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .381);
        z-index: 9;
    }

    .modal-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        padding: 24px;
        border-radius: 12px;
    }
    
    .admin-modal button {
        padding: 12px;
    }
</style>
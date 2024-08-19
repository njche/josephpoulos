<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    let message: string
</script>
    <form class="login" method="POST" action="?/login" use:enhance={() => {
        message = ''
        return ({ result }) => {
            if (result.data.success === false) {
                message = result.data.message
            } else {
                goto('/admin/panel')
            }
        }
    }}>
        <input type="text" name="username" placeholder="login">
        <input type="password" name="password" placeholder="password">
        <button type="submit">
            login
        </button>
        <p>
            {message ? message : ''}
        </p>
    </form>


<style>
    form {
        padding: 12px;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    form p {
        font-size: .9rem;
        text-align: center;
        color: red; 
    }

    form input {
        padding: 6px;
    }

    .login button {
        height: 40px;
    }
</style>
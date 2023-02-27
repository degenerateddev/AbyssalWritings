<script lang="ts">
    import Icon from '@iconify/svelte';
    import { AppBar } from '@skeletonlabs/skeleton';
    import { loggedInStore } from "$lib/stores";
    import Anchor from './Anchor.svelte';
	import { onMount } from 'svelte';

    /*var loggedIn: Boolean;
    onMount(() => {
        loggedInStore.subscribe(s => {
            console.log(s)
            if (s !== undefined) {
                loggedIn = s;
            }
        });
        console.log("Logged in: " + loggedIn)
    });*/

</script>

<AppBar class="border-b-2 border-b-gray-700 dark:border-b-zinc-400 shadow-gray-800 dark:shadow-stone-900 shadow-lg">
    <svelte:fragment slot="lead">
        <a href="/">
            <strong class="text-2xl uppercase">Abyssal Writings</strong>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <div class="btn-group-vertical md:btn-group variant-ghost-primary [&>*+*]:border-surface-900">
            <Anchor to="/stories">
                <Icon icon="ph:pen-nib" class="text-3xl"></Icon>
            </Anchor>
            <Anchor to="/genres">
                <Icon icon="dashicons:screenoptions" class="text-3xl"></Icon>
            </Anchor>
            <Anchor to="/project">
                <Icon icon="material-symbols:menu-book" class="text-3xl"></Icon>
            </Anchor>
            <Anchor to="/profile">
                <Icon icon="iconoir:profile-circle" class="text-3xl"></Icon>
            </Anchor>
            <Anchor to="/login">
                <Icon icon="grommet-icons:login" class="text-3xl"></Icon>
            </Anchor>
        </div>
    </svelte:fragment>
</AppBar>
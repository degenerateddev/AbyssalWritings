<script lang="ts">
    import { Avatar, FileButton, toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { userStore } from "$lib/stores";
    import { drawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';
    import type { User, Story, UserAvatar } from "$lib/types";
    import StoryPreview from "comps/StoryPreview.svelte";
	import Icon from "@iconify/svelte";

    export let data;
    let user: User = data.user;
    let avatar: UserAvatar = user.avatar;
    var likes: Array<Story> = data.likes;
    let saved: Array<Story> = data.saved;

    let date: string = user.date_joined.split("#")[0];

    let files: FileList;

    function showLikes(): void {
        const settings: DrawerSettings = {
            id: "likesDrawer",
            meta: { likes: likes }
        };
	    drawerStore.open(settings);
    }

    async function profilePicUpload() {
        const formData = new FormData();
        const image: File | null = files.item(0);
        if (image !== null) {
            formData.append("image", image)
            const response = await fetch("/actions/profile-pic", {
                method: "POST",
                headers: new Headers({
                    "Accept": "application/json"
                }),
                body: formData
            })

            if (response.ok) {
                const t: ToastSettings = {
                    message: 'Image uploaded successfully',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3000,
                    classes: 'bg-gradient-to-tr from-green-400 to-green-900 text-white',
                };
                toastStore.trigger(t);
                window.location.reload();
            }
        }
    }
</script>

<div class="container mx-auto h-full">

    <div class="grid grid-cols-3 gap-10">
        <div class="col-span-3 md:col-span-1">
            <div class="card space-y-10 p-5">
                <div class="card-header border-b-2 border-b-primary-600 py-5">
                    <div class="flex justify-center">
                        <FileButton bind:files button="bg-transparent" on:change={profilePicUpload}>
                            {#if avatar === null}
                                <Avatar initials={user.username.slice(0, 2)} class="w-60"></Avatar>
                            {:else}
                                <Avatar src={PUBLIC_BACKEND_URL + avatar.image} class="w-60"></Avatar>
                            {/if}
                        </FileButton>
                    </div>
                </div>
                <div class="flex items-center">
                    <h2 class="mr-auto">{user.username}</h2>
                    <h5 class="ml-auto">Beigetreten: {date}</h5>
                </div>
                <div class="card-footer">
                    <button class="btn variant-ghost-primary w-full" on:click={showLikes}>
                        <Icon icon="mdi:cards-heart" class="text-rose-800 text-4xl"></Icon>
                        <span class="text-2xl">Likes</span>
                    </button>
                </div>
            </div>            
        </div>

        <div class="col-span-3 md:col-span-2 space-y-5">
            <div class="flex justify-center">
                <h1>
                    <div class="flex">
                        <Icon icon="material-symbols:bookmark" class="text-yellow-600 text-4xl"></Icon>
                        <span class="text-3xl">Gespeicherte Stories</span>
                    </div>
                </h1>
            </div>
            <div class="grid grid-flow-col">
                {#each saved as save}
                    <StoryPreview story={save}></StoryPreview>
                {/each}
            </div>
        </div>

    </div>

</div>
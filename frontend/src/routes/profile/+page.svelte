<script lang="ts">
    import { Avatar, FileButton, toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { userStore } from "$lib/stores";
    import type { User, Story, UserAvatar } from "$lib/types";
    import StoryPreview from "comps/StoryPreview.svelte";
	import Icon from "@iconify/svelte";

    export let data;
    let user: User = data.user;
    let avatar: UserAvatar = user.avatar;
    let likes: Array<Story> = data.likes;
    let saved: Array<Story> = data.saved;

    let date: string = user.date_joined.split("#")[0];

    let files: FileList;

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

<div class="container mx-auto h-full py-10">

    <div class="grid grid-cols-3 gap-10">
        <div class="col-span-1">
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

                </div>
            </div>            
        </div>

        <div class="col-span-2 space-y-5">
            <div class="flex justify-center">
                <h1>
                    <Icon icon="mdi:cards-heart"></Icon>
                </h1>
            </div>
            <div class="grid grid-flow-col">
                {#each likes as like}
                    <StoryPreview story={like}></StoryPreview>
                {/each}
            </div>
            
            <div class="flex justify-center">
                <h1>
                    <Icon icon="material-symbols:bookmark"></Icon>
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
<script lang="ts">
    import type { Story } from "$lib/types";
    import Icon, { replaceIDs } from "@iconify/svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';

    export let story: Story;

    let show: boolean = true;

    async function toggle() {
        const uuid: string = story.uuid;
        const response = await fetch("/admin/actions/toggle-story", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            body: JSON.stringify({
                "uuid": uuid
            })
        })
    }
</script>

{#if show}
<div class="card card-hover" transition:fade>
    <div class="card-header">
        <h3>{story.title}</h3>
    </div>
    <div class="container p-5">
        <img src="http://127.0.0.1:8000{story.image}" class="object-contain max-h-72" alt="img" />
    </div>
    <div class="card-footer flex items-center mt-5 space-x-5">
        <form method="POST" action="admin/actions/rmv-story" use:enhance on:submit={() => show = false}>
            <input type="hidden" value="{story.uuid}" name="uuid" />
            <button class="btn-icon variant-filled-primary" type="submit">
                <span><Icon icon="material-symbols:delete-outline"></Icon></span>
            </button>
        </form>
        <button class="btn-icon variant-filled-primary" on:click={() => window.location.replace("/admin/edit-" + story.uuid)}>
            <span><Icon icon="material-symbols:edit-outline-rounded"></Icon></span>
        </button>
        <SlideToggle bind:checked={story.active} on:change={toggle}></SlideToggle>
    </div>
</div>
{/if}
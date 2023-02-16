<script lang="ts">
	import { enhance } from "$app/forms";
    import type { StoryLine } from "$lib/types";
    import Icon from "@iconify/svelte";
    import ManageEntry from "./ManageEntry.svelte";
    import { fade } from 'svelte/transition';

    export let storyline: StoryLine;

    let show: boolean = true;

</script>

{#if show}
<div class="container mx-auto bg-primary-700 p-5 space-y-5">
    <div class="card-header">
        <h2>{storyline.title}</h2>
    </div>
    <div class="flex gap-5">
        {#each storyline.stories as story}
            <ManageEntry story={story}></ManageEntry>
            <div class="text-6xl my-auto">&rsaquo;</div>
        {/each}
    </div>
    <div class="flex justify-start mt-5 space-x-5">
        <form method="POST" action="admin/actions/rmv-storyline" use:enhance on:submit={() => show = false}>
            <input type="hidden" value="{storyline.uuid}" name="uuid" />
            <button class="btn-icon variant-filled-primary" type="submit">
                <span><Icon icon="material-symbols:delete-outline"></Icon></span>
            </button>
        </form>
        <form action="" method="GET">
            <button class="btn-icon variant-filled-primary">
                <span><Icon icon="material-symbols:edit-outline-rounded"></Icon></span>
            </button>
        </form>
    </div>
</div>
{/if}
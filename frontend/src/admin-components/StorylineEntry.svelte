<script lang="ts">
    import type { StoryLine } from "$lib/types";
    import Icon from "@iconify/svelte";
    import ManageEntry from "./ManageEntry.svelte";

    export let storyline: StoryLine;

</script>

<div class="container mx-auto">
    <div class="">
        {storyline.title}
    </div>
    <div class="flex gap-10">
        {#each storyline.stories as story}
            <ManageEntry story={story}></ManageEntry>
            <div class="items-center">&rsaquo;</div>
        {/each}
    </div>
    <div class="flex justify-start">
        <form action="?/storyline" method="DELETE">
            <button class="btn-icon variant-filled-primary">
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
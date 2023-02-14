<script lang="ts">
    import ManageEntry from "admin-comps/ManageEntry.svelte";
    import StorylineEntry from "admin-comps/StorylineEntry.svelte";

    export let data: Object;
</script>

<div class="container mx-auto py-10">
    <div class="grid grid-cols-[auto_auto_auto]">
        {#each data.storylines as storyline}
            <StorylineEntry storyline={storyline}></StorylineEntry>
        {/each}
    </div>

    <div class="flex justify-start">
        Stories
    </div>

    <div class="grid grid-cols-5">
        {#each data.stories as story}
            <ManageEntry story={story}></ManageEntry>
        {/each}
    </div>
</div>
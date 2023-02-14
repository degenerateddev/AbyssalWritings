<script lang="ts">
    import StoryPreview from "comps/StoryPreview.svelte";
    import Banner from "comps/Banner.svelte";

    export let data: Object;
</script>

<div class="container mx-auto py-10 space-y-10">
    <Banner name={data.genre.name} description={data.genre.description} banner={data.genre.banner}></Banner>

    <div class="flex justify-evenly">
        {#each data.stories as story}
            <StoryPreview story={story}></StoryPreview>
        {/each}
    </div>
</div>
<script lang="ts">
    import StoryPreview from "comps/StoryPreview.svelte";
    import Banner from "comps/Banner.svelte";
    import type { Genre, Story } from "$lib/types";

    export let data;
    let stories: Array<Story> = data.stories;
    let genre: Genre = data.genre;
</script>

<div class="container mx-auto py-10 space-y-10">
    <Banner name={genre.name} description={genre.description} banner={genre.banner}></Banner>

    <div class="flex justify-evenly">
        {#each stories as story}
            <StoryPreview story={story}></StoryPreview>
        {/each}
    </div>
</div>
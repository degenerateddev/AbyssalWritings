<script lang="ts">
    import StoryPreview from "comps/StoryPreview.svelte";
    import Banner from "comps/Banner.svelte";
    import type { Genre, Story } from "$lib/types";

    export let data;
    let stories: Array<Story> = data.stories;
    let genre: Genre = data.genre;
</script>

<div class="container mx-auto space-y-10">
    <Banner name={genre.name} description={genre.description} banner={genre.banner}></Banner>

    <div class="grid grid-flow-col">
        {#each stories as story}
            <StoryPreview story={story}></StoryPreview>
        {/each}
    </div>
</div>
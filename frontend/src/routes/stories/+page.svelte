<script lang="ts">
	import type { Story } from "$lib/types";
    import StoryPreview from "comps/StoryPreview.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
    let stories: Array<Story> = data.stories;
</script>

<div class="container mx-auto">
    <div class="flex justify-center mb-20">
        <h1>Kurzgeschichten</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-flow-col gap-10">
        {#each stories as story}
            <StoryPreview story={story}></StoryPreview>
        {/each}
    </div>
</div>
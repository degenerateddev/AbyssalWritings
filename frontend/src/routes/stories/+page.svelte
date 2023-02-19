<script lang="ts">
	import type { Story } from "$lib/types";
    import StoryPreview from "comps/StoryPreview.svelte";
    import { register } from "swiper/element/bundle";
    import type { PageData } from './$types';

    register();

    export let data: PageData;
    let stories: Array<Story> = data.stories;
</script>

<div class="container mx-auto py-10">
    <div class="flex justify-center mb-20">
        <h1>Kurzgeschichten</h1>
    </div>
    <swiper-container speed="200" space-between="40" loop="true" slides-per-view="3" pagination="true" navigation="true" scrollbar="true">
        {#each stories as story}
        <swiper-slide>
            <StoryPreview story={story}></StoryPreview>
        </swiper-slide>
        {/each}
    </swiper-container>
</div>
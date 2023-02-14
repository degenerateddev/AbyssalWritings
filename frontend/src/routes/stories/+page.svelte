<script lang="ts">
    import StoryPreview from "comps/StoryPreview.svelte";
    import { register } from "swiper/element/bundle";

    register();

    export let data: Object;
</script>

<div class="container mx-auto py-10">
    <div class="flex justify-center mb-20">
        <h1>Kurzgeschichten</h1>
    </div>
    <swiper-container speed="200" space-between="40" loop="true" slides-per-view="3" pagination="true" navigation="true" scrollbar="true">
        {#each data.stories as story}
        <swiper-slide>
            <StoryPreview story={story}></StoryPreview>
        </swiper-slide>
        {/each}
    </swiper-container>
</div>
<script lang="ts">
    import { storyStore } from "$lib/stores";
    import type { Story } from "$lib/types";

    let story : Story;
    storyStore.subscribe(s => {
        story = s;
    });
</script>

<div class="container mx-auto py-10">
    <div class="flex justify-start">
        <ol class="breadcrumb">
            <li class="crumb"><a href="/stories">Stories</a></li>
            <li class="crumb-separator" aria-hidden>&rsaquo;</li>
            {#if story.genre !== null}
                <li class="crumb"><a href="/genres/{story.genre.name}">{story.genre.name}</a></li>
                <li class="crumb-separator" aria-hidden>&rsaquo;</li>
            {/if}
            <li class="crumb"><a href="/stories/story-{story.uuid}">{story.title}</a></li>
        </ol>
    </div>
</div>
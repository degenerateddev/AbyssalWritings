<script lang="ts">
    import type { Story } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let story: Story;
</script>

<div class="card card-hover">
    <div class="card-header">
        {story.title}
    </div>
    <div class="container">
        <img src="http://127.0.0.1:8000{story.image}" class="object-contain max-h-72" alt="img" />
    </div>
    <div class="card-footer">
        <form action="?/story" method="DELETE">
            <button class="btn-icon variant-filled-primary">
                <span><Icon icon="material-symbols:delete-outline"></Icon></span>
            </button>
        </form>
        <SlideToggle bind:checked={story.active}></SlideToggle>
        <form action="" method="GET">
            <button class="btn-icon variant-filled-primary">
                <span><Icon icon="material-symbols:edit-outline-rounded"></Icon></span>
            </button>
        </form>
    </div>
</div>
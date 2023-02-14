<script lang="ts">
    import type { Story } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let story: Story;

    function setActive() {

    }
</script>

<div class="card card-hover">
    <div class="card-header">
        <h3>{story.title}</h3>
    </div>
    <div class="container p-5">
        <img src="http://127.0.0.1:8000{story.image}" class="object-contain max-h-72" alt="img" />
    </div>
    <div class="card-footer flex items-center mt-5 space-x-5">
        <form action="?/story" method="DELETE">
            <button class="btn-icon variant-filled-primary">
                <span><Icon icon="material-symbols:delete-outline"></Icon></span>
            </button>
        </form>
        <button class="btn-icon variant-filled-primary" on:click={() => window.location.replace("/edit-" + story.uuid)}>
            <span><Icon icon="material-symbols:edit-outline-rounded"></Icon></span>
        </button>
        <SlideToggle bind:checked={story.active} on:change={setActive}></SlideToggle>
    </div>
</div>
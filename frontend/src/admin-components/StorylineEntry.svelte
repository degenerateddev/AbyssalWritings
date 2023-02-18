<script lang="ts">
    import ManageEntry from "./ManageEntry.svelte";
    import Icon from "@iconify/svelte";
	import type { Story } from "$lib/types";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { fade } from 'svelte/transition';
    import type { ToastSettings } from "@skeletonlabs/skeleton";

    export let story: Story;
    export let storyline_uuid: string;

    var show: boolean = true;

    async function rmv_from_storyline(storyline: string, story: string) {
        const response = await fetch("/admin/actions/rmv-from-storyline/", {
            "method": "PUT",
            "headers": new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            body: JSON.stringify({
                story: story,
                storyline: storyline
            })
        });

        if (response.ok) {
            show = false;
            const t: ToastSettings = {
                message: 'Removed from storyline',
                // Optional: The auto-hide settings
                autohide: true,
                timeout: 3000,
                classes: 'bg-gradient-to-tr from-green-400 to-green-900 text-white',
            };
            toastStore.trigger(t);
        }
    }
</script>

{#if show}
    <div class="flex" transition:fade>
        <ManageEntry story={story}></ManageEntry>
        <a href="#" class="btn variant-ghost-error hover:variant-filled-error duration-150 h-full" on:click={() => rmv_from_storyline(storyline_uuid, story.uuid)}>
            <Icon icon="material-symbols:remove-sharp"></Icon>
        </a>
        <div class="text-6xl my-auto">&rsaquo;</div>
    </div>
{/if}
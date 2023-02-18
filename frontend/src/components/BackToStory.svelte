<script lang="ts">
    import { Toast, toastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings } from '@skeletonlabs/skeleton';
    import type Story from "$lib/types";
    import { storyStore } from "$lib/stores";
	import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    let uuid: string;

    onMount(() => {
        storyStore.subscribe(s => { // or try get(storyStore);
            if (s !== undefined) {
                uuid = s.uuid;
            }
        });
    });

    function triggerToast(): void {
        toastStore.clear();

        const t: ToastSettings = {
            message: 'Möchten Sie "' + $storyStore.title + '" fortsetzen?',
            // Optional: Presets for primary | secondary | tertiary | warning
            preset: 'primary',
            // Optional: The auto-hide settings
            autohide: true,
            timeout: 5000,
            // Optional: Adds a custom action button
            action: {
                label: 'Weiterlesen',
                response: () => { window.location.replace("/stories/story-" + $storyStore.uuid); }
            }
        };
        toastStore.trigger(t);
    }
</script>

<div class="right-5 p-5 fixed z-[999]">
    <button class="btn variant-ghost-primary" on:click={triggerToast}>Get back to reading</button>
</div>
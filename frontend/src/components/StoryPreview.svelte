<script lang="ts">
    import type { Story } from "$lib/types";
    import Icon from "@iconify/svelte";
    import AdminAvatar from "./AdminAvatar.svelte";

    export let story: Story;
</script>

<a class="card card-hover bg-primary-backdrop-token variant-ghost-surface overflow-hidden md:max-w-[25vw]" href="/stories/story-{story.uuid}/">
    <header class="text-left">
        <img class="bg-black/50 w-full object-cover aspect-[21/9] border-b-2 border-b-primary-500" src="http://127.0.0.1:8000{story.image}" alt="img">
        <h3 class="m-5">{story.title}</h3>
    </header>
    
    <div class="p-5 text-left">
        <p class="break-words line-clamp-3">{story.content}</p>
    </div>

    <footer class="card-footer border-t-2 border-t-white">
        <div class="flex justify-around items-center py-5">
            <AdminAvatar />
            <div class="flex items-center gap-2">
                <span>{story.hearts}</span>
                <Icon icon="mdi:cards-heart"></Icon>
            </div>
            <span class="text-sm">{story.date}</span>
        </div>
    </footer>
</a>
<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import type { StoryPreview } from "$lib/types";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    
    let story: StoryPreview;
    let loaded: boolean = false;

    onMount(async () => {
        const response = await fetch(PUBLIC_BACKEND_URL + "/api/showcase/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            story = {
                uuid: data.uuid,
                title: data.title,
                image: data.image,
                content: data.content,
                date: data.date,
                hearts: data.hearts
            }
            loaded = true;
        }
    });
</script>

{#if loaded}
    <div class="container mx-auto">
        <div class="bg-surface-700 grid grid-cols-1 md:grid-cols-3">
            <div class="col-span-1">
                <a href="/stories/story-{story.uuid}/">
                    <img class="object-cover" src="{PUBLIC_BACKEND_URL}{story.image}" alt="img" />
                </a>
            </div>
            <div class="col-span-2 space-y-10 text-left p-5 relative">
                <span class="text-5xl uppercase">{story.title}</span>
                <p class="line-clamp-6">
                    {story.content}
                </p>
                <div class="flex w-[90%] absolute bottom-2 pt-10">
                    <div class="flex justify-start gap-2 items-center text-lg">
                        <span>{story.hearts}</span>
                        <Icon icon="mdi:cards-heart"></Icon>
                    </div>
                    <small class="ml-auto text-sm">{story.date}</small>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="col-span-1 bg-surface-500">
            </div>
            <div class="col-span-2 bg-surface-700 space-y-10 text-left p-10">
                <span class="text-5xl uppercase space-y-5">
                    <div class="placeholder animate-pulse"></div>
                    <div class="placeholder animate-pulse w-1/4"></div>
                    <div class="placeholder animate-pulse w-full"></div>
                    <div class="placeholder animate-pulse w-1/2"></div>
                    <div class="placeholder animate-pulse w-1/4"></div>
                </span>
            </div>
        </div>
    </div>
{/if}
<script lang="ts">
    import type Story from "$lib/types";
    import Banner from "comps/Banner.svelte";
    import Icon from "@iconify/svelte";

    export let data: Object;

    export let liked: boolean = false;

    let story: Story = data.story;

    async function like() {
        const response = await fetch("http://127.0.0.1:8000/api/like/", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                "uuid": story.uuid
            })
        });

        if (response.ok) {
            liked = true;
        }
    }

    async function unlike() {
        const response = await fetch("http://127.0.0.1:8000/api/unlike/", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                "uuid": story.uuid
            })
        });

        if (response.ok) {
            liked = false;
        }
    }

    
</script>

<div class="container mx-auto space-y-10">
    <Banner name={story.title} banner={story.image}></Banner>
    
    <div class="container relative">
        <pre class="first-letter:text-6xl first-letter:font-bold first-line:float-left tracking-normal whitespace-normal" style="background-color: transparent;">
            <span class="text-2xl font-sans font-light break-words">{story.content}</span>
        </pre>
        <div class="flex gap-10">
            <ul class="px-5 float-right list-option border-primary-500 border-2">
                <li>{story.date}</li>
                <li>&rsaquo;</li>
                <li>
                    <div class="flex items-center gap-2">
                        <span>{story.hearts}</span>
                        <Icon icon="mdi:cards-heart"></Icon>
                    </div>
                </li>
            </ul>
            <div class="space-x-10 ml-auto">
                {#if liked}
                    <button class="text-4xl" on:click={unlike}>
                        <Icon icon="mdi:cards-heart"></Icon>
                    </button>
                {:else}
                    <button class="text-4xl text-rose-800 hover:text-rose-600 hover:scale-105 duration-200" on:click={like}>
                        <Icon icon="mdi:cards-heart"></Icon>
                    </button>
                {/if}
                <button class="text-4xl text-zinc-200 hover:text-zinc-50 hover:scale-105 duration-200">
                    <Icon icon="material-symbols:share"></Icon>
                </button>
            </div>
        </div>
    </div>
</div>
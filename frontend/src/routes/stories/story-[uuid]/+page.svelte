<script lang="ts">
    import type { Story } from "$lib/types";
    import Banner from "comps/Banner.svelte";
    import Icon from "@iconify/svelte";
	import { redirect } from "@sveltejs/kit";
	import { onMount } from "svelte";

    export let data;

    let story: Story = data.story;
    let liked: boolean = story.liked;

    var paragraphs: Array<String>;
    
    if (story.content && story.content.length > 0) {
        paragraphs = story.content.split("\n");
    }

    async function like() {
        const response = await fetch("/actions/like", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: JSON.stringify({
                "uuid": story.uuid
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.error !== undefined || data.status === 400) {
                window.location.replace("/login/")
            }
            liked = true;
        }
    }

    async function unlike() {
        const response = await fetch("/actions/unlike", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: JSON.stringify({
                "uuid": story.uuid
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.error !== undefined) {
                window.location.replace("/login/")
            }
            liked = false;
        }
    }

    
</script>

<div class="container mx-auto space-y-10">
    <Banner name={story.title} banner={story.image}></Banner>
    
    <div class="container relative">
        <!--<pre class=" first-letter:text-6xl first-letter:font-bold first-line:float-left tracking-normal whitespace-normal" style="background-color: transparent;">
            <span class="text-2xl font-sans leading-relaxed font-light break-normal">{story.content}</span>
        </pre>-->
        <div class="space-y-10">
            {#each paragraphs as paragraph, _}
                {#if _ === 0}
                    <p class="first-letter:text-6xl first-letter:font-bold tracking-normal">
                        <span class="text-2xl leading-relaxed font-light break-normal">{paragraph}</span>
                    </p>
                {:else}
                    <p class="tracking-normal">
                        <span class="text-2xl leading-relaxed font-light break-normal">{paragraph}</span>
                    </p>
                {/if}
            {/each}
        </div>
        <div class="flex gap-10 mt-10">
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
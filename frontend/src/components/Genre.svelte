<script lang="ts">
    import type { Genre } from "$lib/types";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    export let genre: Genre;
    export let left: boolean = true;
</script>

<a href="/genres/{genre.name}" class="rounded-lg variant-ghost-primary p-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {#if left}
            <img class="object-contain col-span-1 max-w-[60vw] md:max-w-[25vw] rounded-lg mx-auto" src="{PUBLIC_BACKEND_URL}{genre.banner}" alt="img" />
            <div class="col-span-1 mr-auto space-y-5 my-auto">
                <h2 class="text-right text-white no-underline hover:underline">{genre.name}</h2>
                <p class="text-right text-white no-underline hover:underline">{genre.description}</p>
            </div>
        {:else}
            <div class="col-span-1 mr-auto space-y-5 my-auto">
                <h2 class="text-white no-underline hover:underline">{genre.name}</h2>
                <p class="text-white no-underline hover:underline">{genre.description}</p>
            </div>
            <img class="object-contain col-span-1 max-w-[60vw] md:max-w-[25vw] rounded-lg mx-auto" src="{PUBLIC_BACKEND_URL}{genre.banner}" alt="img" />
        {/if}
    </div>
</a>
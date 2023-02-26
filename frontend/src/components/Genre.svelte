<script lang="ts">
    import type { Genre } from "$lib/types";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    export let genre: Genre;
    export let left: boolean = true;
</script>

<a class="col-span-1" href="/genres/{genre.name}">
    <div class="grid grid-cols-2 gap-0">
        {#if left}
        <img class="object-contain col-span-1 max-w-[25vw] rounded-lg mr-auto" src="{PUBLIC_BACKEND_URL}{genre.banner}" alt="img" />
        <div class="col-span-1 mr-auto px-5 space-y-5 my-auto">
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
        </div>
        {:else}
        <div class="col-span-1 mr-auto px-5 space-y-5 my-auto">
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
        </div>
        <img class="object-contain col-span-1 max-w-[25vw] rounded-lg ml-auto" src="{PUBLIC_BACKEND_URL}{genre.banner}" alt="img" />
        {/if}
    </div>
</a>
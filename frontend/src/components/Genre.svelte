<script lang="ts">
    import type { Genre } from "$lib/types";

    export let genre: Genre;
    export let left: boolean = true;
</script>

<a class="col-span-1" href="/genres/{genre.name}">
    <div class="grid grid-cols-2 gap-0">
        {#if left}
        <img class="object-contain col-span-1 max-w-[25vw] rounded-lg mr-auto" src="http://127.0.0.1:8000{genre.banner}" alt="img" />
        <div class="col-span-1 mr-auto px-5 space-y-5 my-auto">
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
        </div>
        {:else}
        <div class="col-span-1 mr-auto px-5 space-y-5 my-auto">
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
        </div>
        <img class="object-contain col-span-1 max-w-[25vw] rounded-lg ml-auto" src="http://127.0.0.1:8000{genre.banner}" alt="img" />
        {/if}
    </div>
</a>
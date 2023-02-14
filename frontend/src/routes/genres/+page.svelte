<script lang="ts">
    import Genre from "comps/Genre.svelte";

    export let data: Object;
</script>

<div class="container mx-auto py-10">
    <div class="flex justify-center mb-20">
        <h1>Genres</h1>
    </div>
    <div class="grid grid-flow-row gap-32">
        {#each data.genres as genre, i}
            {#if i % 2 != 0}
                <Genre genre={genre}></Genre>
            {:else}
                <Genre genre={genre} left={false}></Genre>
            {/if}
        {/each}
    </div>
</div>
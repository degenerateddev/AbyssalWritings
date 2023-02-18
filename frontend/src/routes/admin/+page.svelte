<script lang="ts">
    import ManageEntry from "admin-comps/ManageEntry.svelte";
    import Storyline from "admin-comps/Storyline.svelte";

    export let data: any;
</script>

<div class="container mx-auto py-10">
    <div class="flex justify-start my-5">
        <h1>Storylines</h1>
    </div>
    <div class="grid grid-cols-[auto_auto_auto]">
        {#each data.storylines as storyline}
            <Storyline storyline={storyline}></Storyline>
        {/each}
    </div>

    <div class="flex justify-start mb-5 mt-16">
        <h1>Stories</h1>
    </div>

    <div class="grid grid-cols-5 gap-10">
        {#each data.stories as story}
            <ManageEntry story={story}></ManageEntry>
        {/each}
    </div>
</div>
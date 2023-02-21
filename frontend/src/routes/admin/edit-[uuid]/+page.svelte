<script lang="ts">
    import TipTapEditor from "admin-comps/TipTapEditor.svelte";

    //https://github.com/umaranis/svelte-lexical
    export let data: any;
</script>

<div class="container mx-auto py-10">
    <TipTapEditor story={data.story} editing={true} />
</div>
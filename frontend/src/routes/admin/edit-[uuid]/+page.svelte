<script lang="ts">
    import TipTapEditor from "admin-comps/TipTapEditor.svelte";

    //https://github.com/umaranis/svelte-lexical
    export let data: Object;
    let uuid: string = data.uuid;
    let title: string = data.title;
    let content: string = data.content;
</script>

<div class="container mx-auto py-10">
    <TipTapEditor uuid={uuid} title={title} content={content} />
</div>
<script lang="ts">
    import TipTapEditor from "admin-comps/TipTapEditor.svelte";

    //https://github.com/umaranis/svelte-lexical
    export let data: any;
    let uuid: string = data.story.uuid;
    let title: string = data.story.title;
    let content: string = data.story.content;
</script>

<div class="container mx-auto py-10">
    <TipTapEditor uuid={uuid} title={title} content={content} />
</div>
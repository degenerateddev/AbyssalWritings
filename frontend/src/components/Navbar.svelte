<script lang="ts">
    import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
    import Anchor from './Anchor.svelte';
</script>

<AppBar class="border-b-2 border-b-gray-700 dark:border-b-zinc-400 shadow-gray-800 dark:shadow-stone-900 shadow-lg">
    <svelte:fragment slot="lead">
        <a href="/">
            <strong class="text-2xl uppercase">Abyssal Writings</strong>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch></LightSwitch>
        <div class="btn-group-vertical md:btn-group variant-ghost-primary [&>*+*]:border-surface-900">
            <Anchor to="/stories" text="Kurzgeschichten"></Anchor>
            <Anchor to="/genres" text="Genres"></Anchor>
            <Anchor to="/project" text="Buch Projekt"></Anchor>
        </div>
    </svelte:fragment>
</AppBar>
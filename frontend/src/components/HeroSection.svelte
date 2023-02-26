<script lang="ts">
    export let title: string;
    export let description: string;

    export let horizontal: boolean = true;
</script>

<div class="container mx-auto space-y-10 bg-surface-900 py-10 px-5">
    <div class="flex justify-center">
        <h1 class="font-extrabold tracking-tight">{title}</h1>
    </div>
    <div class="flex justify-center py-10">
        <span class="text-base">{description}</span>
    </div>
    {#if horizontal}
        <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-20">
            <slot />
        </div>
    {:else}
        <div class="grid grid-cols-1 gap-y-20">
            <slot />
        </div>
    {/if}
</div>
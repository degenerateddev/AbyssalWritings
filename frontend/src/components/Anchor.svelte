<script lang="ts">
    export let to: string;

    export let primary: boolean = false;
</script>

<a href="{to}" class="btn" class:variant-ghost-primary={primary}>
    <slot />
</a>
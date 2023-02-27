<script lang="ts">
    export let to: string;
    export let primary: boolean = false;
</script>

<a href="{to}" class="btn hover:bg-primary-600 bg-primary-800" class:variant-ghost-primary={primary}>
    <slot />
</a>
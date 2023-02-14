<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { AppRail, AppRailTile } from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    
    const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue}>
    <AppRailTile tag="a" href="/admin" title="Home" class="text-3xl">
        <Icon icon="material-symbols:home"></Icon>
    </AppRailTile>
    <AppRailTile tag="a" href="/admin/write" title="Writing" class="text-3xl">
        <Icon icon="icon-park-outline:writing-fluently"></Icon>
    </AppRailTile>
    <AppRailTile tag="a" href="/admin/manage" title="Manage" class="text-3xl">
        <Icon icon="material-symbols:manage-accounts-outline"></Icon>
    </AppRailTile>
</AppRail>
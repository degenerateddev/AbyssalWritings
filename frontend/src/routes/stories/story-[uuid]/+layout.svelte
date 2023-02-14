<script>
	import { AppShell } from '@skeletonlabs/skeleton';
    import GenreBreadcrumb from 'comps/GenreBreadcrumb.svelte';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	
	<svelte:fragment slot="pageHeader">
        <GenreBreadcrumb />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

</AppShell>

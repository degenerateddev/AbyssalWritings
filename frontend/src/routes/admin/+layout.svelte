<script lang="ts">
	/*import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';*/
	import { AppShell } from '@skeletonlabs/skeleton';
    import Sidebar from "admin-comps/Sidebar.svelte";
	import { navigating } from '$app/stores';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-primary-900 w-56 p-4">
	
	<svelte:fragment slot="sidebarLeft">
        <Sidebar></Sidebar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>

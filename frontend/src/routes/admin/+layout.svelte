<script lang="ts">
	/*import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';*/
	import { AppShell } from '@skeletonlabs/skeleton';
    import Sidebar from "admin-comps/Sidebar.svelte";

	/*import { authGuard } from '$lib/guards';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit/types.internal';

	export async function load({ page, fetch, session, context }: LoadInput): Promise<LoadOutput> {
		return await authGuard({ page, fetch, session, context });
	}*/
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-primary-900 w-56 p-4">
	
	<svelte:fragment slot="sidebarLeft">
        <Sidebar></Sidebar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>

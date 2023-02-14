<script>
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, Toast, Modal } from '@skeletonlabs/skeleton';
	import Navbar from 'comps/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import BackToStory from 'comps/BackToStory.svelte';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		ease: 'ease',
		template: '<div class="bar" style="background-color: purple;" role="bar"><div class="peg"></div></div>'
	});
 
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	
	<Toast />
	<Modal />
	
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<BackToStory />
	</svelte:fragment>

	<!-- Page Route Content -->
	<!--<Cookie />-->
	<slot />

	<Footer></Footer>
</AppShell>
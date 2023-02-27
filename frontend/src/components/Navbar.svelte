<script lang="ts">
    import Icon from '@iconify/svelte';
    import { AppBar } from '@skeletonlabs/skeleton';
    import Anchor from './Anchor.svelte';
	import { onMount } from 'svelte';
  
    let innerWidth : number = 0;
    let show = false;
    let md = false;
  
    onMount(() => {
      if (innerWidth > 640) {
        md = true;
        show = true;
      } else {
        show = false;
      }
    });
  
    function Menu() {
      if (show === true) {
        show = false;
      } else {
        show = true;
      }
    }
</script>
  
<svelte:window bind:innerWidth></svelte:window>

<AppBar class="border-b-2 border-b-gray-700 dark:border-b-zinc-400 shadow-gray-800 dark:shadow-stone-900 shadow-lg">
    <div class="flex items-center">
        <a href="/" class="mr-auto">
            <strong class="text-2xl uppercase">Abyssal Writings</strong>
        </a>

        <div class:hidden={!show} class="container w-fit ml-auto md:block">
            <div class="flex flex-wrap">
                <Anchor to="/stories">
                    <Icon icon="ph:pen-nib" class="text-lg md:text-3xl"></Icon>
                </Anchor>
                <Anchor to="/genres">
                    <Icon icon="dashicons:screenoptions" class="text-lg md:text-3xl"></Icon>
                </Anchor>
                <Anchor to="/project">
                    <Icon icon="material-symbols:menu-book" class="text-lg md:text-3xl"></Icon>
                </Anchor>
                <Anchor to="/profile">
                    <Icon icon="iconoir:profile-circle" class="text-lg md:text-3xl"></Icon>
                </Anchor>
                <Anchor to="/login">
                    <Icon icon="grommet-icons:login" class="text-lg md:text-3xl"></Icon>
                </Anchor>
            </div>
        </div>

        <button on:click={Menu} data-collapse-toggle="navbar-default" type="button" class="ml-3 md:hidden inline-flex items-center p-2 mr-2 my-2 text-sm text-gray-500 rounded-lg focus:outline-none hover:bg-zinc-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>

    </div>
</AppBar>
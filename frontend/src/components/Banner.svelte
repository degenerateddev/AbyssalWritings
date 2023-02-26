<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    export let name: string;
    export let description: string = "";
    export let banner: string;

    if (!banner.includes(PUBLIC_BACKEND_URL)) {
        banner = PUBLIC_BACKEND_URL + banner;
    }

    console.log(banner)
</script>

<div class="wrap relative border-stone-900 border-2">
    <img class="w-full max-h-[55vh] bg-no-repeat object-fill sepia-0 hover:sepia duration-200" src="{banner}" alt="banner" />
    <div class="container pt-10 pb-4 pl-4 backdrop-blur-sm bg-white/30 absolute bottom-0">
        <div class="flex justify-start">
            <h1 class="text-gray-900">{name}</h1>
        </div>
        <div class="flex justify-start mt-10">
            <span class="text-gray-900 text-lg">{description}</span>
        </div>
    </div>
</div>
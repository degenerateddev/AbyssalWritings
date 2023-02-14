<script lang="ts">
    export let name: string;
    export let description: string = "";
    export let banner: string;
</script>

<div class="wrap relative border-stone-900 border-2">
    <img class="w-full max-h-[55vh] bg-no-repeat object-fill sepia-0 hover:sepia duration-200" src="http://127.0.0.1:8000{banner}" alt="banner" />
    <div class="container pt-10 pb-4 pl-4 backdrop-blur-sm bg-white/30 absolute bottom-0">
        <div class="flex justify-start">
            <h1 class="text-gray-900">{name}</h1>
        </div>
        <div class="flex justify-start mt-10">
            <span class="text-gray-900 text-lg">{description}</span>
        </div>
    </div>
</div>
<script lang="ts">
	import Showcase from "comps/Showcase.svelte";
	import StoryPreview from "comps/StoryPreview.svelte";
	import HeroSection from "comps/HeroSection.svelte";
	import Genre from "comps/Genre.svelte";
	import type { StoryPreview, Genre } from "$lib/types";

	export let data: Object;

	let newest: Array<Story> = data.newest;
	let fav: Array<Genre> = data.fav;
</script>

<div class="container h-full mx-auto flex justify-center py-10">
	<div class="space-y-10 text-center">

		<div class="flex justify-center py-10">
			<h1 class="font-light anim backdrop-blur-3xl bg-clip-text text-transparent box-decoration-clone bg-gradient-to-tr from-primary-500 via-rose-700 to-surface-500"><span class="font-mono text-6xl">Willkommen zu Abyssal Writings!</span></h1>
		</div>

		<Showcase></Showcase>

		<HeroSection title="Neueste" description="Meine neuesten Geschichten, gleich hier.">
			{#each newest as story}
				<StoryPreview story={story}></StoryPreview>
			{/each}
		</HeroSection>

		<HeroSection horizontal={false} title="Lieblings Genres" description="Hier befinden sich meine Lieblinge im Bereich Schreiben.">
			{#each fav as genre, index}
				{#if index % 2 != 0}
				<Genre left={true} genre={genre}></Genre>
				{:else}
				<Genre left={false} genre={genre}></Genre>
				{/if}
			{/each}
		</HeroSection>
	</div>
</div>

<style lang="postcss">
	.anim {
		animation: anim-text 3s infinite;
	}
	@keyframes anim-text {
		/*from {
			text-shadow:0px 0px 3px rgb(199, 199, 199),0px 0px 3px #b67b37;
		}
  		to {
			text-shadow:0px 0px 10px rgb(199, 199, 199),0px 0px 10px #b67b37;
		}*/
		/*0%, 100% {
			background-size: 10vw;
		}
		50% {
			background-size: 20vw;
		}*/
	}
</style>

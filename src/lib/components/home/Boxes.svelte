<script lang="ts">
	import Box from './Box.svelte';
	import { boxes } from '$lib/constants/home/boxes';

	let hoveredBoxIndex: number | null = null;
</script>

<section class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
	{#each boxes as box, index}
		<div
			aria-roledescription="Tiles of a grid of features"
			role="grid"
			tabindex={-1}
			class="h-full"
			on:mouseenter={() => {
				hoveredBoxIndex = index;
			}}
			on:mouseleave={() => {
				hoveredBoxIndex = null;
			}}
		>
			<Box
				emoji={box.emoji}
				title={box.title}
				description={box.description}
				disfoccused={hoveredBoxIndex !== null && hoveredBoxIndex !== index}
			/>
		</div>
	{/each}
</section>

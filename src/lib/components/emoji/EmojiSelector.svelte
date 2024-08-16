<script lang="ts">
	import { animationLength } from '$lib/utils/store/animation';
	import { useCycle } from '$lib/utils/store/cycle';
	import type { Gemoji } from 'gemoji';
	import { clickOutside } from 'nutzlich';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';

	export let emoji: (Gemoji | (Gemoji & { distance: number }))[];

	const dispatch = createEventDispatcher<{ select: Gemoji }>();

	const focusedInd = useCycle({
		max: () => emoji.length - 1
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (emoji.length < 1) return;
		const { key } = e;
		switch (key) {
			case 'ArrowDown':
				e.preventDefault();
				focusedInd.inc();
				break;
			case 'ArrowUp':
				e.preventDefault();
				focusedInd.dec();
				break;
			case 'Enter':
				e.preventDefault();
				dispatch('select', emoji[$focusedInd]);
				emoji = [];
				break;
		}
	}}
/>

<div
	class="flex flex-col overflow-hidden rounded bg-zinc-300 shadow dark:bg-zinc-700"
	use:clickOutside={{
		callback() {
			emoji = [];
		}
	}}
>
	{#each emoji as recommendation, index (recommendation.emoji)}
		{@const isFocused = index === $focusedInd}
		<button
			class="px-2 py-1 text-start text-lg"
			class:bg-zinc-400={isFocused}
			class:dark:bg-zinc-600={isFocused}
			on:mousemove={() => {
				focusedInd.set(index);
			}}
			animate:flip={{ duration: $animationLength }}
			on:click={() => {
				dispatch('select', recommendation);

				emoji = [];
			}}
		>
			{recommendation.emoji}
			{recommendation.names[0]}
		</button>
	{/each}
</div>

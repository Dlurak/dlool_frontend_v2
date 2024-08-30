<script lang="ts">
	import type { Readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import { self } from '$lib/utils/utils';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { QuestionMarkCircle } from 'svelte-hero-icons';
	import { slide } from 'svelte/transition';
	import { animationLength } from '$lib/utils/store/animation';

	export let label: Readable<string>;
	export let value: number;
	export let description: Readable<string> | null = null;

	export let min = 0;
	export let max = 100;
	export let step = 1;

	export let valueFmt: (val: number) => string | number = self;

	let showDescription = false;
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<span class="flex items-center gap-1">
			<Store store={label} />
			{#if description}
				<QuickAction
					icon={QuestionMarkCircle}
					small
					on:click={() => (showDescription = !showDescription)}
				/>
			{/if}
		</span>

		<span class="flex items-center gap-2">
			<input
				{min}
				{max}
				{step}
				bind:value
				type="range"
				class="my-4 h-1 cursor-pointer appearance-none rounded-md bg-emerald-400 dark:bg-emerald-600"
			/>

			<span>{valueFmt(value)}</span>
		</span>
	</div>
	{#if description && showDescription}
		<div transition:slide={{ duration: $animationLength }} class="text-gray-500 dark:text-gray-400">
			<Store store={description} />
		</div>
	{/if}
</div>

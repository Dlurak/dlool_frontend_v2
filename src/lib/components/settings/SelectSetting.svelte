<script lang="ts" generics="V">
	import { animationLength } from '$lib/utils/store/animation';
	import { QuestionMarkCircle } from 'svelte-hero-icons';
	import { slide } from 'svelte/transition';
	import QuickAction from '../buttons/QuickAction.svelte';
	import type { Readable } from 'svelte/store';
	import NotTyppable from '../select/NotTyppable.svelte';
	import Store from '../utils/Store.svelte';
	import Select from '../select/Select.svelte';

	export let label: Readable<string>;
	// eslint-disable-next-line no-undef
	export let value: V;
	export let options: {
		label: Readable<string>;
		// eslint-disable-next-line no-undef
		value: V;
	}[];

	export let typpable = false;

	export let description: Readable<string> | null = null;

	let showDescription = false;
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
		<span class="flex w-full items-center gap-1">
			<Store store={label} />
			{#if description}
				<QuickAction
					icon={QuestionMarkCircle}
					small
					on:click={() => (showDescription = !showDescription)}
				/>
			{/if}
		</span>

		{#if typpable}
			<Select {options} placeholder={label} bind:firstValue={value} on:change />
		{:else}
			<NotTyppable {options} bind:value on:change />
		{/if}
	</div>
	{#if description && showDescription}
		<div transition:slide={{ duration: $animationLength }} class="text-gray-500 dark:text-gray-400">
			<Store store={description} />
		</div>
	{/if}
</div>

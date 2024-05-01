<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import { get, type Readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { flip, offset, shift } from '@floating-ui/core';
	import { diceCoefficient } from 'dice-coefficient';
	import type { Option } from './types';
	import { useCycle } from '$lib/utils/store/cycle';
	import { createEventDispatcher } from 'svelte';
	import type { IconSource } from 'svelte-hero-icons';

	export let placeholder: Readable<string>;
	export let options: Option[] = [];
	export let value: null | string = null;
	export let userInput = value ?? '';

	export let allowCustomval = false;
	export let threshold = 0.2;
	export let icon: IconSource | null = null;

	let showSuggestions = false;

	$: sortedAndFiltered = options
		.map((opt) => [opt, diceCoefficient(get(opt.label), userInput)] as const)
		.filter(([_, n]) => n >= threshold)
		.sort(([_, a], [__, b]) => a - b)
		.map(([opt]) => opt)
		.slice(0, 5);

	let currentlyFocused = useCycle({ max: () => sortedAndFiltered.length - 1 });

	let inputEleIsFocused = false;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [flip(), shift(), offset(6)]
	});
	const dispatch = createEventDispatcher();

	const select = (n: number) => {
		userInput = get(sortedAndFiltered[n].label);
		value = sortedAndFiltered[n].value;
		showSuggestions = false;
	};
</script>

<svelte:window
	on:keyup={(e) => {
		if (!showSuggestions) return;

		switch (e.key) {
			case 'ArrowUp':
				currentlyFocused.dec();
				return;
			case 'ArrowDown':
				currentlyFocused.inc();
				return;
			case 'Enter':
				if (showSuggestions) select($currentlyFocused);
		}
	}}
/>

<div class="relative">
	<div use:floatingRef>
		<TextInput
			isValid={!!value}
			{icon}
			{placeholder}
			bind:value={userInput}
			on:blur={() => {
				inputEleIsFocused = false;
			}}
			on:input={(e) => {
				showSuggestions = true;
				currentlyFocused.reset();

				// @ts-ignore
				const newVal = e.target?.value;

				if (allowCustomval) {
					value = newVal || null;
					dispatch('userInput', newVal);
					return;
				}

				const typedOption = options.find(({ label }) => get(label) === newVal);

				if (typedOption) value = typedOption.value;
				else value = null;

				dispatch('userInput', newVal);
			}}
			on:focus={() => (inputEleIsFocused = true)}
		/>
	</div>

	{#if showSuggestions}
		<div
			class="z-10 flex w-full flex-col overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800"
			use:floatingContent
		>
			{#each sortedAndFiltered as opt, index}
				<button
					role="option"
					aria-selected={$currentlyFocused === index ? 'true' : 'false'}
					tabindex="0"
					class="px-2 py-1 text-start"
					class:bg-zinc-300={index === $currentlyFocused}
					class:dark:bg-zinc-700={index === $currentlyFocused}
					on:mouseenter={() => ($currentlyFocused = index)}
					on:click={() => {
						select(index);
					}}
				>
					<Store store={opt.label} />
				</button>
			{/each}
		</div>
	{/if}
</div>

<script lang="ts" generics="V">
	import { deepEqual } from '$lib/utils/objects/deepEqual';

	import TextInput from '$lib/components/input/Text.svelte';
	import { get, readable, writable, type Readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { flip, offset, shift } from '@floating-ui/core';
	import { diceCoefficient } from 'dice-coefficient';
	import type { Option } from './types';
	import { useCycle } from '$lib/utils/store/cycle';
	import { createEventDispatcher } from 'svelte';
	import { ChevronDown, Icon, XMark, type IconSource } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';

	export let placeholder: Readable<string>;
	// eslint-disable-next-line no-undef
	export let options: Option<V>[] = [];
	// eslint-disable-next-line no-undef
	export let value: null | V[] = null;
	// eslint-disable-next-line no-undef
	export let firstValue: V | null = value ? (value[0] ?? null) : null;
	export let userInput = firstValue
		? get(options.find(({ value }) => deepEqual(value, firstValue))?.label ?? readable(''))
		: '';

	const optionsStore = writable(options);
	$: optionsStore.set(options);
	optionsStore.subscribe((n) => {
		if (n.length === 0) return;
		if ($optionsStore.length > 0) return;
		if (firstValue === null) return;

		userInput = get(
			options.find(({ value }) => deepEqual(value, firstValue))?.label ?? readable('')
		);
	});

	export let allowMultiple = false;
	export let allowCustomval = false;
	export let showArrow = false;
	export let threshold = 0.2;
	export let icon: IconSource | null = null;

	let showSuggestions = false;

	$: sortedAndFiltered = options
		.map((opt) => [opt, diceCoefficient(get(opt.label), userInput)] as const)
		.filter(([_, n]) => n >= threshold)
		.sort(([_, a], [__, b]) => b - a)
		.slice(0, 5);

	let currentlyFocused = useCycle({ max: () => sortedAndFiltered.length - 1 });

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [flip(), shift(), offset(6)]
	});

	const dispatch = createEventDispatcher<{
		userInput: string;
		// eslint-disable-next-line no-undef
		change: V[];
	}>();

	const select = (n: number) => {
		const item = sortedAndFiltered[n][0];

		if (!item) return;
		if (value?.includes(item.value)) return;

		userInput = get(item.label);
		firstValue = item.value;
		showSuggestions = false;

		if (allowMultiple) {
			value = [...(value ?? []), item.value];
			userInput = '';
		} else {
			value = [item.value];
		}

		dispatch('change', value);
	};

	$: isValid = options.some(({ label }) => get(label) === userInput);
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

<div class="entire relative w-full">
	<div use:floatingRef>
		<TextInput
			{isValid}
			{icon}
			{placeholder}
			bind:value={userInput}
			showSecondLine={allowMultiple && (value?.length ?? 0) > 0}
			on:input={({ detail }) => {
				showSuggestions = true;
				currentlyFocused.reset();

				if (allowCustomval) {
					// @ts-expect-error Allow custom val allows for strings
					value = detail ? [detail] : null;
					// @ts-expect-error Allow custom val allows for strings
					firstValue = detail ?? null;
					dispatch('userInput', detail);
					return;
				}

				const typedOption = options.find(({ label }) => get(label) === detail);

				if (typedOption && !allowMultiple) {
					value = [typedOption.value];
					firstValue = typedOption.value;
				} else if (!allowMultiple) {
					value = null;
				}

				dispatch('userInput', detail);
			}}
			options={options.map(({ label }) => get(label))}
		>
			<div slot="postInput" class="flex h-full items-center">
				{#if showArrow}
					<QuickAction
						small
						icon={ChevronDown}
						on:click={() => {
							showSuggestions = !showSuggestions;
						}}
					/>
				{/if}
			</div>

			<div slot="secondLine" class="flex flex-wrap gap-2 text-sm empty:hidden">
				{#if allowMultiple}
					{#each value ?? [] as v}
						<button
							class="flex items-center rounded-full bg-zinc-200 px-2 dark:bg-zinc-800"
							on:click={() => {
								value = value?.filter((iVal) => iVal !== v) ?? null;
							}}
						>
							<Icon src={XMark} class="h-4 w-4" />
							{v}
						</button>
					{/each}
				{/if}
			</div>
		</TextInput>
	</div>

	<div
		class="suggestion-panel z-10 flex w-full flex-col overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800"
		class:hidden={!showSuggestions}
		use:floatingContent
	>
		{#each sortedAndFiltered as [opt], index}
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
</div>

<style>
	.entire:not(:focus-within) > .suggestion-panel {
		display: none;
	}
</style>

<script lang="ts" generics="V">
	import { i } from '$lib/i18n/store';

	import { flip, offset, shift } from '@floating-ui/core';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
	import Frame from '../input/Frame.svelte';
	import type { Readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import { createEventDispatcher } from 'svelte';

	export let options: {
		label: Readable<string>;
		// eslint-disable-next-line no-undef
		value: V;
	}[];

	// eslint-disable-next-line no-undef
	export let value: V | null = null;

	let showOptions = false;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [flip(), shift(), offset(6)]
	});

	// eslint-disable-next-line no-undef
	const dispatch = createEventDispatcher<{ change: V }>();
</script>

<div class="relative w-full">
	<Frame>
		{@const selected = options.find(({ value: optValue }) => optValue === value)}

		<button
			class="flex w-full items-center justify-between text-start"
			use:floatingRef
			on:click={() => {
				showOptions = !showOptions;
			}}
		>
			{#if selected}
				<span class="w-full">
					<Store store={selected.label} />
				</span>
			{:else}
				<Store store={i('select.select')} />
			{/if}

			<div class="flex gap-0.5">
				<slot />

				<div
					class="
						rounded p-1
						hover:bg-zinc-200 focus:bg-zinc-200
						dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
					"
				>
					<Icon src={ChevronDown} micro class="h-5 w-5" />
				</div>
			</div>
		</button>
	</Frame>

	{#if showOptions}
		<div
			use:floatingContent
			class="z-10 flex w-full flex-col overflow-hidden rounded bg-zinc-300 shadow-md dark:bg-zinc-700"
		>
			{#each options as opt}
				<button
					class="px-2 py-1 text-start hover:bg-zinc-400 hover:dark:bg-zinc-800"
					on:click={() => {
						value = opt.value;
						showOptions = false;
						dispatch('change', value);
					}}
				>
					<Store store={opt.label} />
				</button>
			{/each}
		</div>
	{/if}
</div>

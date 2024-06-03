<script lang="ts">
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	import { useLauncher } from './hook';
	import LauncherItem from './LauncherItem.svelte';
	import { tick } from 'svelte';
	import { i } from '$lib/i18n/store';

	const { search, filteredAndSortedOptions, focusedIndex, isOpen } = useLauncher();

	let inputEle: HTMLInputElement | undefined = undefined;

	isOpen.subscribe(async (isOpened) => {
		if (isOpened) {
			await tick();
			inputEle?.focus();
		}
	});

	const inputPlaceholder = i('launcher.placeholder');
</script>

<div
	class="
		w-full max-w-[min(90%,46rem)] rounded
		bg-zinc-500 bg-opacity-25 text-white
		outline outline-2 outline-emerald-400 backdrop-blur-md
	"
>
	<div class="flex items-center gap-2 p-4 px-4 text-xl">
		<Icon src={MagnifyingGlass} class="h-5 w-5" />
		<input
			bind:this={inputEle}
			type="text"
			class="w-full bg-transparent outline-none"
			placeholder={$inputPlaceholder}
			bind:value={$search}
		/>
	</div>

	<div class="max-h-96 overflow-y-scroll">
		{#each $filteredAndSortedOptions as item, index}
			<LauncherItem
				{item}
				{index}
				isFocused={index === $focusedIndex}
				on:focus={({ detail }) => {
					focusedIndex.set(detail);
				}}
				on:apply={() => {
					item.callback();
				}}
			/>
		{/each}
	</div>
</div>

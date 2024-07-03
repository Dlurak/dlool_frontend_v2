<script lang="ts" generics="V">
	import { Icon, ChevronDown } from 'svelte-hero-icons';
	import type { Option } from '../select/types';
	import Store from '../utils/Store.svelte';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { clickOutside, useToggle } from 'nutzlich';
	import { readable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { animationLength } from '$lib/utils/store/animation';

	// eslint-disable-next-line no-undef
	export let options: Option<V>[];

	let selectedIndex = 0;
	export let value = options[selectedIndex].value;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(4), flip(), shift()]
	});
	const showSuggestions = useToggle(false);

	const dispatch = createEventDispatcher<{
		// eslint-disable-next-line no-undef
		change: V;
	}>();
</script>

<button
	class="flex w-fit items-center gap-1 rounded-full px-2 outline outline-1"
	use:floatingRef
	on:click={() => {
		showSuggestions.toggle();
	}}
>
	<Store store={options.find(({ value: val }) => value === val)?.label || readable('')} />
	<Icon src={ChevronDown} micro class="h-5 w-5" />
</button>

{#if $showSuggestions}
	<div
		use:floatingContent
		class="z-10 px-2"
		use:clickOutside={{ callback: () => showSuggestions.set(false) }}
		transition:slide={{ duration: $animationLength }}
	>
		<div class="flex w-fit flex-col overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
			{#each options as opt, ind}
				<button
					class="
						flex items-center gap-2 px-2 py-1 text-start transition-colors
						hover:bg-zinc-300 focus:bg-zinc-300
						dark:hover:bg-zinc-700 dark:focus:bg-zinc-700
					"
					on:click={() => {
						selectedIndex = ind;
						value = options[ind].value;
						showSuggestions.set(false);

						dispatch('change', value);
					}}
				>
					{#if opt.icon}
						<Icon src={opt.icon} class="h-4 w-4" micro />
					{/if}

					<Store store={opt.label} />
				</button>
			{/each}
		</div>
	</div>
{/if}

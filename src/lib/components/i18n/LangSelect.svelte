<script>
	import { Icon, ChevronDown } from 'svelte-hero-icons';
	import { svocal } from '$lib/utils/store/svocal';
	import { i } from '$lib/i18n/store';
	import Store from '$lib/components/utils/Store.svelte';
	import { useToggle } from 'nutzlich';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { abbrevations } from '$lib/i18n/i18n';
	import { fly } from 'svelte/transition';
	import { animationLength } from '$lib/utils/store/animation';

	const lang = svocal('i18n.currentlang');

	const isPopoverOpen = useToggle(false);

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'top',
		middleware: [offset(8), flip(), shift()]
	});

	let width = 0;
</script>

<button
	class="flex items-center gap-2 rounded px-2 outline outline-1 outline-emerald-500 dark:outline-emerald-700"
	on:click={isPopoverOpen.toggle}
	use:floatingRef
	bind:clientWidth={width}
>
	<Store store={i(`lang.${$lang}`)} />
	<span class="rotate-0 transition-all" class:rotate-180={$isPopoverOpen}>
		<Icon src={ChevronDown} class="h-4 w-4" />
	</span>
</button>

{#if $isPopoverOpen}
	<div
		class="absolute h-fit w-[--w] px-2"
		use:floatingContent
		transition:fly={{ y: 50, duration: $animationLength }}
		style:--w={`min(${width * 1.7}px, 100%)`}
	>
		<div class="flex flex-col overflow-hidden rounded bg-neutral-200 shadow-lg dark:bg-neutral-700">
			{#each abbrevations as abbr, ind}
				<button
					class="w-full px-2 py-1 text-start hover:bg-neutral-300 touch:px-4 touch:py-2 dark:hover:bg-neutral-600"
					on:click={() => {
						lang.set(abbr);
						isPopoverOpen.set(false);
					}}
				>
					<Store store={i(`lang.${abbr}`)} />
				</button>
				{#if ind + 1 < abbr.length}
					<div class="px-2 py-1">
						<hr class="border-1 rounded-full border-zinc-300 dark:border-zinc-600" />
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<script lang="ts">
	import { clamp } from '$lib/utils/numbers/clamp';
	import { ArrowLeft, ChevronLeft, ChevronRight, Icon } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { handleMouseDownOrTouchStart } from './panes';

	export let min = 120;
	export let max = 550;
	export let position = clamp(min, 160, max);
	export let showSidebar = true;

	let percentageCollapsing = 0;

	const handler = handleMouseDownOrTouchStart({
		max,
		min,
		setPos: (p) => (position = p),
		getPos: () => position,
		setShowSideBar: (b) => (showSidebar = b),
		setPercentages: (p) => (percentageCollapsing = p)
	});
</script>

<div
	class="grid h-full w-full max-w-full grid-cols-1 grid-rows-1 gap-2"
	class:md:grid-cols-[var(--w),1fr]={showSidebar}
	class:grid-cols-1={!showSidebar}
	style:--w={`${position}px`}
>
	<div
		class="relative flex h-full scale-x-[--effect] flex-col gap-2 px-2 py-1"
		class:hidden={!showSidebar}
	>
		<div class="hidden md:inline-block">
			<QuickAction
				icon={ChevronLeft}
				small
				on:click={() => {
					showSidebar = false;
				}}
			/>
		</div>

		<slot name="a" />

		<div
			class="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center rounded bg-black bg-opacity-[--effect]"
			class:hidden={percentageCollapsing <= 0}
			style:--effect={Math.round(percentageCollapsing) / 100}
		>
			<div class="aspect-square scale-[--effect] rounded-full bg-emerald-300 p-2">
				<Icon src={ArrowLeft} class="h-7 w-7" small />
			</div>
		</div>
	</div>

	<div class="flex h-full w-full max-w-full gap-2 overflow-hidden">
		<button
			class="hidden cursor-col-resize px-1 md:inline-block"
			class:md:hidden={!showSidebar}
			tabindex="-1"
			on:mousedown={handler}
			on:touchstart={handler}
		>
			<div class="h-full w-1 rounded-full bg-zinc-200 touch:w-1.5 dark:bg-zinc-700" />
		</button>

		<div class="flex w-full max-w-full flex-col gap-2 overflow-hidden p-1">
			<div class="hidden md:inline-block" class:md:hidden={showSidebar}>
				<QuickAction
					icon={ChevronRight}
					small
					on:click={() => {
						showSidebar = true;
					}}
				/>
			</div>

			<slot name="b" />
		</div>
	</div>
</div>

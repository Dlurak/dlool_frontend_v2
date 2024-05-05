<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'svelte-hero-icons';
	import { mediaQuery } from 'nutzlich';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { useToggle } from 'nutzlich';

	let width: number | null = null;
	let domWidth = 0;

	export let allowSnapClosing = true;
	export const minimum = 200;
	export const max = 31;

	/** How many pixels are neccessary to collapse the sidemenu due to width */
	const threshold = Math.min(120, minimum);
	const showSideMenu = useToggle(true);

	function handleMouseDown(e: MouseEvent) {
		const initialX = e.clientX;
		const initialWidth = width ?? domWidth;

		const handleMouseMove = (e: MouseEvent) => {
			const diff = e.clientX - initialX;
			width = initialWidth + diff;

			const isGettingSmaller = diff < 0;
			const isTooSmall = width < threshold;

			if (isGettingSmaller && isTooSmall && allowSnapClosing) showSideMenu.set(false);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener(
			'mouseup',
			() => {
				window.removeEventListener('mousemove', handleMouseMove);
				width = domWidth;
			},
			{ once: true }
		);
	}

	const isSmall = mediaQuery('(max-width: 768px)');
</script>

<div class="flex h-full w-full flex-1 flex-col items-stretch gap-2 md:flex-row">
	{#if $isSmall || $showSideMenu}
		<div
			class="flex h-full w-full max-w-full flex-col md:w-[--w] md:min-w-[--min-w] md:max-w-[--max-w]"
			style:--w={`${width}px`}
			style:--min-w={`${minimum}px`}
			style:--max-w={`${max}rem`}
			bind:clientWidth={domWidth}
		>
			<div class="hidden md:flex">
				<QuickAction
					icon={ChevronLeft}
					on:click={() => {
						showSideMenu.set(false);
					}}
				/>
			</div>
			<slot name="a"></slot>
		</div>

		<button class="hidden flex-1 md:flex" on:mousedown={handleMouseDown} tabindex="-1">
			<slot name="resizer">
				<div class="h-full cursor-col-resize px-2">
					<div class="h-full w-1 rounded bg-zinc-300 dark:bg-zinc-700" />
				</div>
			</slot>
		</button>
	{/if}

	<div
		class="flex w-full flex-col items-center justify-center gap-2 md:w-[--w]"
		style:--w={`calc(100% - ${$showSideMenu ? domWidth : 0}px)`}
	>
		{#if !$showSideMenu}
			<div class="hidden w-full md:flex">
				<QuickAction
					icon={ChevronRight}
					on:click={() => {
						showSideMenu.set(true);
					}}
				/>
			</div>
		{/if}

		<div class="flex h-full w-full">
			<slot name="b"></slot>
		</div>
	</div>
</div>

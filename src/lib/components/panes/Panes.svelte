<script context="module" lang="ts">
	import { calculatePercentage } from '$lib/utils/math/percentages';

	const isTouchEvent = (e: Event): e is TouchEvent => 'touches' in e;

	interface Props {
		setPos: (p: number) => void;
		getPos: () => number;
		setShowSideBar: (show: boolean) => void;
		setPercentages: (p: number) => void;
		min: number;
		max: number;
	}

	const handleMouseDownOrTouchStart =
		({ setPos, getPos, setShowSideBar, setPercentages, min, max }: Props) =>
		(e: MouseEvent | TouchEvent) => {
			let isDragging = true;
			let initialPosition = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
			let percentage = 0;

			const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
				if (!isDragging) return;

				const { clientX } = isTouchEvent(e) ? e.touches[0] : e;
				const delta = clientX - initialPosition;
				const potentialPos = getPos() + delta;

				if (potentialPos <= min) {
					percentage = Math.min(
						calculatePercentage((potentialPos - min) * -1, ((min - min / 3) / 5) * 4),
						100
					);
					setPercentages(percentage);
					return setPos(min);
				}
				percentage = 0;
				setPercentages(percentage);
				if (potentialPos >= max) return setPos(max);

				setPos(potentialPos);
				initialPosition = clientX;
			};

			const handleMouseUpOrTouchEnd = () => {
				document.removeEventListener('mousemove', handleMouseMoveOrTouchMove);
				document.removeEventListener('touchmove', handleMouseMoveOrTouchMove);
				document.removeEventListener('mouseup', handleMouseUpOrTouchEnd);
				document.removeEventListener('touchend', handleMouseUpOrTouchEnd);
				isDragging = false;
				if (percentage >= 70) setShowSideBar(false);

				const intervalId = setInterval(() => {
					percentage -= 2;
					setPercentages(percentage);
					if (percentage <= 0) clearInterval(intervalId);
				}, 2);
			};

			document.addEventListener('mousemove', handleMouseMoveOrTouchMove);
			document.addEventListener('touchmove', handleMouseMoveOrTouchMove);
			document.addEventListener('mouseup', handleMouseUpOrTouchEnd);
			document.addEventListener('touchend', handleMouseUpOrTouchEnd);
		};
</script>

<script lang="ts">
	import { clamp } from '$lib/utils/numbers/clamp';
	import { ArrowLeft, ChevronLeft, ChevronRight, Icon } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';

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
			class="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-black bg-opacity-[--effect]"
			class:hidden={percentageCollapsing === 0}
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

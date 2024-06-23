<script context="module" lang="ts">
	const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => 'touches' in e;

	interface Props {
		setPos: (p: number) => void;
		getPos: () => number;
		min: number;
		max: number;
	}

	const handleMouseDownOrTouchStart =
		({ setPos, getPos, min, max }: Props) =>
		(e: MouseEvent | TouchEvent) => {
			let isDragging = true;
			let initialPosition = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;

			const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
				if (!isDragging) return;

				const { clientX } = isTouchEvent(e) ? e.touches[0] : e;
				const delta = clientX - initialPosition;
				const potentialPos = getPos() + delta;

				if (potentialPos >= max) return setPos(max);
				if (potentialPos <= min) return setPos(min);

				setPos(potentialPos);
				initialPosition = clientX;
			};

			const handleMouseUpOrTouchEnd = () => {
				isDragging = false;
				document.removeEventListener('mousemove', handleMouseMoveOrTouchMove);
				document.removeEventListener('touchmove', handleMouseMoveOrTouchMove);
				document.removeEventListener('mouseup', handleMouseUpOrTouchEnd);
				document.removeEventListener('touchend', handleMouseUpOrTouchEnd);
			};

			document.addEventListener('mousemove', handleMouseMoveOrTouchMove);
			document.addEventListener('touchmove', handleMouseMoveOrTouchMove);
			document.addEventListener('mouseup', handleMouseUpOrTouchEnd);
			document.addEventListener('touchend', handleMouseUpOrTouchEnd);
		};
</script>

<script lang="ts">
	import { clamp } from '$lib/utils/numbers/clamp';

	export let min = 120;
	export let max = 550;
	export let position = clamp(min, 160, max);

	const handler = handleMouseDownOrTouchStart({
		max,
		min,
		setPos: (p) => (position = p),
		getPos: () => position
	});
</script>

<div
	class="grid h-full w-full max-w-full grid-cols-1 grid-rows-1 gap-2 md:grid-cols-[var(--w),1fr]"
	style:--w={`${position}px`}
>
	<div class="h-full">
		<slot name="a" />
	</div>

	<div class="flex h-full w-full max-w-full gap-2 overflow-hidden">
		<button
			class="hidden cursor-col-resize px-1 md:inline-block"
			tabindex="-1"
			on:mousedown={handler}
			on:touchstart={handler}
		>
			<div class="h-full w-1 rounded-full bg-zinc-200 touch:w-1.5 dark:bg-zinc-700" />
		</button>

		<div class="flex w-full max-w-full overflow-hidden p-1">
			<slot name="b" />
		</div>
	</div>
</div>

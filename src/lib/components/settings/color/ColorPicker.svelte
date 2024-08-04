<script context="module" lang="ts">
	function size(ele: HTMLElement) {
		const rect = ele.getBoundingClientRect();

		return {
			width: rect.right - rect.left,
			height: rect.bottom - rect.top
		};
	}

	const getCoordinates = (e: TouchEvent | MouseEvent) => {
		const data = 'touches' in e ? e.touches[0] : e;

		return {
			x: data.clientX,
			y: data.clientY
		};
	};

	interface Props {
		getCanvas: () => HTMLCanvasElement | undefined;
		coords: Writable<{ x: number; y: number }>;
		setHsl: (color: HSL) => void;
		getHsl: () => HSL;
	}

	const handler =
		({ getCanvas, coords, setHsl, getHsl }: Props) =>
		(e: TouchEvent | MouseEvent) => {
			e.preventDefault();
			const canvas = getCanvas();

			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const { height, width } = size(canvas);

			const { x: rawX, y: rawY } = getCoordinates(e);

			const x = clamp(0, calculatePercentage(rawX - rect.left, width), 100);
			const y = clamp(0, 100 - calculatePercentage(rawY - rect.top, height), 100);

			coords.set({ x, y });
			setHsl([getHsl()[0], x, y]);
		};

	const genHsl = (multi: number, saturation: number, lightness: number) => (i: number) =>
		`hsl(${i * multi}, ${saturation}%, ${lightness}%)`;
</script>

<script lang="ts">
	import { derived, get, writable, type Writable } from 'svelte/store';
	import { drawGradient } from './drawGradient';
	import convert from 'color-convert';
	import { calculatePercentage } from '$lib/utils/math/percentages';
	import type { HSL } from 'color-convert/conversions';
	import { clamp } from '$lib/utils/numbers/clamp';
	import { repeat } from '$lib/utils/arrays/repeat';
	import Text from '$lib/components/input/Text.svelte';

	export let hexColor: string;
	export let hsl = writable(convert.hex.hsl(hexColor));

	const displayHex = derived(hsl, (hsl) => `#${convert.hsl.hex(hsl)}`);

	let canvas: HTMLCanvasElement | undefined;

	const hue = writable(get(hsl)[0]);

	const coords = writable({
		x: get(hsl)[1],
		y: get(hsl)[2]
	});

	const defaultHandler = handler({
		coords,
		getCanvas: () => canvas,
		getHsl: () => get(hsl),
		setHsl: hsl.set
	});

	hue.subscribe((h) => hsl.update(([_, ...rest]) => [h, ...rest]));

	let textValue = get(displayHex);

	displayHex.subscribe((v) => (textValue = v));
</script>

<div class="relative aspect-square w-full cursor-crosshair">
	<canvas
		bind:this={canvas}
		class="h-full w-full"
		on:click={defaultHandler}
		on:mousemove={(e) => {
			if (e.buttons !== 1) return;
			defaultHandler(e);
		}}
		on:touchstart={defaultHandler}
		on:touchmove={defaultHandler}
		use:drawGradient={{
			hue: $hue
		}}
	/>
	<div
		style:--top={`${100 - $coords.y}%`}
		style:--left={`${$coords.x}%`}
		style="transform: translate(-50%, -50%);"
		class="pointer-events-none absolute left-[--left] top-[--top] h-3 w-3 rounded-full bg-white outline outline-2 outline-black"
	/>
</div>

<input
	type="range"
	min="0"
	max="360"
	bind:value={$hue}
	class="h-3 w-full appearance-none rounded-full outline-none focus:outline-none touch:h-5"
	style={`background: linear-gradient(90deg,${repeat(100, genHsl(3.6, 100, 50)).join(', ')});`}
/>

<div>
	<Text
		placeholder={displayHex}
		bind:value={textValue}
		on:enter={() => {
			const newHsl = convert.hex.hsl(textValue);
			hue.set(newHsl[0]);
			hsl.set(newHsl);

			coords.set({
				x: newHsl[1],
				y: newHsl[2]
			});
		}}
	>
		<button
			slot="postInput"
			class="aspect-square h-full rounded bg-[--bg]"
			style:--bg={`#${convert.rgb.hex(convert.hex.rgb(textValue))}`}
			on:click={() => {
				const newHsl = convert.hex.hsl(textValue);
				hue.set(newHsl[0]);
				hsl.set(newHsl);

				coords.set({
					x: newHsl[1],
					y: newHsl[2]
				});
			}}
		/>
	</Text>
</div>

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
			e.preventDefault()
			const canvas = getCanvas()

			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const { height, width } = size(canvas);

			const { x: rawX, y: rawY } = getCoordinates(e);

			const x = calculatePercentage(rawX - rect.left, width);
			const y = 100 - calculatePercentage(rawY - rect.top, height);

			coords.set({ x, y });
			setHsl([getHsl()[0], x, y]);
		};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { drawGradient } from './drawGradient';
	import convert from 'color-convert';
	import { calculatePercentage } from '$lib/utils/math/percentages';
	import type { HSL } from 'color-convert/conversions';

	export let hexColor: string;
	export let hsl = convert.hex.hsl(hexColor);

	let canvas: HTMLCanvasElement | undefined;

	const hue = writable(hsl[0]);

	const coords = writable({
		x: hsl[1],
		y: hsl[2]
	});

	const defaultHandler = handler({
		coords,
		getCanvas: () => canvas,
		getHsl: () => hsl,
		setHsl: (h) => (hsl = h)
	});

	onMount(() => {
		const ctx = canvas?.getContext('2d');
		if (!canvas) return;
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		const imgData = ctx.createImageData(width, height);

		hue.subscribe((h) => {
			drawGradient({ hue: h, imgData, ctx });
			hsl = [h, hsl[1], hsl[2]];
		});
	});
</script>

<div class="relative aspect-square w-full cursor-crosshair">
	<canvas
		bind:this={canvas}
		class="h-full w-full"
		on:click={defaultHandler}
		on:touchstart={defaultHandler}
		on:touchmove={defaultHandler}
	/>
	<div
		style:--top={`${100 - $coords.y}%`}
		style:--left={`${$coords.x}%`}
		style="transform: translate(-50%, -50%);"
		class="absolute left-[--left] top-[--top] h-3 w-3 rounded-full bg-white outline outline-2 outline-black pointer-events-none"
	/>
</div>

<input
	type="range"
	min="0"
	max="360"
	bind:value={$hue}
	class="hue-slider h-3 w-full appearance-none rounded-full outline-none focus:outline-none touch:h-5"
/>

<style>
	.hue-slider {
		background: linear-gradient(
			90deg,
			hsl(0, 100%, 50%) 0%,
			hsl(3.6, 100%, 50%) 1%,
			hsl(7.2, 100%, 50%) 2%,
			hsl(10.8, 100%, 50%) 3%,
			hsl(14.4, 100%, 50%) 4%,
			hsl(18, 100%, 50%) 5%,
			hsl(21.6, 100%, 50%) 6%,
			hsl(25.2, 100%, 50%) 7%,
			hsl(28.8, 100%, 50%) 8%,
			hsl(32.4, 100%, 50%) 9%,
			hsl(36, 100%, 50%) 10%,
			hsl(39.6, 100%, 50%) 11%,
			hsl(43.2, 100%, 50%) 12%,
			hsl(46.8, 100%, 50%) 13%,
			hsl(50.4, 100%, 50%) 14%,
			hsl(54, 100%, 50%) 15%,
			hsl(57.6, 100%, 50%) 16%,
			hsl(61.2, 100%, 50%) 17%,
			hsl(64.8, 100%, 50%) 18%,
			hsl(68.4, 100%, 50%) 19%,
			hsl(72, 100%, 50%) 20%,
			hsl(75.6, 100%, 50%) 21%,
			hsl(79.2, 100%, 50%) 22%,
			hsl(82.8, 100%, 50%) 23%,
			hsl(86.4, 100%, 50%) 24%,
			hsl(90, 100%, 50%) 25%,
			hsl(93.6, 100%, 50%) 26%,
			hsl(97.2, 100%, 50%) 27%,
			hsl(100.8, 100%, 50%) 28%,
			hsl(104.4, 100%, 50%) 29%,
			hsl(108, 100%, 50%) 30%,
			hsl(111.6, 100%, 50%) 31%,
			hsl(115.2, 100%, 50%) 32%,
			hsl(118.8, 100%, 50%) 33%,
			hsl(122.4, 100%, 50%) 34%,
			hsl(126, 100%, 50%) 35%,
			hsl(129.6, 100%, 50%) 36%,
			hsl(133.2, 100%, 50%) 37%,
			hsl(136.8, 100%, 50%) 38%,
			hsl(140.4, 100%, 50%) 39%,
			hsl(144, 100%, 50%) 40%,
			hsl(147.6, 100%, 50%) 41%,
			hsl(151.2, 100%, 50%) 42%,
			hsl(154.8, 100%, 50%) 43%,
			hsl(158.4, 100%, 50%) 44%,
			hsl(162, 100%, 50%) 45%,
			hsl(165.6, 100%, 50%) 46%,
			hsl(169.2, 100%, 50%) 47%,
			hsl(172.8, 100%, 50%) 48%,
			hsl(176.4, 100%, 50%) 49%,
			hsl(180, 100%, 50%) 50%,
			hsl(183.6, 100%, 50%) 51%,
			hsl(187.2, 100%, 50%) 52%,
			hsl(190.8, 100%, 50%) 53%,
			hsl(194.4, 100%, 50%) 54%,
			hsl(198, 100%, 50%) 55%,
			hsl(201.6, 100%, 50%) 56%,
			hsl(205.2, 100%, 50%) 57%,
			hsl(208.8, 100%, 50%) 58%,
			hsl(212.4, 100%, 50%) 59%,
			hsl(216, 100%, 50%) 60%,
			hsl(219.6, 100%, 50%) 61%,
			hsl(223.2, 100%, 50%) 62%,
			hsl(226.8, 100%, 50%) 63%,
			hsl(230.4, 100%, 50%) 64%,
			hsl(234, 100%, 50%) 65%,
			hsl(237.6, 100%, 50%) 66%,
			hsl(241.2, 100%, 50%) 67%,
			hsl(244.8, 100%, 50%) 68%,
			hsl(248.4, 100%, 50%) 69%,
			hsl(252, 100%, 50%) 70%,
			hsl(255.6, 100%, 50%) 71%,
			hsl(259.2, 100%, 50%) 72%,
			hsl(262.8, 100%, 50%) 73%,
			hsl(266.4, 100%, 50%) 74%,
			hsl(270, 100%, 50%) 75%,
			hsl(273.6, 100%, 50%) 76%,
			hsl(277.2, 100%, 50%) 77%,
			hsl(280.8, 100%, 50%) 78%,
			hsl(284.4, 100%, 50%) 79%,
			hsl(288, 100%, 50%) 80%,
			hsl(291.6, 100%, 50%) 81%,
			hsl(295.2, 100%, 50%) 82%,
			hsl(298.8, 100%, 50%) 83%,
			hsl(302.4, 100%, 50%) 84%,
			hsl(306, 100%, 50%) 85%,
			hsl(309.6, 100%, 50%) 86%,
			hsl(313.2, 100%, 50%) 87%,
			hsl(316.8, 100%, 50%) 88%,
			hsl(320.4, 100%, 50%) 89%,
			hsl(324, 100%, 50%) 90%,
			hsl(327.6, 100%, 50%) 91%,
			hsl(331.2, 100%, 50%) 92%,
			hsl(334.8, 100%, 50%) 93%,
			hsl(338.4, 100%, 50%) 94%,
			hsl(342, 100%, 50%) 95%,
			hsl(345.6, 100%, 50%) 96%,
			hsl(349.2, 100%, 50%) 97%,
			hsl(352.8, 100%, 50%) 98%,
			hsl(356.4, 100%, 50%) 99%,
			hsl(360, 100%, 50%) 100%
		);
	}
</style>

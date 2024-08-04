import { calculatePercentage } from '$lib/utils/math/percentages';
import convert from 'color-convert';
import type { Action } from 'svelte/action';

type DrawGradientProps = {
	hue: number;
};

export const drawGradient: Action<HTMLCanvasElement, DrawGradientProps> = (canvas, { hue }) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const { width, height } = canvas;
	const imgData = ctx.createImageData(width, height);

	const draw = (hue: number) => {
		for (let y = 0; y < height; y++) {
			const lightness = calculatePercentage(height - y, height);
			for (let x = 0; x < width; x++) {
				const index = (y * width + x) * 4;

				const saturation = calculatePercentage(x, width);

				const color = convert.hsl.rgb([hue, saturation, lightness]);

				imgData.data[index] = color[0]; // R
				imgData.data[index + 1] = color[1]; // G
				imgData.data[index + 2] = color[2]; // B
				imgData.data[index + 3] = 255;
			}
		}

		ctx.putImageData(imgData, 0, 0);
	};

	draw(hue);

	return {
		update({ hue }) {
			draw(hue);
		}
	};
};

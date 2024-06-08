import type { RGB } from './types';

function parseHex(str: string) {
	return parseInt(str, 16);
}

export function parseHexIntoRgb(color: string): RGB {
	const preproccessedColor = color.startsWith('#') ? color.slice(1) : color;

	if (preproccessedColor.length === 3) {
		const [r, g, b] = preproccessedColor.split('').map(parseHex);

		return {
			r,
			g,
			b
		};
	}

	if (preproccessedColor.length === 6) {
		return {
			r: parseHex(preproccessedColor.slice(0, 2)),
			g: parseHex(preproccessedColor.slice(2, 4)),
			b: parseHex(preproccessedColor.slice(4, 6))
		};
	}

	throw new Error('Invalid hex color string');
}

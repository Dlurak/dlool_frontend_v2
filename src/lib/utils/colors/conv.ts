import type { RGB } from './types';
import convert from 'color-convert';

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

/**
 * Converts a hex color code to an RGBA color code with the specified opacity.
 *
 * @param hex - The hex color code to convert. Should be in the format '#RRGGBB' or '#RGB'.
 * @param [opacity=0.5] - The opacity value for the RGBA color code, ranging from 0 (fully transparent) to 1 (fully opaque).
 * @returns The resulting RGBA color code as a string in the format 'rgba(r, g, b, a)'.
 *
 * @example
 * ```typescript
 * // Returns 'rgba(255, 0, 0, 0.5)'
 * addOpacityToHex('#FF0000', 0.5);
 * ```
 *
 * @example
 * ```typescript
 * // Returns 'rgba(255, 0, 0, 1)'
 * addOpacityToHex('#FF0000', 1);
 * ```
 */
export function addOpacityToHex(hex: string, opacity = 0.5) {
	const [r, g, b] = convert.hex.rgb(hex);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

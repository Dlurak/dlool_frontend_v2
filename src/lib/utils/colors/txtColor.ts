import type { RGB } from './types';

export function blackOrWhiteText({ r, g, b }: RGB) {
	const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

	return brightness > 125 ? 'black' : 'white';
}

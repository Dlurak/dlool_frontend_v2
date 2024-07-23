import { Maybe } from '$lib/utils/null/maybe';
import { clamp } from '$lib/utils/numbers/clamp';
import { json, type RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ fetch, url: { searchParams } }) => {
	const bgColor = searchParams.get('bg') || '#ffffff';
	const width = Maybe.of(searchParams.get('width'))
		.map((x) => parseInt(x))
		.orElse(null);
	const height = Maybe.of(searchParams.get('height'))
		.map((x) => parseInt(x))
		.orElse(null);

	if (
		!width ||
		!height ||
		Number.isNaN(width) ||
		Number.isNaN(height) ||
		Math.min(width, height) <= 0
	) {
		return json({ error: 'Invalid dimensions' }, { status: 400 });
	}

	const response = await fetch('/favicon.svg');
	if (!response.ok) {
		return json({ error: 'Failed to fetch image' }, { status: 500 });
	}
	const buffer = await response.arrayBuffer();

	const shortestSide = Math.min(width, height);
	const calculatedPerc = 107 - Math.log10(shortestSide) * 24;
	const percentage = clamp(0, Math.round(calculatedPerc), 100);
	const innerSize = Math.round(shortestSide * (percentage / 100));

	const verticalPadding = Math.round((height - innerSize) / 2);
	const horizontalPadding = Math.round((width - innerSize) / 2);

	const sharpImg = await sharp(buffer)
		.resize(innerSize, innerSize)
		.flatten({ background: bgColor })
		.extend({
			top: verticalPadding,
			bottom: verticalPadding,
			left: horizontalPadding,
			right: horizontalPadding,
			background: bgColor
		})
		.png()
		.toBuffer();

	return new Response(sharpImg, {
		headers: { 'Content-Type': 'image/png' }
	});
};

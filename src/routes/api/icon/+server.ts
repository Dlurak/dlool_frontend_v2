import { Maybe } from '$lib/utils/null/maybe';
import { json, type RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ fetch, url: { searchParams } }) => {
	const bgColor = searchParams.get('bg') || '#ffffff';
	const size = Maybe.of(searchParams.get('size'))
		.map((x) => parseInt(x))
		.flatMap((x) => (Number.isNaN(x) ? Maybe.of<number>(null) : Maybe.of(x)))
		.orElse(512);

	const response = await fetch('/favicon.svg');
	if (!response.ok) {
		return json({ error: 'Failed to fetch image' }, { status: 500 });
	}
	const buffer = await response.arrayBuffer();

	const innerSize = Math.round(size * 0.8);
	const padding = Math.round(size * 0.1);

	const sharpImg = await sharp(buffer)
		.resize(innerSize, innerSize)
		.flatten({ background: bgColor })
		.extend({
			top: padding,
			bottom: padding,
			left: padding,
			right: padding,
			background: bgColor
		})
		.png()
		.toBuffer();

	return new Response(sharpImg, {
		headers: { 'Content-Type': 'image/png' }
	});
};

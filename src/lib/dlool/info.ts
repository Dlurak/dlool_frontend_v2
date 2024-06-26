import { z } from 'zod';

const scheme = z.object({
	name: z.string(),
	isDlool: z.literal(true),
	version: z.string()
});

export async function isDlool(url: string) {
	return fetch(url)
		.then((r) => r.json())
		.then(scheme.safeParse)
		.then((r) => r.success);
}

import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { fromEntries, objectEntries } from '$lib/utils/objects/entries';
import { contributorScheme } from '$lib/schemes/contributor';

export const prerender = true;

const REPOS = {
	frontend: 'Dlurak/dlool_frontend_v2',
	backend: 'Dlurak/dlool_backend_v2'
} as const satisfies Record<'frontend' | 'backend', string>;

const scheme = z.array(contributorScheme);

export const load: PageServerLoad = async ({ fetch }) => {
	const data = objectEntries(REPOS).map(([key, value]) => {
		const url = `https://api.github.com/repos/${value}/contributors` as const;
		const data = fetch(url)
			.then((r) => r.json())
			.then(scheme.parse);
		return Promise.all([Promise.resolve(key), data]);
	});

	const entries = await Promise.all(data);

	return { contributions: fromEntries(entries) };
};

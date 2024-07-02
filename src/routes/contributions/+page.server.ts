import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { fromEntries, objectEntries } from '$lib/utils/objects/entries';

export const prerender = true;

const REPOS = {
	frontend: 'Dlurak/dlool_frontend_v2',
	backend: 'Dlurak/dlool_backend_v2'
} as const satisfies Record<'frontend' | 'backend', string>;

const scheme = z.array(
	z.object({
		login: z.string(),
		id: z.number(),
		node_id: z.string(),
		avatar_url: z.string(),
		gravatar_id: z.string(),
		url: z.string(),
		html_url: z.string(),
		followers_url: z.string(),
		following_url: z.string(),
		gists_url: z.string(),
		starred_url: z.string(),
		subscriptions_url: z.string(),
		organizations_url: z.string(),
		repos_url: z.string(),
		events_url: z.string(),
		received_events_url: z.string(),
		type: z.string(),
		site_admin: z.boolean(),
		contributions: z.number()
	})
);

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

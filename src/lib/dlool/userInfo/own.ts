import { getApibase, getHeader } from '$lib/utils/api';
import { z } from 'zod';

const userDetailsScheme = z.object({
	username: z.string(),
	displayname: z.string(),
	created: z.number().int(),
	classes: z.array(
		z.object({
			name: z.string(),
			school: z.object({
				name: z.string()
			})
		})
	)
});

export type OwnUserDetails = z.infer<typeof userDetailsScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('User information retrieved successfully'),
	data: userDetailsScheme
});

export async function ownUserInfo() {
	const res = await fetch(`${getApibase()}/user/info/me`, {
		headers: getHeader()
	}).then((r) => r.json());

	return scheme.parse(res);
}

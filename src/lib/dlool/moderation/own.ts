import { getApibase, getHeader } from '$lib/utils/api';
import { z } from 'zod';

const reqScheme = z.union([
	z.object({
		status: z.union([z.literal('Rejected'), z.literal('Accepted')]),

		created: z.number().min(0).int(),
		reviewedAt: z.number().int().min(1),
		reviewedBy: z.object({
			username: z.string(),
			displayname: z.string()
		}),
		wantsToJoin: z.object({
			name: z.string(),
			school: z.object({ name: z.string() })
		})
	}),

	z.object({
		status: z.literal('Pending'),

		created: z.number().min(0).int(),
		reviewedAt: z.null(),
		reviewedBy: z.null(),
		wantsToJoin: z.object({
			name: z.string(),
			school: z.object({ name: z.string() })
		})
	})
]);

export type JoinReq = z.infer<typeof reqScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.string().regex(/^Successfully retrieved join request for .*$/),
	data: z.array(reqScheme)
});

export async function ownRequests() {
	const res = await fetch(`${getApibase()}/mod/own`, {
		headers: getHeader()
	}).then((r) => r.json());

	const parsed = scheme.parse(res);
	return parsed;
}

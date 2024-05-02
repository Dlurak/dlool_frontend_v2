import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const reqScheme = z.union([
	z.object({
		user: z.object({
			username: z.string(),
			displayname: z.string(),
			created: z.number().int().min(0),
			classes: z.array(
				z.object({
					name: z.string(),
					school: z.object({
						name: z.string()
					})
				})
			)
		}),
		wantsToJoin: z.object({
			name: z.string(),
			school: z.object({
				name: z.string()
			})
		}),
		status: z.union([z.literal('Accepted'), z.literal('Rejected')]),
		created: z.number().int().min(0),
		reviewedAt: z.number().int().min(0),
		reviewedBy: z.object({
			username: z.string(),
			displayname: z.string()
		}),
		id: z.string()
	}),
	z.object({
		user: z.object({
			username: z.string(),
			displayname: z.string(),
			created: z.number().int().min(0),
			classes: z.array(
				z.object({
					name: z.string(),
					school: z.object({
						name: z.string()
					})
				})
			)
		}),
		wantsToJoin: z.object({
			name: z.string(),
			school: z.object({
				name: z.string()
			})
		}),
		status: z.literal('Pending'),
		created: z.number().int().min(0),
		reviewedAt: z.null(),
		reviewedBy: z.null(),
		id: z.string()
	})
]);

export type ForeignReq = z.infer<typeof reqScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.string().startsWith('Successfully retrieved join requests ').endsWith(' can review'),
	data: z.array(reqScheme)
});

interface ForeignReqProps {
	type?: 'Pending' | 'Accepted' | 'Rejected';
}

export async function foreignRequests(props: ForeignReqProps) {
	const res = await fetch(`${getApibase()}/mod?${props.type ? 'type=type' : ''}`, {
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return scheme.parse(res);
}

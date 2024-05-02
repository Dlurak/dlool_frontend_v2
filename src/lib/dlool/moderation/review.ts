import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.union([z.literal('Sucessfully rejected'), z.literal('Successfully accepted')]),
	data: z.null()
});

interface ReviewProps {
	id: string;
	operation: 'Rejected' | 'Accepted';
}

export async function review(props: ReviewProps) {
	const res = await fetch(`${getApibase()}/mod/${props.id}`, {
		method: 'PATCH',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			status: props.operation
		})
	}).then((r) => r.json());

	console.log(res.message);
	return scheme.parse(res);
}

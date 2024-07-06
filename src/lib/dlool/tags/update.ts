import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully updated tag'),
	data: z.null()
});

interface UpdateTagProps {
	tag: string;
	color: string;
}

export async function updateTag(id: string, props: UpdateTagProps) {
	const res = await fetch(`${getApibase()}/tags/${id}`, {
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(props)
	}).then((r) => r.json());

	return scheme.parse(res);
}

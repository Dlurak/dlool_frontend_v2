import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully deleted tag'),
	data: z.null()
});

export async function deleteTag(id: string) {
	const res = await fetch(`${getApibase()}/tags/${id}`, {
		method: 'DELETE',
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return scheme.parse(res);
}

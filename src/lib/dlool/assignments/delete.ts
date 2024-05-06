import { getApibase, getHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	data: z.null(),
	message: z.literal('Successfully deleted assignment'),
	status: z.literal('success')
});

export async function deleteAssignment(id: string) {
	const res = await fetch(`${getApibase()}/assignments/${id}`, {
		method: 'DELETE',
		headers: getHeader()
	}).then((r) => r.json());

	return scheme.parse(res);
}

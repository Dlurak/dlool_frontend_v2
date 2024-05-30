import { Method, getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully deleted user'),
	data: z.null()
});

export async function deleteAccount() {
	const res = await fetch(`${getApibase()}/user/me`, {
		method: Method.DELETE,
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return scheme.parse(res);
}

import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully deleted calendar event'),
	data: z.null()
});

export async function deleteCalendar(id: string) {
	const res = await fetch(`${getApibase()}/calendar/${id}`, {
		method: 'DELETE',
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return scheme.parse(res);
}

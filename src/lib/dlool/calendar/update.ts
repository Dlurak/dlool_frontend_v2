import type { Priority } from '$lib/types/priority';
import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

interface CalendarProps {
	id: string;

	title?: string;
	summary?: string;
	beginning?: number;
	ending?: number;
	location?: string;
	priority?: Priority
}

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal("Successfully updated calendar event"),
	data: z.null()
});

export async function updateCalendar({ id, ...body }: CalendarProps) {
	const res = await fetch(`${getApibase()}/calendar/${id}`, {
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(body)
	}).then((r) => r.json());

	return scheme.parse(res);
}

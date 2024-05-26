import { getApibase, getAuthHeader } from '$lib/utils/api';
import type { Priority } from '$lib/types/priority';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully created calendar event'),
	data: z.object({
		id: z.string()
	})
});

interface NewCalendarProps {
	school: string;
	class: string;
	title: string;
	beginning: number;
	ending?: number;
	summary?: string;
	location?: string;
	priority?: Priority;
}

export async function createCalendar(props: NewCalendarProps) {
	const res = await fetch(`${getApibase()}/calendar`, {
		method: 'POST',
		body: JSON.stringify({
			...props,
			tags: []
		}),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());

	return scheme.parse(res);
}

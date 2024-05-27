import { getApibase } from '$lib/utils/api';
import { objToQueryParams } from '$lib/utils/url/query';
import { z } from 'zod';

interface CalendarProps {
	school: string;
	classes: string[];

	limit?: number;
	offset?: number;
	orderDirection?: 'asc' | 'desc';
	orderKey?: 'beginning' | 'location';
}

const customDateScheme = z.object({
	year: z.number().int(),
	month: z.number().int(),
	day: z.number().int(),
	hour: z.number().int(),
	min: z.number().int()
});

const calendarScheme = z.object({
	title: z.string(),
	beginning: customDateScheme,
	ending: z.nullable(customDateScheme),
	summary: z.nullable(z.string()),
	location: z.nullable(z.string()),
	priority: z.nullable(
		z.union([
			z.literal('Minimal'),
			z.literal('Low'),
			z.literal('Medium'),
			z.literal('High'),
			z.literal('Critical')
		])
	),
	updates: z.array(
		z.object({
			user: z.object({
				username: z.string(),
				displayname: z.string()
			}),
			time: z.number().int()
		})
	),
	tags: z.array(z.unknown()),
	id: z.string()
});

export type Calendar = z.infer<typeof calendarScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Received data'),
	data: z.object({
		totalCount: z.number().int(),
		calendar: z.array(calendarScheme)
	})
});

export async function listCalendar(props: CalendarProps) {
	const url = `${getApibase()}/calendar/?${objToQueryParams({ ...props })}`;
	const res = await fetch(url).then((r) => r.json());

	return scheme.parse(res);
}

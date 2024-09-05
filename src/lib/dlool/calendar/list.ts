import { getApibase } from '$lib/utils/api';
import { normalToCustomDate } from '$lib/utils/dates/custom';
import { convertCustomUTCToLocal } from '$lib/utils/dates/utc';
import { removeKey } from '$lib/utils/objects/removeKey';
import { objToQueryParams } from '$lib/utils/url/query';
import { z } from 'zod';

interface CalendarProps {
	school: string;
	classes: string[];

	limit?: number;
	offset?: number;
	orderDirection?: 'asc' | 'desc';
	orderKey?: 'beginning' | 'location';
	filter?: {
		start?: {
			earliest: string;
			latest: string;
		};
		title?: {
			query: string;
			exact: boolean;
		};
		summary?: {
			query: string;
			exact: boolean;
		};
	};
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
	class: z.object({
		name: z.string(),
		school: z.object({ name: z.string() })
	}),
	updates: z.array(
		z.object({
			user: z.object({
				username: z.string(),
				displayname: z.string()
			}),
			time: z.number().int()
		})
	),
	tags: z.array(
		z.object({
			tag: z.string(),
			color: z.string()
		})
	),
	id: z.string()
});

export type Calendar = Awaited<ReturnType<typeof listCalendar>>['data']['calendar'][number];

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Received data'),
	data: z.object({
		totalCount: z.number().int(),
		calendar: z.array(calendarScheme)
	})
});

const positivSpecific = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved calendar event'),
	data: calendarScheme
});

const negativeSpecific = z.object({
	status: z.literal('error'),
	error: z.literal('Calendar event not found')
});

export async function listCalendar(props: CalendarProps) {
	const url = `${getApibase()}/calendar/?${objToQueryParams({ ...props })}`;
	const res = await fetch(url).then((r) => r.json());

	const parsed = scheme.parse(res);

	return {
		...parsed,
		data: {
			...parsed.data,
			calendar: parsed.data.calendar.map((cal) => ({
				...removeKey(cal, 'ending'),
				beginning: normalToCustomDate(convertCustomUTCToLocal(cal.beginning)),
				...(cal.ending && {
					ending: normalToCustomDate(convertCustomUTCToLocal(cal.ending))
				})
			}))
		}
	};
}

export async function specificCalendar(id: string) {
	const url = `${getApibase()}/calendar/${id}`;
	const res = await fetch(url).then((r) => r.json());

	try {
		const parsed = positivSpecific.parse(res);
		return {
			...parsed,
			data: {
				...removeKey(parsed.data, 'ending'),
				beginning: normalToCustomDate(convertCustomUTCToLocal(parsed.data.beginning)),
				...(parsed.data.ending && {
					ending: normalToCustomDate(convertCustomUTCToLocal(parsed.data.ending))
				})
			}
		};
	} catch {
		return negativeSpecific.parse(res);
	}
}

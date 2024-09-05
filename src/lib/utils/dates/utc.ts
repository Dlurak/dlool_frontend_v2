import type { CustomDateTime } from '$lib/utils/dates/custom';

export function convertCustomUTCToLocal({ year, month, day, hour, min }: CustomDateTime) {
	const dateUTC = new Date(Date.UTC(year, month - 1, day, hour, min));
	return new Date(dateUTC);
}

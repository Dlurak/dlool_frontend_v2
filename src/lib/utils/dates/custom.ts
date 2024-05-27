import { currentLang } from '$lib/stores';
import { get } from 'svelte/store';

export type CustomDate = {
	year: number;
	month: number;
	day: number;
};

export type CustomTime = {
	hour: number;
	min: number;
};

export type CustomDateTime = CustomDate & CustomTime;

const customToDateTime = (d: CustomDate | CustomDateTime) => {
	return {
		hour: 0,
		min: 0,
		...d
	} satisfies CustomDateTime as CustomDateTime;
};

export const dateTimeTocustom = (d: CustomDateTime | CustomDate): CustomDate => {
	const { year, month, day } = d;

	return { year, month, day };
};

export const customDateToNormal = (d: CustomDate | CustomDateTime) => {
	const { year, month, day, hour, min } = customToDateTime(d);

	return new Date(year, month - 1, day, hour, min);
};

export const normalToCustomDate = (d: Date) => {
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hour = d.getHours();
	const min = d.getMinutes();

	return { year, month, day, hour, min } satisfies CustomDateTime as CustomDateTime;
};

export const currentCustomDate = () => normalToCustomDate(new Date());

interface StringifyProps {
	includeTime?: boolean;
	includeDate?: boolean;
}

export const stringify = (d: CustomDate, props: StringifyProps = {}) => {
	const includeTime = props.includeTime ?? false;
	const includeDate = props.includeDate ?? true;

	const timeOptions: Intl.DateTimeFormatOptions = includeTime
		? {
				hour: 'numeric',
				minute: 'numeric'
			}
		: {};

	const dateOptions: Intl.DateTimeFormatOptions = includeDate
		? {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}
		: {};

	return customDateToNormal(d).toLocaleString(get(currentLang), {
		...timeOptions,
		...dateOptions
	});
};

export const serialize = ({ year, month, day }: CustomDate) => {
	const yearStr = `${year}`.padStart(4, '0');
	const monthStr = `${month}`.padStart(2, '0');
	const dayStr = `${day}`.padStart(2, '0');

	return `${yearStr}-${monthStr}-${dayStr}`;
};

export const deserialize = (d: string) => {
	const [year, month, day] = d.split('-').map((i) => parseInt(i));

	if (!year || !month || !day) return null;

	return { year, month, day } satisfies CustomDate as CustomDate;
};

export const sort = (
	date1: CustomDate | CustomDateTime,
	date2: CustomDate | CustomDateTime
): -1 | 0 | 1 => {
	const ts1 = customDateToNormal(date1).getTime();
	const ts2 = customDateToNormal(date2).getTime();

	if (ts1 < ts2) return -1;
	if (ts1 > ts2) return 1;

	return 0;
};

export const UNIX_TIME_EPOCHE_START: CustomDateTime = {
	year: 1970,
	month: 0,
	day: 1,
	hour: 0,
	min: 0
};

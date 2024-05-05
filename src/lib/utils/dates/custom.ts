import { currentLang } from '$lib/stores';
import { get } from 'svelte/store';

export type CustomDate = {
	year: number;
	month: number;
	day: number;
};

export const customDateToNormal = (d: CustomDate) => {
	const { year, month, day } = d;

	return new Date(year, month - 1, day);
};

export const normalToCustomDate = (d: Date) => {
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();

	return { year, month, day } satisfies CustomDate as CustomDate;
};

export const currentCustomDate = () => normalToCustomDate(new Date());

export const stringify = (d: CustomDate) => {
	return customDateToNormal(d).toLocaleString(get(currentLang), {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
};
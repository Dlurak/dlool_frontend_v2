import { currentLang } from '$lib/stores';
import { get } from 'svelte/store';

type CustomDate = {
	year: number;
	month: number;
	day: number;
};

export const customDateToNormal = (d: CustomDate) => {
	const { year, month, day } = d;

	return new Date(year, month - 1, day);
};

export const stringify = (d: CustomDate) => {
	return customDateToNormal(d).toLocaleString(get(currentLang), {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
};

import type { NumberToString } from '$lib/types/strToNum';

export const parse = <T extends string | number>(val: T) => {
	if (typeof val === 'number') return val as T;

	const trimmed = val.trim();

	if (!/^\d{1,2}$/.test(trimmed)) return null;

	const num = parseInt(trimmed);
	if (num > 23) return null;

	return num as NumberToString<T>;
};

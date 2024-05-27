import type { LayoutLoad } from './$types';
import { getClasses, getSchool, parseNumber } from '$lib/utils/url/parts';

export const load: LayoutLoad = ({ url }) => {
	const search = new URLSearchParams(url.search);

	const school = getSchool(search);
	const classes = getClasses(search);
	const limit = parseNumber({
		attributes: ['limit', 'l', 'lim'],
		default: 25,
		min: 5,
		params: search
	});
	const offset = parseNumber({
		attributes: ['offset', 'off', 'o'],
		default: 0,
		min: 0,
		params: search
	});

	if (!(school && classes && classes.length > 0)) {
		return { msg: 'missing school and class' };
	}

	const query = { school, classes, limit, offset };

	return {
		query
	};
};

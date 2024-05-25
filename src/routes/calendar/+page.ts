import type { PageLoad } from './$types';
import { listCalendar } from '$lib/dlool/calendar/list';
import { getClasses, getSchool, parseNumber } from '$lib/utils/url/parts';

export const load: PageLoad = ({ url }) => {
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
		data: listCalendar(query),
		query
	};
};

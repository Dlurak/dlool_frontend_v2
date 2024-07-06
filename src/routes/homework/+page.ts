import { DATE } from '$lib/constants/regex';
import { loadAssignments } from '$lib/dlool/assignments/list';
import type { OrderKey, SortOrder } from '$lib/types/sorting';
import { deserialize } from '$lib/utils/dates/custom';
import { safeMap } from '$lib/utils/null/safeMap';
import { getClasses, getFirstOf, getSchool, parseNumber } from '$lib/utils/url/parts';
import type { PageLoad } from './$types';

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

	const dueStart = search.get('dueStart');
	const dueEnd = search.get('dueEnd');

	const fromStart = search.get('fromStart');
	const fromEnd = search.get('fromEnd');

	const orderKey = getFirstOf<OrderKey>(['orderKey'])(search) ?? 'due';
	const direction = getFirstOf<SortOrder>(['direction'])(search) ?? 'desc';

	if (school && classes && classes.length > 0) {
		return {
			data: loadAssignments({
				school,
				classes,
				limit,
				offset,
				filter: {
					due: {
						earliest: (DATE.test(dueStart ?? '') && dueStart) || undefined,
						latest: (DATE.test(dueEnd ?? '') && dueEnd) || undefined
					},
					from: {
						earliest: (DATE.test(fromStart ?? '') && fromStart) || undefined,
						latest: (DATE.test(fromEnd ?? '') && fromEnd) || undefined
					}
				},
				orderKey,
				orderDirection: direction
			}).catch(() => null),

			query: {
				school,
				classes,
				limit,
				offset,
				dueStart: safeMap(dueStart, deserialize),
				dueEnd: safeMap(dueEnd, deserialize),
				fromStart: safeMap(fromStart, deserialize),
				fromEnd: safeMap(fromEnd, deserialize)
			}
		};
	}

	return {
		status: 'error',
		message: 'no school/class provided'
	} as const;
};

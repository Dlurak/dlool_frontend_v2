import { DATE } from '$lib/constants/regex';
import { loadAssignments } from '$lib/dlool/assignments/list';
import { deserialize } from '$lib/utils/dates/custom';
import { safeMap } from '$lib/utils/null/safeMap';
import { split } from '$lib/utils/strings/split';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const search = new URLSearchParams(url.search);

	const school = search.get('school') || search.get('School') || search.get('s');
	const classes = ['classes', 'class', 'Class', 'Classes', 'c']
		.map((q) => split(search.get(q) ?? '').filter((i) => i))
		.find((i) => i.length > 0);

	const limit = Math.max(
		parseInt(['limit', 'l', 'lim'].map((i) => search.get(i)).find((i) => i) ?? '0') || 25,
		5
	);

	const offset = Math.max(
		parseInt(['offset', 'off', 'o'].map((i) => search.get(i)).find((i) => i) ?? '0') || 0,
		0
	);

	const dueStart = search.get('dueStart');
	const dueEnd = search.get('dueEnd');

	const fromStart = search.get('fromStart');
	const fromEnd = search.get('fromEnd');

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
				}
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

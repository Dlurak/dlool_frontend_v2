import { loadAssignments } from '$lib/dlool/assignments/list';
import { split } from '$lib/utils/strings/split';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const search = new URLSearchParams(url.search);

	const school = search.get('school') || search.get('School') || search.get('s');
	const classes = ['classes', 'class', 'Class', 'Classes', 'c']
		.map((q) => split(search.get(q) ?? '').filter((i) => i))
		.find((i) => i.length > 0);

	if (school && classes && classes.length > 0) {
		return { data: loadAssignments({ school, classes }) };
	}

	return {
		status: 'error',
		message: 'no school/class provided'
	} as const;
};
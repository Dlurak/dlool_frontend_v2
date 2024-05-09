import type { LayoutLoad } from './$types';
import { split } from '$lib/utils/strings/split';
import { listNotes } from '$lib/dlool/notes/list';

export const load: LayoutLoad = ({ url }) => {
	const search = new URLSearchParams(url.search);

	const school = ['school', 'School', 's'].map((q) => search.get(q)).find((i) => i);
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

	if (school && classes && classes.length > 0) {
		const query = { school, classes, limit, offset };

		return {
			data: listNotes(query),
			query
		};
	}

	return { msg: 'specify class' };
};

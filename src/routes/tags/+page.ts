import { listTags } from '$lib/dlool/tags/list';
import { sortByPredicate } from '$lib/utils/arrays/sort';
import { safeMap } from '$lib/utils/null/safeMap';
import { getClasses, getSchool } from '$lib/utils/url/parts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const search = new URLSearchParams(url.search);

	const schoolName = getSchool(search);
	const className = safeMap(getClasses(search), (l) => l.at(0)) ?? undefined;

	const query = {
		school: schoolName,
		class: className
	};

	if (!query.school || !query.class) {
		return { status: 'error', query } as const;
	}

	const tags = await listTags(
		{
			school: query.school,
			class: query.class
		},
		fetch
	).then((t) => sortByPredicate(t, ({ tag }) => tag));

	return { data: tags, status: 'success' as const, query };
};

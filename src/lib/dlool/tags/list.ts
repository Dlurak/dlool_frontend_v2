import { getApibase } from '$lib/utils/api';
import { objToQueryParams } from '$lib/utils/url/query';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved tags'),
	data: z.array(
		z.object({
			tag: z.string(),
			color: z.string(),
			id: z.string()
		})
	)
});

interface ListTagsProps {
	school: string;
	class: string;
}

export async function listTags(props: ListTagsProps) {
	const res = await fetch(`${getApibase()}/tags?${objToQueryParams({ ...props })}`).then((r) =>
		r.json()
	);

	return scheme.parse(res).data;
}

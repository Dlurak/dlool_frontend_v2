import type { Tag } from '$lib/components/tags/types';
import { getApibase, getAuthHeader } from '$lib/utils/api';
import { filterObject } from '$lib/utils/objects/filter';
import { z } from 'zod';

interface NoteProps {
	id: string;

	title?: string;
	summary?: string;
	priority?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Minimal';
	editScope?: 'Self' | 'Class' | 'School';
	tags?: Tag[];
}

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully updated note'),
	data: z.null()
});

export async function updateNote({ id, ...body }: NoteProps) {
	const res = await fetch(`${getApibase()}/notes/${id}`, {
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(
			filterObject(
				{
					...body,
					summary: body.summary?.trim(),
					tags: body.tags?.map(({ tag }) => tag)
				},
				() => true,
				(x) => !!x
			)
		)
	}).then((r) => r.json());

	return scheme.parse(res);
}

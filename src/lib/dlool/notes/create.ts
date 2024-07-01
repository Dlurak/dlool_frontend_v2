import type { Tag } from '$lib/components/tags/types';
import type { Priority } from '$lib/types/priority';
import { getApibase, getAuthHeader } from '$lib/utils/api';
import { removeKey } from '$lib/utils/objects/removeKey';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully created note'),
	data: z.object({
		id: z.string()
	})
});

interface NoteProps {
	school: string;
	class: string;
	title: string;

	summary?: string;
	priority?: Priority;
	editScope?: 'Self' | 'Class' | 'School';
	tags?: Tag[] | null;
}

export async function createNote(props: NoteProps) {
	const res = await fetch(`${getApibase()}/notes`, {
		method: 'POST',
		body: JSON.stringify(
			Array.isArray(props.tags)
				? { ...props, tags: props.tags.map(({ tag }) => tag) }
				: removeKey(props, 'tags')
		),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());

	return scheme.parse(res);
}

import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

interface NoteProps {
	id: string;

	title?: string;
	summary?: string;
	priority?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Minimal';
	editScope?: 'Self' | 'Class' | 'School';
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
		body: JSON.stringify(body)
	}).then((r) => r.json());

	console.log(res);
	return scheme.parse(res);
}

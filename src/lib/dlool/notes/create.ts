import { getApibase, getAuthHeader } from '$lib/utils/api';
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
	priority?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Minimal';
	editScope?: 'Self' | 'Class' | 'School';
}

export async function createNote(props: NoteProps) {
	const res = await fetch(`${getApibase()}/notes`, {
		method: 'POST',
		body: JSON.stringify(props),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());

	return scheme.parse(res);
}

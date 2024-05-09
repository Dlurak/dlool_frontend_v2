import { getApibase, getAuthHeader } from '$lib/utils/api';
import { objToQueryParams } from '$lib/utils/url/query';
import { z } from 'zod';

interface NoteProps {
	school: string;
	classes: string[];

	limit?: number;
	offset?: number;
}

const noteScheme = z.object({
	title: z.string(),
	summary: z.nullable(z.string()),
	tags: z.array(z.unknown()),
	priority: z.union([
		z.literal('Minimal'),
		z.literal('Low'),
		z.literal('Medium'),
		z.literal('High'),
		z.literal('Critical'),
		z.null()
	]),
	updates: z.array(
		z.object({
			user: z.object({
				username: z.string(),
				displayname: z.string()
			}),
			time: z.number().int()
		})
	),
	editScope: z.optional(z.union([z.literal('Self'), z.literal('Class'), z.literal('School')])),
	class: z.object({
		name: z.string(),
		school: z.object({
			name: z.string()
		})
	}),
	creator: z.object({ username: z.string() })
});

export type Note = z.infer<typeof noteScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved data'),
	data: z.object({
		totalCount: z.number().int().min(0),
		notes: z.array(noteScheme.extend({ id: z.string() }))
	})
});

export async function listNotes(props: NoteProps) {
	const url = `${getApibase()}/notes?${objToQueryParams({ ...props })}`;
	const res = await fetch(url).then((r) => r.json());

	return scheme.parse(res);
}

const specificSuccess = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved note'),
	data: noteScheme
});

const specificNotFound = z.object({
	status: z.literal('error'),
	error: z.literal('Note not found')
});

export async function specifcNote(id: string) {
	const url = `${getApibase()}/notes/${id}`;

	const res = await fetch(url).then((r) => r.json());

	return z.union([specificSuccess, specificNotFound]).parse(res);
}

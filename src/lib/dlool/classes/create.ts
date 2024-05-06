import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.string().regex(/^Successfully created class /),
		data: z.null()
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('School not found')
	}),
	z.object({
		status: z.literal('error'),
		error: z.string().regex(/^A class with the name .* already exists in the school .*$/)
	})
]);

interface ClassProps {
	school: string;
	name: string;
}

export async function createClass(props: ClassProps) {
	const res = await fetch(`${getApibase()}/classes`, {
		method: 'POST',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			school: props.school,
			name: props.name
		})
	}).then((r) => r.json());

	const parsed = scheme.parse(res);
	return parsed;
}

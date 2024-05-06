import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.literal('Successfully created school Dlool'),
		data: z.null()
	}),
	z.object({
		status: z.literal('error'),
		error: z.string().regex(/^A school with the name .* already exists/)
	})
]);

interface SchoolProps {
	name: string;
}

export async function createSchool(props: SchoolProps) {
	const res = await fetch(`${getApibase()}/school`, {
		method: 'POST',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: props.name,
			description: props.name
		})
	}).then((r) => r.json());

	const parsed = scheme.parse(res);
	return parsed;
}

import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.union([
			z.literal('Join request created successfully!'),
			z.literal('Joined class successfully!')
		]),
		data: z.null()
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('Request already exists')
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('User is already in class')
	})
]);

interface JoinProps {
	school: string;
	class: string;
}

export async function joinClass(props: JoinProps) {
	const res = await fetch(`${getApibase()}/mod`, {
		method: 'POST',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			school: props.school,
			class: props.class
		})
	}).then((r) => r.json());

	return scheme.parse(res);
}

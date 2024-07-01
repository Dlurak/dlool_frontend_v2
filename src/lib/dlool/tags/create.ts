import { Method, getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.literal('Created a new tag'),
		data: z.null()
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('This tag already exists')
	})
]);

interface CreateTagProps {
	tag: string;
	class: string;
	color: string;
}

export async function createTag(props: CreateTagProps, fetcher: typeof fetch = fetch) {
	const res = await fetcher(`${getApibase()}/tags`, {
		method: Method.POST,
		body: JSON.stringify({ ...props }),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
	console.log(res);

	return scheme.parse(res);
}

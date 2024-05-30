import { Method, getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully updated user details'),
	data: z.null()
});

interface UserChangeProps {
	displayname?: string;
	password?: string;
}

export async function changeDetails(props: UserChangeProps) {
	const res = await fetch(`${getApibase()}/user/me`, {
		method: Method.PUT,
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(props)
	}).then((r) => r.json());

	return scheme.parse(res);
}

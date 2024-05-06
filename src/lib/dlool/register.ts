import { getApibase, getHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.literal('User created successfully'),
		data: z.object({
			usernmae: z.string()
		})
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('Username already taken')
	})
]);

interface RegisterProps {
	username: string;
	displayname: string;
	password: string;
}

export async function register(props: RegisterProps) {
	const res = await fetch(`${getApibase()}/auth/register/password`, {
		method: 'POST',
		headers: getHeader(),
		body: JSON.stringify({
			username: props.username,
			displayname: props.displayname,
			password: props.password
		})
	}).then((r) => r.json());

	return scheme.parse(res);
}

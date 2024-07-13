import { getApibase } from '$lib/utils/api';
import { currentMs } from '$lib/utils/dates/current';
import { z } from 'zod';
import { logout } from './logout';
import { get, type Writable } from 'svelte/store';

const inNSecondsToTs = (n: number) => n * 1_000 + currentMs();

const scheme = z.union([
	z.object({
		status: z.literal('success'),
		message: z.literal('Token generated successfully'),
		data: z.object({
			refreshToken: z.object({
				token: z.string(),
				expiresIn: z.number().min(1).int()
			}),
			accessToken: z.object({
				token: z.string(),
				expiresIn: z.number().min(1).int()
			})
		})
	}),
	z.object({
		status: z.literal('error'),
		error: z.literal('Username or password is incorrect')
	})
]);

interface LoginProps {
	username: string;
	password: string;

	refreshToken: Writable<string | null>;
	refreshExpires: Writable<number | null>;
	accessToken: Writable<string | null>;
	accessExpires: Writable<number | null>;
	generatedBy: Writable<'login' | 'refreshToken' | null>;
}

/*
TODO: Create a const { login } = useLogin() hook to refactor this mess with stores
*/

export async function login(props: LoginProps) {
	const { refreshToken, refreshExpires, accessToken, accessExpires, generatedBy } = props;

	const res = await fetch(`${getApibase()}/auth/refresh-token/password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: props.username,
			password: props.password
		})
	}).then((r) => r.json());

	const parsed = scheme.parse(res);

	if (parsed.status !== 'success') return parsed;

	const oldRefreshToken = get(refreshToken);

	if (oldRefreshToken) {
		logout({ refreshToken: oldRefreshToken }).catch();
	}

	refreshToken.set(parsed.data.refreshToken.token);
	refreshExpires.set(inNSecondsToTs(parsed.data.refreshToken.expiresIn));
	accessToken.set(parsed.data.accessToken.token);
	accessExpires.set(inNSecondsToTs(parsed.data.accessToken.expiresIn));
	generatedBy.set('login');

	return parsed;
}

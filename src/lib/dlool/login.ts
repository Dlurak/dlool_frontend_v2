import { getApibase } from '$lib/utils/api';
import { currentMs } from '$lib/utils/dates/current';
import { svocal } from '$lib/utils/store/svocal';
import { z } from 'zod';
import { logout } from './logout';
import { get } from 'svelte/store';

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
}

export async function login(props: LoginProps) {
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

	const refreshToken = svocal('auth.refresh.token');
	const oldRefreshToken = get(refreshToken);

	if (oldRefreshToken) {
		logout({ refreshToken: oldRefreshToken });
	}

	refreshToken.set(parsed.data.refreshToken.token);
	svocal('auth.refresh.expires').set(inNSecondsToTs(parsed.data.refreshToken.expiresIn));
	svocal('auth.access.token').set(parsed.data.accessToken.token);
	svocal('auth.access.expires').set(inNSecondsToTs(parsed.data.accessToken.expiresIn));
	svocal('auth.access.generatedBy').set('login');

	return parsed;
}

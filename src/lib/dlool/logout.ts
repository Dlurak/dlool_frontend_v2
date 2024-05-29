import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	data: z.null(),
	message: z.literal('Deleted one refresh token successfully'),
	status: z.literal('success')
});

interface LogoutProps {
	refreshToken: string;
}

export async function logout(props: LogoutProps) {
	const res = await fetch(`${getApibase()}/auth/refresh-token/${props.refreshToken}`, {
		method: 'DELETE',
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return scheme.parse(res);
}

const allScheme = z.object({
	message: z.literal('Logged out from all sessions'),
	data: z.object({
		sessionCount: z.number()
	})
});

export async function logoutFromAll() {
	const res = await fetch(`${getApibase()}/auth/refresh-token/all`, {
		method: 'DELETE',
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	return allScheme.parse(res);
}

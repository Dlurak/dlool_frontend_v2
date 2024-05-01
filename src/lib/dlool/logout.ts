import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const scheme = z.object({
	data: z.null(),
	message: z.literal('Deleted one refresh token successfully'),
	status: z.literal('Success')
});

interface LogoutProps {
	refreshToken: string;
}

export async function logout(props: LogoutProps) {
	const res = await fetch(`${getApibase()}/auth/refresh-token/${props.refreshToken}`, {
		method: 'DELETE',
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	scheme.parse(res);
}

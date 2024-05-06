import { getApibase, getHeader } from '$lib/utils/api';
import { currentMs } from '$lib/utils/dates/current';
import { svocal } from '$lib/utils/store/svocal';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Token generated successfully'),
	data: z.object({
		token: z.string(),
		expiresIn: z.number().min(1).int()
	})
});

interface RefreshProps {
	refreshToken: string;
}

export async function refresh(props: RefreshProps) {
	const res = await fetch(`${getApibase()}/auth/access-token/`, {
		method: 'POST',
		headers: getHeader(),
		body: JSON.stringify({
			refreshToken: props.refreshToken
		})
	}).then((r) => r.json());

	const parsed = scheme.parse(res);

	svocal('auth.access.token').set(parsed.data.token);
	svocal('auth.access.expires').set(parsed.data.expiresIn * 1_000 + currentMs());
	svocal('auth.access.generatedBy').set('refreshToken');

	return parsed;
}

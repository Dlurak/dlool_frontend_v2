import { confirm } from '$lib/components/layout/confirmation';
import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
import { i } from '$lib/i18n/store';
import { getApibase, getAuthHeader } from '$lib/utils/api';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
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

export async function logoutListener(props?: { postValidation?: () => void }) {
	const token = get(svocal('auth.refresh.token'));
	if (!token) return;

	if (props?.postValidation) props?.postValidation();

	const confimred = await confirm({
		ok: i('settings.logout.confirm.ok'),
		desc: i('settings.logout.confirm.desc'),
		title: i('settings.logout')
	});
	if (!confimred) return;

	logout({ refreshToken: token })
		.then(() => {
			svocal('auth.refresh.token').set(null);
			svocal('auth.refresh.expires').set(null);
			svocal('auth.access.token').set(null);
			svocal('auth.access.expires').set(null);
			svocal('auth.access.generatedBy').set(null);

			sendToast({
				type: 'success',
				content: i('settings.logout.success'),
				timeout: 5_000
			});
		})
		.catch(sendDefaultErrorToast);
}

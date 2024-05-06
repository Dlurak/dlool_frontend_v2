import { counter } from 'nutzlich';
import { toasts, type Toast } from './store';
import { get } from 'svelte/store';
import { i } from '$lib/i18n/store';

const index = counter(0);

export function sendToast(props: Toast) {
	toasts.update((t) => [
		...t,
		{
			...props,
			id: get(index),
			active: true
		}
	]);
	index.inc();
}

export const sendDefaultErrorToast = () =>
	sendToast({
		type: 'error',
		content: i('error'),
		timeout: 5_000
	});

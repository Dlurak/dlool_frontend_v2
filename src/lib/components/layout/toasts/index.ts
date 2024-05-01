import { counter } from 'nutzlich';
import { toasts, type Toast } from './store';
import { get } from 'svelte/store';

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

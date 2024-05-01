import type { Readable } from 'svelte/motion';
import { writable } from 'svelte/store';

export type Toast = {
	content: Readable<string>;
	type: 'success' | 'error' | 'warning' | 'info';
	timeout?: number;
};

type InternalToast = Toast & {
	id: number;
	active: boolean;
};

export const toasts = writable<InternalToast[]>([]);

import type { Readable } from 'svelte/motion';

export type Option<T> = {
	value: T;
	label: Readable<string>;
};

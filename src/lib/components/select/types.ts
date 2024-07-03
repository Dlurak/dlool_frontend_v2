import type { Readable } from 'svelte/motion';
import type { IconSource } from 'svelte-hero-icons';

export type Option<T> = {
	value: T;
	label: Readable<string>;

	icon?: IconSource;
};

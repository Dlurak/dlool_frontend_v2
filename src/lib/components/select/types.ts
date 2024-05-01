import type { Readable } from 'svelte/motion';

export type Option = {
	value: string;
	label: Readable<string>;
};

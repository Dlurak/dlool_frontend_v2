import type { Readable } from 'svelte/store';

export type Modifier = 'Ctrl';

export type KeyCombi = {
	modifier: Modifier[];
	keys: string[];
};

export type Shortcut = {
	description: Readable<string>;
	keys: KeyCombi[];
};

export type Context = 'global';

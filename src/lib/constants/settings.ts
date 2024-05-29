import type { Readable } from 'svelte/store';
import { User, type IconSource } from 'svelte-hero-icons';
import { i } from '$lib/i18n/store';

type Setting = {
	uri: string;
	label: Readable<string>;
	icon?: IconSource;
};

export const settings: Setting[] = [
	{
		uri: '/profile',
		label: i('settings.profile'),
		icon: User
	}
];

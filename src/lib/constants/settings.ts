import type { Readable } from 'svelte/store';
import { Cog, PaintBrush, User, type IconSource } from 'svelte-hero-icons';
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
	},
	{
		uri: '/general',
		label: i('settings.general'),
		icon: Cog
	},
	{
		uri: '/color',
		label: i('settings.color'),
		icon: PaintBrush
	}
];

export const DEFAULT_SUBJECT_COLOR = '#94E2D5';

import type { Readable } from 'svelte/store';
import { Calendar, Cog, PaintBrush, User, BookOpen, type IconSource } from 'svelte-hero-icons';
import { i } from '$lib/i18n/store';

type Setting =
	| {
			uri: string;
			label: Readable<string>;
			icon?: IconSource;
	  }
	| 'hr';

export const settings: Setting[] = [
	{
		uri: '/profile',
		label: i('settings.profile'),
		icon: User
	},
	'hr',
	{
		uri: '/general',
		label: i('settings.general'),
		icon: Cog
	},
	{
		uri: '/timetable',
		label: i('settings.timetable'),
		icon: Calendar
	},
	{
		uri: '/color',
		label: i('settings.color'),
		icon: PaintBrush
	},
	{
		uri: '/homework',
		label: i('settings.assignments'),
		icon: BookOpen
	}
];

export const DEFAULT_SUBJECT_COLOR = '#94E2D5';

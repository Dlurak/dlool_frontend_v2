import { get, type Readable } from 'svelte/store';
import {
	DeviceTablet,
	Calendar,
	Cog,
	PaintBrush,
	User,
	BookOpen,
	type IconSource
} from 'svelte-hero-icons';
import { i } from '$lib/i18n/store';
import { isApple } from '$lib/stores';

type Setting =
	| {
			type: 'link';
			uri: string;
			label: Readable<string>;
			icon?: IconSource;
			show?: (browser: boolean) => boolean;
	  }
	| {
			type: 'hr';
			show?: (browser: boolean) => boolean;
	  };

export const settings: Setting[] = [
	{
		type: 'link',
		uri: '/profile',
		label: i('settings.profile'),
		icon: User
	},
	{
		type: 'hr'
	},
	{
		type: 'link',
		uri: '/general',
		label: i('settings.general'),
		icon: Cog
	},
	{
		type: 'link',
		uri: '/timetable',
		label: i('settings.timetable'),
		icon: Calendar
	},
	{
		type: 'link',
		uri: '/color',
		label: i('settings.color'),
		icon: PaintBrush
	},
	{
		type: 'link',
		uri: '/homework',
		label: i('settings.assignments'),
		icon: BookOpen
	},
	{
		type: 'hr',
		show: (browser) => {
			if (!browser) return get(isApple);

			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				('standalone' in window.navigator && !!window.navigator.standalone);

			return !isStandalone && get(isApple);
		}
	},
	{
		type: 'link',
		uri: '/icon',
		label: i('settings.icon'),
		icon: DeviceTablet,
		show: (runsInBrowser) => {
			if (!runsInBrowser) return get(isApple);

			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				('standalone' in window.navigator && !!window.navigator.standalone);

			return !isStandalone && get(isApple);
		}
	}
];

export const DEFAULT_SUBJECT_COLOR = '#94E2D5';

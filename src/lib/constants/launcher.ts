import { goto } from '$app/navigation';
import { closeLauncher, setNewList } from '$lib/components/layout/launcher/hook';
import { logoutListener } from '$lib/dlool/logout';
import { i } from '$lib/i18n/store';
import { svocal } from '$lib/utils/store/svocal';
import {
	Home,
	BookOpen,
	User,
	UserPlus,
	RectangleGroup,
	PencilSquare,
	Calendar,
	Cog,
	UserMinus,
	PaintBrush,
	ViewColumns,
	type IconSource,
	UserGroup
} from 'svelte-hero-icons';
import { derived, type Readable } from 'svelte/store';

const split = (store: Readable<string>) => derived(store, (str) => str.split('\n'));

export type LauncherItem = {
	label: Readable<string>;
	description: Readable<string> | null;
	icon: IconSource | null;
	callback: () => void;
	searchTerms: Readable<string[]>;
	enabled?: Readable<boolean>;
};

export type LauncherSelectableItem = {
	label: Readable<string>;
	description: Readable<string> | null;
	icon: IconSource | null;
	callback: () => void;
	searchTerms: Readable<string[]>;
	matchedBy: string | null;
	coefficient: number;
	index: number;
	enabled?: Readable<boolean>;
};

export const launcherItems: LauncherItem[] = [
	{
		label: i('launcher.home'),
		description: null,
		icon: Home,
		callback: () => {
			goto('/');
			closeLauncher();
		},
		searchTerms: split(i('launcher.home.terms'))
	},
	{
		label: i('launcher.login'),
		description: null,
		icon: User,
		callback: () => {
			goto('/login');
			closeLauncher();
		},
		searchTerms: split(i('launcher.login.terms'))
	},
	{
		label: i('launcher.homework'),
		description: null,
		icon: BookOpen,
		callback: () => {
			goto('/homework');
			closeLauncher();
		},
		searchTerms: split(i('launcher.homework.terms'))
	},
	{
		label: i('launcher.register'),
		description: null,
		icon: UserPlus,
		callback: () => {
			goto('/register');
			closeLauncher();
		},
		searchTerms: split(i('launcher.register.terms'))
	},
	{
		label: i('launcher.join'),
		description: null,
		icon: RectangleGroup,
		callback: () => {
			goto('/join');
			closeLauncher();
		},
		searchTerms: split(i('launcher.join.terms'))
	},
	{
		label: i('launcher.mod.own'),
		description: i('launcher.mod.own.desc'),
		icon: UserPlus,
		callback: () => {
			goto('/moderation/own');
			closeLauncher();
		},
		searchTerms: split(i('launcher.mod.own.terms'))
	},
	{
		label: i('launcher.mod.list'),
		description: i('launcher.mod.list.desc'),
		icon: UserPlus,
		callback: () => {
			goto('/moderation/list');
			closeLauncher();
		},
		searchTerms: split(i('launcher.mod.list.terms'))
	},
	{
		label: i('launcher.notes'),
		description: null,
		icon: PencilSquare,
		callback: () => {
			goto('/notes');
			closeLauncher();
		},
		searchTerms: split(i('launcher.notes.terms'))
	},
	{
		label: i('launcher.calendar'),
		description: null,
		icon: Calendar,
		callback: () => {
			goto('/calendar');
			closeLauncher();
		},
		searchTerms: split(i('launcher.calendar.terms'))
	},
	{
		label: i('launcher.settings'),
		description: null,
		icon: Cog,
		callback: () => {
			goto('/settings');
			closeLauncher();
		},
		searchTerms: split(i('launcher.settings.terms'))
	},
	{
		label: i('launcher.settings.color'),
		description: null,
		icon: PaintBrush,
		callback: () => {
			goto('/settings/color');
			closeLauncher();
		},
		searchTerms: split(i('launcher.settings.color.terms'))
	},
	{
		label: i('launcher.settings.timetable'),
		description: null,
		icon: Calendar,
		callback: () => {
			goto('/settings/timetable');
			closeLauncher();
		},
		searchTerms: split(i('launcher.settings.timetable.terms'))
	},
	{
		label: i('launcher.holidays'),
		description: null,
		icon: Calendar,
		callback: () => {
			goto('/holiday');
			closeLauncher();
		},
		searchTerms: split(i('launcher.holidays.terms'))
	},
	{
		label: i('launcher.contributions'),
		description: null,
		icon: UserGroup,
		callback: () => {
			goto('/contributions');
			closeLauncher();
		},
		searchTerms: split(i('launcher.contributions.terms'))
	},
	{
		label: i('launcher.logout'),
		description: null,
		icon: UserMinus,
		callback: async () => {
			logoutListener({ postValidation: closeLauncher });
		},
		searchTerms: split(i('launcher.logout.terms')),
		enabled: derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login')
	},
	{
		label: i('launcher.width'),
		description: null,
		icon: ViewColumns,
		callback: () => {
			const launcherWidth = svocal('settings.launcher.width');
			const launcherWidths = ['small', 'medium', 'large'] as const;

			setNewList(
				launcherWidths.map((size) => ({
					label: i(`settings.general.launcher.width.${size}`),
					callback: () => launcherWidth.set(size),
					searchTerms: split(i(`settings.general.launcher.width.${size}`)),
					icon: null,
					description: null
				}))
			);
		},
		searchTerms: split(i('launcher.width.terms'))
	}
];

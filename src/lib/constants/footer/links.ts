import { goto } from '$app/navigation';
import { i } from '$lib/i18n/store';
import type { Readable } from 'svelte/store';
import {
	type IconSource,
	BookOpen,
	User,
	UserPlus,
	PencilSquare,
	Calendar,
	RectangleGroup,
    Cog
} from 'svelte-hero-icons';

type Link = {
	name: Readable<string>;
	action: () => void;
	icon?: IconSource;
};

type LinkGroup = {
	name: Readable<string>;
	entries: Link[];
};

export const links: LinkGroup[] = [
	{
		name: i('nav.footer.auth'),
		entries: [
			{
				name: i('nav.footer.auth.login'),
				action: () => goto('/login'),
				icon: User
			},
			{
				name: i('nav.footer.auth.register'),
				action: () => goto('/register'),
				icon: UserPlus
			},
			{
				name: i('nav.footer.auth.join'),
				action: () => goto('/join'),
				icon: RectangleGroup
			}
		]
	},
	{
		name: i('nav.footer.mod'),
		entries: [
			{
				name: i('nav.footer.mod.own'),
				action: () => goto('/moderation/own')
			},
			{
				name: i('nav.footer.mod.list'),
				action: () => goto('/moderation/list')
			}
		]
	},
	{
		name: i('nav.footer.homework'),
		entries: [
			{
				name: i('nav.footer.homework.homework'),
				action: () => goto('/homework'),
				icon: BookOpen
			}
		]
	},
	{
		name: i('nav.footer.notes'),
		entries: [
			{
				name: i('nav.footer.notes.notes'),
				action: () => goto('/notes'),
				icon: PencilSquare
			}
		]
	},
	{
		name: i('nav.footer.calendar'),
		entries: [
			{
				name: i('nav.footer.calendar.calendar'),
				action: () => goto('/calendar'),
				icon: Calendar
			}
		]
	},
	{
		name: i('nav.footer.else'),
		entries: [
			{
				name: i('nav.footer.else.settings'),
				action: () => goto('/settings'),
				icon: Cog
			}
		]
	}
];

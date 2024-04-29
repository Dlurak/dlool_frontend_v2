import { goto } from '$app/navigation';
import { i } from '$lib/i18n/store';
import type { Readable } from 'svelte/store';
import {
	BookOpen,
	User,
	UserPlus,
	PencilSquare,
	type IconSource,
	Calendar
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
	}
];

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
	Cog,
	UserGroup,
	Bookmark
} from 'svelte-hero-icons';

type Link = {
	name: Readable<string>;
	href: string;
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
				href: '/login',
				icon: User
			},
			{
				name: i('nav.footer.auth.register'),
				href: '/register',
				icon: UserPlus
			},
			{
				name: i('nav.footer.auth.join'),
				href: '/join',
				icon: RectangleGroup
			}
		]
	},
	{
		name: i('nav.footer.mod'),
		entries: [
			{
				name: i('nav.footer.mod.own'),
				href: '/moderation/own'
			},
			{
				name: i('nav.footer.mod.list'),
				href: '/moderation/list'
			}
		]
	},
	{
		name: i('nav.footer.homework'),
		entries: [
			{
				name: i('nav.footer.homework.homework'),
				href: '/homework',
				icon: BookOpen
			}
		]
	},
	{
		name: i('nav.footer.notes'),
		entries: [
			{
				name: i('nav.footer.notes.notes'),
				href: '/notes',
				icon: PencilSquare
			}
		]
	},
	{
		name: i('nav.footer.calendar'),
		entries: [
			{
				name: i('nav.footer.calendar.calendar'),
				href: '/calendar',
				icon: Calendar
			}
		]
	},
	{
		name: i('nav.footer.else'),
		entries: [
			{
				name: i('nav.footer.else.settings'),
				href: '/settings',
				icon: Cog
			},
			{
				name: i('nav.footer.else.holiday'),
				href: '/holiday',
				icon: Calendar
			},
			{
				name: i('nav.footer.else.contributors'),
				href: '/contributions',
				icon: UserGroup
			},
			{
				name: i('nav.footer.else.tags'),
				href: '/tags',
				icon: Bookmark
			}
		]
	}
];

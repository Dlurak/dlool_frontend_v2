import type { NavigationTarget } from '$lib/components/layout/navigation/types';
import { type Readable } from 'svelte/store';
import { goto } from '$app/navigation';
import { i } from '$lib/i18n/store';
import {
	BookOpen,
	User,
	UserPlus,
	Calendar,
	PencilSquare,
	MagnifyingGlass,
	Cog,
	CalendarDays,
	type IconSource
} from 'svelte-hero-icons';
import { useLauncher } from '$lib/components/layout/launcher/hook';

const { isOpen } = useLauncher();

export const navbarEntries: Record<
	NavigationTarget,
	{ icon: IconSource; action: () => void; text: Readable<string> }
> = {
	login: {
		icon: User,
		action: () => goto('/login'),
		text: i('nav.login')
	},
	notes: {
		icon: PencilSquare,
		action: () => goto('/notes'),
		text: i('nav.notes')
	},
	calendar: {
		icon: CalendarDays,
		action: () => goto('/calendar'),
		text: i('nav.calendar')
	},
	homework: {
		icon: BookOpen,
		action: () => goto('/homework'),
		text: i('nav.homework')
	},
	launcher: {
		icon: MagnifyingGlass,
		action: () => {
			isOpen.open();
		},
		text: i('nav.launcher')
	},
	register: {
		icon: UserPlus,
		action: () => goto('/register'),
		text: i('nav.register')
	},
	settings: {
		icon: Cog,
		action: () => goto('/settings'),
		text: i('nav.settings')
	},
	holiday: {
		icon: Calendar,
		action: () => goto('/holiday'),
		text: i('nav.holiday')
	}
};

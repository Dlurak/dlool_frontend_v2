import type { NavigationTarget } from '$lib/components/layout/navigation/types';
import type { Timetable } from '$lib/components/settings/timetable/types';
import type { OwnUserDetails } from '$lib/dlool/userInfo/own';
import type { LocaleAbbr } from '$lib/i18n/i18n';
import type { OrderKey, SortOrder } from '$lib/types/sorting';
import { localstorage } from 'svocal';

const sv = {
	'settings.nav.entries': [
		'settings.nav.entries',
		() =>
			[
				'homework',
				'notes',
				'calendar',
				'launcher'
			] satisfies NavigationTarget[] as NavigationTarget[]
	],
	'settings.nav.texts': ['settings.nav.texts', () => true],
	'settings.weekStartsOn': ['settings.weekStartsOn', () => 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6],
	'i18n.currentlang': ['i18n.currentlang', () => 'de' satisfies LocaleAbbr as LocaleAbbr],

	'auth.refresh.token': ['auth.refresh.token', () => null satisfies string | null as string | null],
	'auth.refresh.expires': [
		'auth.refresh.expires',
		() => null satisfies number | null as number | null
	],
	'auth.access.token': ['auth.access.token', () => null satisfies string | null as string | null],
	'auth.access.expires': [
		'auth.access.expires',
		() => null satisfies number | null as number | null
	],
	'auth.access.generatedBy': [
		'auth.access.generatedBy',
		() => null satisfies null | 'refreshToken' | 'login' as null | 'refreshToken' | 'login'
	],
	'dlool.ownUserDetails': ['dlool.ownUserDetails', () => null as null | OwnUserDetails],
	'settings.homework.transparency': ['settings.homework.transparency', () => 0.6],
	'settings.homework.overdue': ['settings.homework.overdue', () => 1],
	'settings.color': ['settings.color', () => ({}) as Record<string, string>],
	'settings.color.showHex': ['settings.color.showHex', () => false],
	'settings.timetable': [
		'settings.timetable',
		() =>
			({
				sun: [],
				mon: [],
				tue: [],
				wed: [],
				thu: [],
				fri: [],
				sat: []
			}) satisfies Timetable as Timetable
	],
	'settings.timetable.showWeekend': ['settings.timetable.showWeekend', () => false],
	'settings.timetable.highlightToday': ['settings.timetable.highlightToday', () => false],
	'settings.launcher.outlineWidth': ['settings.launcher.outlineWidth', () => 2],
	'settings.launcher.width': [
		'settings.launcher.width',
		() => 'medium' as 'small' | 'medium' | 'large'
	],
	'holidays.country': ['holidays.country', () => 'DE'],
	'holidays.state': ['holidays.state', () => 'HE'],
	'holidays.autoDetect': ['holidays.autoDetect', () => true],
	'settings.homeworkPresets': ['settings.homeworkPresets', () => [] as string[]],
	'settings.homework.defaultSubject': [
		'settings.homework.defaultSubject',
		() => ({}) as Record<string, string>
	],
	'settings.homework.smart-subjects': ['settings.homework.smart-subjects', () => true],
	'settings.reduceMotion': ['settings.reduceMotion', () => false],
	'settings.tagsInOverview': ['settings.tagsInOverview', () => true],
	'settings.todo.todoist.code': ['settings.todo.todoist.code', () => null as string | null],
	'settings.todo.todoist.enabled': ['settings.todo.todoist.enabled', () => false],
	'settings.todo.todoist.listId': ['settings.todo.todoist.listId', () => null as string | null],
	'settings.todo.todoist.projectIds': [
		'settings.todo.todoist.projectIds',
		() => ({}) as Record<string, string>
	],
	'settings.todo.todoist.taskIds': [
		'settings.todo.todoist.taskIds',
		() => ({}) as Record<string, string>
	],
	'dlool-version': ['dlool-version', () => '2'],
	'assignments.order.key': ['assignments.order.key', () => 'due' satisfies OrderKey as OrderKey],
	'assignments.order.direction': [
		'assignments.order.direction',
		() => 'desc' satisfies SortOrder as SortOrder
	]
} as const satisfies Record<string, [string, () => unknown]>;

type SvocalKey = keyof typeof sv;

export const svocal = <T extends SvocalKey>(key: T) => {
	const entry = sv[key];

	const svocalKey = entry[0];
	const fallback = entry[1]() as ReturnType<(typeof sv)[T][1]>;

	return localstorage(svocalKey, fallback);
};

const svNoCallback = {
	'filter.school': null as string | null,
	'filter.classes': [] as string[]
} as const;

type SvocalNoFallback = keyof typeof svNoCallback;
type SvocalFallback<T extends SvocalNoFallback> = (typeof svNoCallback)[T];

export const svocalWithFallback = <T extends SvocalNoFallback, F extends SvocalFallback<T>>(
	key: T,
	fallback: F
) => localstorage<F>(key, fallback);

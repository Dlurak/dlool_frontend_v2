import type {
	Timetable,
	TimetableBuilder,
	TimetableWeekday
} from '$lib/components/settings/timetable/types';
import { filterOutDuplicates } from '$lib/utils/arrays/filter';
import { lengthenUntil } from '$lib/utils/arrays/lengthen';
import { removeNthElement } from '$lib/utils/arrays/remove';
import { fromEntries, objectEntries } from '$lib/utils/objects/entries';

export function countMaxLessons(timetable: Timetable) {
	const lessonCounts = Object.values(timetable).map((x) => x.length);

	return Math.max(...lessonCounts);
}

type TimeTableEntry = [TimetableWeekday, (string | undefined)[]];

export function addRow(timetable: Timetable): Timetable {
	const entries = objectEntries(timetable);
	const maxLength = countMaxLessons(timetable);
	const longEntries = entries.map(
		([day, lessons]) => [day, lengthenUntil(lessons, undefined, maxLength + 1)] as TimeTableEntry
	);

	return fromEntries(longEntries);
}

export function getLastLessons(timetable: Timetable) {
	const max = countMaxLessons(timetable) - 1;

	return Object.values(timetable).map((eles) => eles[max]);
}

export function removeNthLesson(timetable: Timetable, lessonIndex: number): Timetable {
	const entries = objectEntries(timetable);

	return fromEntries(
		entries.map(([day, lessons]) => [day, removeNthElement(lessons, lessonIndex)] as TimeTableEntry)
	);
}

export function cleanUpTimeTable(
	timetable: Timetable | TimetableBuilder<string | null>
): Timetable {
	// @ts-expect-error Trust me it works
	const entries = objectEntries(timetable).map(
		([day, lessons]) => [day, filterOutDuplicates(lessons.filter((x) => x))] as TimeTableEntry
	);

	const maxLength = Math.max(...entries.map(([_, lessons]) => lessons.length));

	return fromEntries(
		entries.map(([day, lessons]) => [day, lengthenUntil(lessons, undefined, maxLength)] as const)
	);
}

const isString = (x: unknown): x is string => typeof x === 'string';

export function allLessons(timetable: Timetable) {
	return Object.values(timetable).flat().filter(isString);
}

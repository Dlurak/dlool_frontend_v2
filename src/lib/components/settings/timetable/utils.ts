import type {
	OldTimetable,
	OldTimetableDays,
	Timetable,
	TimetableWeekday
} from '$lib/components/settings/timetable/types';
import { filterOutDuplicates } from '$lib/utils/arrays/filter';
import { lengthenUntil } from '$lib/utils/arrays/lengthen';
import { removeNthElement } from '$lib/utils/arrays/remove';
import { fromEntries, objectEntries } from '$lib/utils/objects/entries';
import { self } from '$lib/utils/utils';

export function countMaxLessons(timetable: Timetable) {
	const lessonCounts = Object.values(timetable).map((x) => x.length);

	return Math.max(...lessonCounts);
}

export function addRow(timetable: Timetable): Timetable {
	const entries = objectEntries(timetable);
	const maxLength = countMaxLessons(timetable);
	const longEntries = entries.map(([day, lessons]) => {
		return [day, lengthenUntil(lessons, undefined, maxLength + 1)] as const;
	});

	return fromEntries(longEntries) as Timetable;
}

export function getLastLessons(timetable: Timetable) {
	const max = countMaxLessons(timetable) - 1;

	return Object.values(timetable).map((eles) => eles[max]);
}

export function removeNthLesson(timetable: Timetable, lessonIndex: number): Timetable {
	const entries = objectEntries(timetable);

	return fromEntries(
		entries.map(([day, lessons]) => [day, removeNthElement(lessons, lessonIndex)] as const)
	);
}

function dayToCorrectDay(day: OldTimetableDays | TimetableWeekday): TimetableWeekday {
	switch (day) {
		case 'su':
			return 'sun';
		case 'mo':
			return 'mon';
		case 'tu':
			return 'tue';
		case 'we':
			return 'wed';
		case 'th':
			return 'thu';
		case 'fr':
			return 'fri';
		case 'sa':
			return 'sat';
		default:
			return day;
	}
}

export function cleanUpTimeTable(
	timetable: OldTimetable | Record<TimetableWeekday, (string | null | undefined)[]>
): Timetable {
	const entries = objectEntries(timetable).map(([day, lessons]) => {
		return [
			dayToCorrectDay(day),
			filterOutDuplicates(lessons.filter(self).filter(isString))
		] as const;
	});

	const maxLength = Math.max(...entries.map(([_, lessons]) => lessons.length));

	return fromEntries(
		entries.map(([day, lessons]) => {
			const longLessons = lengthenUntil(lessons, null, maxLength);
			return [day, longLessons] as const;
		})
	);
}

const isString = (x: unknown): x is string => typeof x === 'string';

export function allLessons(timetable: Timetable) {
	return Object.values(timetable).flat().filter(isString);
}

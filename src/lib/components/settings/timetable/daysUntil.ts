import type { Timetable, TimetableWeekday } from '$lib/components/settings/timetable/types';
import { WEEKDAYS } from '$lib/components/settings/timetable/weekdays';
import { objectEntries } from '$lib/utils/objects/entries';

const serialized = {
	informatik: ['informatik', 'info', 'computer science', 'programming'],
	biologie: ['bio', 'biology', 'biologie'],
	geschichte: ['geschichte', 'geschi'],
	mathematik: ['mathe', 'mathematick', 'mathematik', 'mathemathik', 'mathemathics', 'math'],
	religion: ['reli', 'religion'],
	powi: ['powi', 'wipo'],
	physics: ['physics', 'physic', 'physik']
};

function timetableSerialize(subj: string) {
	const subject = subj.trim().toLowerCase();
	const entries = objectEntries(serialized);
	const entry = entries.find(([_, alts]) => alts.includes(subj));

	return entry ? entry[0] : subject;
}

export interface DaysUntilProps {
	subject: string;
	timetable: Timetable;
	currentDay: TimetableWeekday;
}

function privateDaysUntil({ subject, timetable, currentDay }: DaysUntilProps, count = 0) {
	const currentWeekdayIndex = WEEKDAYS.indexOf(currentDay);
	const nextDay = WEEKDAYS[(currentWeekdayIndex + 1) % 7];

	const isTommorow = timetable[nextDay].some((iterSubj) => {
		if (!iterSubj) return false;
		return timetableSerialize(iterSubj) === timetableSerialize(subject);
	});

	if (isTommorow) return count + 1;

	if (count > 7) {
		throw new Error('Infinite loop detected in timetable calculation');
	}

	return privateDaysUntil({ subject, timetable, currentDay: nextDay }, count + 1);
}

/**
 * Calculates the number of days until a given subject appears in the timetable.
 *
 * @param  props - The properties object.
 * @param props.subject - The subject to search for in the timetable.
 * @param props.timetable - The timetable object containing subjects for each
 *     weekday.
 * @param props.currentDay - The current day of the week.
 * @returns The number of days until the subject appears next in the timetable.
 * @throws {Error} Throws an error if an infinite loop is detected in the
 *     timetable calculation.
 */
export function daysUntil(props: DaysUntilProps) {
	return privateDaysUntil(props);
}

import { daysUntil } from '$lib/components/settings/timetable/daysUntil';
import type { Timetable } from '$lib/components/settings/timetable/types';
import { describe, expect, it } from 'vitest';

/**
 * A example timetable as it may be found in a german school
 * http://www.gymnasium-limmer.de/wp-content/uploads/2021/02/Stundenplan-Beispiel-1-rotated.jpg
 */
const EXAMPLE_TIMETABLE: Timetable = {
	mon: ['German', 'Religion', 'Math'],
	tue: ['English', 'P.E.', 'Music'],
	wed: ['English', 'mathemathics', 'Physics'],
	thu: ['Art', 'Biology', 'German'],
	fri: ['History', 'Geography', 'English'],
	sat: [],
	sun: []
};

describe('how many days are until the next subject', () => {
	it('works correctly', () => {
		expect(
			daysUntil({
				timetable: EXAMPLE_TIMETABLE,
				subject: 'German',
				currentDay: 'mon'
			})
		).toBe(3);

		expect(
			daysUntil({
				timetable: EXAMPLE_TIMETABLE,
				subject: 'German',
				currentDay: 'thu'
			})
		).toBe(4);

		expect(
			daysUntil({
				timetable: EXAMPLE_TIMETABLE,
				subject: 'Physics',
				currentDay: 'wed'
			})
		).toBe(7);

		expect(() =>
			daysUntil({
				timetable: EXAMPLE_TIMETABLE,
				subject: 'Klingon',
				currentDay: 'wed'
			})
		).toThrow('Infinite loop detected in timetable calculation');
	});
});

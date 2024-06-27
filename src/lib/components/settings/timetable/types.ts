import { z } from "zod";

const lessonsScheme = z.array(z.nullable(z.string()));

export const oldTimetableScheme = z.object({
	su: lessonsScheme,
	mo: lessonsScheme,
	tu: lessonsScheme,
	we: lessonsScheme,
	th: lessonsScheme,
	fr: lessonsScheme,
	sa: lessonsScheme
});

export const timetableScheme = z.object({
	sun: lessonsScheme,
	mon: lessonsScheme,
	tue: lessonsScheme,
	wed: lessonsScheme,
	thu: lessonsScheme,
	fri: lessonsScheme,
	sat: lessonsScheme
});

export type Timetable = z.infer<typeof timetableScheme>
export type OldTimetable = z.infer<typeof oldTimetableScheme>

export type TimetableWeekday = keyof Timetable
export type OldTimetableDays = keyof OldTimetable

export type TimetableBuilder<T> = Record<TimetableWeekday, T[]>;


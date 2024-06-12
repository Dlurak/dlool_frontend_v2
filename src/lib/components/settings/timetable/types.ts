export type TimetableWeekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type Timetable = Record<TimetableWeekday, (string | undefined)[]>;

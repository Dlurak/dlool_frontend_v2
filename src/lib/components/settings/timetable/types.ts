export type TimetableWeekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type TimetableBuilder<T> = Record<TimetableWeekday, T[]>;

export type Timetable = TimetableBuilder<string | undefined>;

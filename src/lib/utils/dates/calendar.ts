export const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

/**
 * @param weekStartsOn A number indicating on which day the week starts
 * 0: Sunday
 * 1: Monday
 * 2: Tuesday
 */
export const getPaddingDays = (date: Date, weekStartsOn: number) => {
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	const monthStartsWith = firstDayOfMonth.getDay();

	const calculatePaddingDays = (weekday: number, paddingDays = 0): number => {
		if (weekday === monthStartsWith) return paddingDays;

		const nextWeekday = (weekday + 1) % 7;
		return calculatePaddingDays(nextWeekday, paddingDays + 1);
	};

	return calculatePaddingDays(weekStartsOn);
};

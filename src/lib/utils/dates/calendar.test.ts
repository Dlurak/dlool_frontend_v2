import { getPaddingDays } from './calendar';
import { describe, it, expect } from 'vitest';

describe('getPaddingDays', () => {
	it('calculates padding days correctly for different week start days', () => {
		// May, 1 2024 is a Wednesday
		expect(getPaddingDays(new Date('2024-05-01'), 0)).toBe(3); // Sunday
		expect(getPaddingDays(new Date('2024-05-01'), 1)).toBe(2); // Monday
		expect(getPaddingDays(new Date('2024-05-01'), 2)).toBe(1); // Tuesday
		expect(getPaddingDays(new Date('2024-05-01'), 3)).toBe(0); // Wednesday
		expect(getPaddingDays(new Date('2024-05-01'), 4)).toBe(6); // Thursday
		expect(getPaddingDays(new Date('2024-05-01'), 5)).toBe(5); // Friday
		expect(getPaddingDays(new Date('2024-05-01'), 6)).toBe(4); // Saturday
	});
});

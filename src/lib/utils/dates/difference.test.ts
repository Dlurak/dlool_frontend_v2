import { getDifference } from '$lib/utils/dates/difference';
import { describe, it, expect } from 'vitest';

describe('getDifference', () => {
	it('works in the seconds area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 45 * 1000); // 45 seconds later
		expect(getDifference(original, current)).toEqual({ diff: 45, unit: 'seconds' });
	});

	it('works in the minutes area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 45 * 60 * 1000); // 45 minutes later
		expect(getDifference(original, current)).toEqual({ diff: 45, unit: 'minutes' });
	});

	it('works in the hours area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 3 * 3600 * 1000); // 3 hours later
		expect(getDifference(original, current)).toEqual({ diff: 3, unit: 'hours' });
	});

	it('works in the days area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 4 * 86400 * 1000); // 4 days later
		expect(getDifference(original, current)).toEqual({ diff: 4, unit: 'days' });
	});

	it('works in the weeks area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 2 * 604800 * 1000); // 2 weeks later
		expect(getDifference(original, current)).toEqual({ diff: 2, unit: 'weeks' });
	});

	it('works in the months area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 2 * 2628000 * 1000); // 2 months later (approx)
		expect(getDifference(original, current)).toEqual({ diff: 2, unit: 'months' });
	});

	it('works in the years area', () => {
		const original = new Date();
		const current = new Date(original.getTime() + 3 * 31536000 * 1000); // 3 years later (approx)
		expect(getDifference(original, current)).toEqual({ diff: 3, unit: 'years' });
	});
});

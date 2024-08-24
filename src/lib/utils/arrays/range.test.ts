import { range } from '$lib/utils/arrays/range';
import { describe, it, expect } from 'vitest';

describe('range function', () => {
	it('creates a range from minimum to maximum', () => {
		expect(range(2, 5)).toEqual([2, 3, 4, 5]);
		// @ts-expect-error max must be bigger then min
		expect(range(5, 2)).toEqual([]);
	});
});

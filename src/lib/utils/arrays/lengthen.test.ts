import { lengthenUntil } from '$lib/utils/arrays/lengthen';
import { describe, it, expect } from 'vitest';

describe('lengthenUntil', () => {
	it('does nothing for long enough arrays', () => {
		const original = ['hi', 'hallo'];
		const filler = {};
		const result = lengthenUntil(original, filler, 1);

		expect(result).toEqual(original);
		expect(original).toEqual(['hi', 'hallo']);
		expect(filler).toEqual({});
	});

	it('lengthens the array', () => {
		expect(lengthenUntil([], null, 2)).toEqual([null, null]);
	});
});

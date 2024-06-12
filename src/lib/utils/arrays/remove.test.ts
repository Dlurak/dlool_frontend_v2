import { removeNthElement } from '$lib/utils/arrays/remove';
import { describe, expect, it } from 'vitest';

describe('removeNthElement', () => {
	it('removes the element at the given index', () => {
		expect(removeNthElement([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 4, 5]);
	});

	it('returns the same array if the index is out of bounds (negative)', () => {
		expect(removeNthElement([1, 2, 3, 4, 5], -1)).toEqual([1, 2, 3, 4, 5]);
	});

	it('returns the same array if the index is out of bounds (too large)', () => {
		expect(removeNthElement([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]);
	});

	it('should not mutate the original array', () => {
		const array = [1, 2, 3, 4, 5];
		const result = removeNthElement(array, 2);

		expect(array).toEqual([1, 2, 3, 4, 5]);
		expect(result).toEqual([1, 2, 4, 5]);
	});
});

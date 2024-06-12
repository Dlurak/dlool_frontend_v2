import { filterOutDuplicates } from '$lib/utils/arrays/filter';
import { describe, it, expect } from 'vitest';

describe('filterOutDuplicates', () => {
	it('removes duplicates and keeps the initial sorting', () => {
		expect(filterOutDuplicates([1, 2, 2, 3, 4, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
	});

	it('does not modify the input array', () => {
		const inputArray = [1, 2, 2, 3, 4, 4, 4, 5];
		const originalInputArray = [...inputArray];
		filterOutDuplicates(inputArray);
		expect(inputArray).toEqual(originalInputArray);
	});

	it('handles an empty array', () => {
		expect(filterOutDuplicates([])).toEqual([]);
	});

	it('handles an array with all elements being duplicates', () => {
		expect(filterOutDuplicates([1, 1, 1, 1, 1])).toEqual([1]);
	});
});

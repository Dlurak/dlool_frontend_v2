import { filterObject } from '$lib/utils/objects/filter';
import { describe, it, expect } from 'vitest';

describe('filterObject', () => {
	it('filters out values that do not match the predicate', () => {
		expect(
			filterObject(
				{
					a: 1,
					b: 2,
					c: 3,
					d: 4
				},
				(key) => ['a', 'b', 'd'].includes(key),
				(value) => value > 2
			)
		).toEqual({ d: 4 });
	});

	it('returns an empty object if no entries match the predicates', () => {
		expect(
			filterObject(
				{
					a: 1,
					b: 2,
					c: 3,
					d: 4
				},
				(key: string) => key === 'z',
				(value) => value < 0
			)
		).toEqual({});
	});

	it('includes entries that match both predicates', () => {
		expect(
			filterObject(
				{
					a: 1,
					b: 2,
					c: 3,
					d: 4
				},
				(key) => key === 'c',
				(value) => value === 3
			)
		).toEqual({ c: 3 });
	});

	it('should work with empty objects', () => {
		expect(
			filterObject(
				{},
				(key) => key === 'a',
				(v) => v === 1
			)
		).toEqual({});
	});
});

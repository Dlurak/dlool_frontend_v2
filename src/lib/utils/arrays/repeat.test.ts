import { describe, it, expect } from 'vitest';
import { repeat } from './repeat';

describe('repeat function', () => {
	it('generates an array of specified length with values generated by repeator function', () => {
		expect(repeat(5, (i) => i * 2)).toEqual([0, 2, 4, 6, 8]);
	});

	it('works with different types', () => {
		expect(repeat(3, (i) => `Item ${i}`)).toEqual(['Item 0', 'Item 1', 'Item 2']);
	});

	it('returns an empty array when length is 0', () => {
		expect(repeat(0, (i) => i * 2)).toEqual([]);
	});

	it('handles negative lengths gracefully', () => {
		expect(repeat(-3, (i) => i * 2)).toEqual([]);
	});
});

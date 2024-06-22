import { clamp } from '$lib/utils/numbers/clamp';
import { describe, expect, it } from 'vitest';

describe('clamp', () => {
	it('should return the correct val', () => {
		expect(clamp(0, 5, 10)).toBe(5);
		expect(clamp(0, -1, 10)).toBe(0);
		expect(clamp(0, 11, 10)).toBe(10);
	});

	it('should handle negative ranges correctly', () => {
		expect(clamp(-10, -5, 0)).toBe(-5);
	});

	it('should handle equal min and max values', () => {
		expect(clamp(5, 5, 5)).toBe(5);
	});

	it('should throw an error if min is greater than max', () => {
		expect(() => clamp(10, 5, 0)).toThrow('min cannot be greater than max');
	});
});

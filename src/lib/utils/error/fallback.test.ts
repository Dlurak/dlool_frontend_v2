import { errorFallback } from './fallback';
import { describe, it, expect, vi } from 'vitest';

describe('errorFallback', () => {
	it('returns the result of the function if no error occurs', () => {
		expect(errorFallback(() => 'success', 'fallback')).toBe('success');
	});

	it('returns the fallback value if an error occurs', () => {
		expect(
			errorFallback(() => {
				throw new Error('error');
			}, 'fallback')
		).toBe('fallback');
	});

	it('works with different types of return values', () => {
		expect(errorFallback(() => 42, -1)).toBe(42);

		expect(
			errorFallback(() => {
				throw new Error('error');
			}, 0)
		).toBe(0);
	});

	it('runs the function once', () => {
		const func = vi.fn(() => '42');
		errorFallback(func, 'hi');
		expect(func).toHaveBeenCalledOnce();
	});
});

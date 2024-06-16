import { safeMap } from '$lib/utils/null/safeMap';
import { describe, expect, it, vi } from 'vitest';

describe('safeMap', () => {
	it('applies the functor', () => {
		expect(safeMap(2, (x) => x + 2)).toBe(4);
		expect(safeMap(5, (x) => x * 2)).toBe(10);
		expect(safeMap('hello', (x) => x + ' world')).toBe('hello world');
		expect(safeMap([1, 2, 3], (x) => x.length)).toBe(3);
		expect(safeMap({ a: 1 }, (x) => x.a)).toBe(1);
		expect(safeMap(0, (x) => x + 1)).toBe(1);
		expect(safeMap(true, (x) => !x)).toBe(false);
		expect(safeMap(false, (x) => !x)).toBe(true);
		expect(safeMap('', (x) => x + 'non-empty')).toBe('non-empty');
	});

	it('does nothing for null/undefined', () => {
		expect(safeMap(undefined, () => 'hi')).toBeNull();
		expect(safeMap(null, () => 'hi')).toBeNull();
	});

	it('ensures functor is not called for null/undefined', () => {
		const functor = vi.fn();

		safeMap(null, functor);
		safeMap(undefined, functor);
		expect(functor).toBeCalledTimes(0);

		safeMap('hi', functor);
		expect(functor).toBeCalledTimes(1);
	});
});

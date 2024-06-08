import { replaceKey } from './replaceKey';
import { describe, it, expect } from 'vitest';

describe('replaceKey', () => {
	it('replaces the key in a simple object', () => {
		expect(replaceKey({ a: 1, b: 2, c: 3 }, 'b', 'newB')).toEqual({ a: 1, newB: 2, c: 3 });
	});

	it('handles replacing a key when it is the only key in the object', () => {
		expect(replaceKey({ oldKey: 'value' }, 'oldKey', 'newKey')).toEqual({ newKey: 'value' });
	});

	it("doesn't change the object if the old key does not exist", () => {
		// @ts-expect-error We wanna do something illegal
		const result = replaceKey({ a: 1, b: 2, c: 3 }, 'd', 'newD');
		expect(result).toEqual({ a: 1, b: 2, c: 3 });
	});

	it('handles nested objects', () => {
		expect(replaceKey({ a: 1, b: { nested: 2 }, c: 3 }, 'b', 'newB')).toEqual({
			a: 1,
			newB: { nested: 2 },
			c: 3
		});
	});

	it('handles arrays in objects', () => {
		expect(replaceKey({ a: 1, b: [1, 2, 3], c: 3 }, 'b', 'newB')).toEqual({
			a: 1,
			newB: [1, 2, 3],
			c: 3
		});
	});

	it('maintains the types of the values', () => {
		expect(replaceKey({ a: 1, b: 'string', c: true }, 'b', 'newB')).toEqual({
			a: 1,
			newB: 'string',
			c: true
		});
	});

	it('works with complex objects', () => {
		expect(
			replaceKey({ a: { nestedA: 1 }, b: [1, 2, { nestedB: 3 }], c: 'string' }, 'b', 'newB')
		).toEqual({ a: { nestedA: 1 }, newB: [1, 2, { nestedB: 3 }], c: 'string' });
	});
});

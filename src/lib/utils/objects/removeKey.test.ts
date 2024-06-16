import { removeKey } from '$lib/utils/objects/removeKey';
import { describe, it, expect } from 'vitest';

describe('removeKey', () => {
	it('removes the specified key from the object', () => {
		expect(removeKey({ a: 1, b: 2, c: 3 }, 'b')).toEqual({ a: 1, c: 3 });
	});

	it('returns a new object and does not mutate the original object', () => {
		const original = { a: 1, b: 2, c: 3 };

		expect(removeKey(original, 'b')).not.toBe(original);
		expect(original).toEqual({ a: 1, b: 2, c: 3 });
	});

	it('removes a key from an object with a symbol key', () => {
		const sym = Symbol('key');
		const original = { [sym]: 'value', a: 1 };
		expect(removeKey(original, sym)).toEqual({ a: 1 });
	});

	it('removes a key from an object with a numeric key', () => {
		expect(removeKey({ 1: 'one', 2: 'two' }, 1)).toEqual({ 2: 'two' });
	});

	it('works nested in each other, also on a type level', () => {
		expect(removeKey(removeKey({ a: 1, b: 2, c: 42 }, 'a'), 'b')).toEqual({ c: 42 });
	});
});

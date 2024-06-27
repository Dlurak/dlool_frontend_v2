import { mapObject } from '$lib/utils/objects/map';
import { describe, it, expect } from 'vitest';

describe('mapObject', () => {
	it('should correctly map keys and values', () => {
		const result = mapObject(
			{ a: 1, b: 2, c: 3 },
			(key) => key.toUpperCase(),
			(value) => value * 2
		);

		expect(result).toEqual({ A: 2, B: 4, C: 6 });
	});

	it('should handle empty objects', () => {
		const result = mapObject(
			{},
			() => 'key',
			() => 'hi'
		);

		expect(result).toEqual({});
	});

	it('should handle objects with different key and value types', () => {
		const result = mapObject(
			{ 1: 'one', 2: 'two', 3: 'three' },
			(key) => `key${key}`,
			(value) => value.toUpperCase()
		);

		expect(result).toEqual({ key1: 'ONE', key2: 'TWO', key3: 'THREE' });
	});
});

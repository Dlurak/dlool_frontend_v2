import { describe, expect, it } from 'vitest';
import { capitalize } from './case';

describe('converts the case of a string', () => {
	it('capitalizes the first letter', () => {
		expect(capitalize('')).toBe('');
		expect(capitalize('hi')).toBe('Hi');
		expect(capitalize('Hi')).toBe('Hi');
		expect(capitalize('Hi hi HI')).toBe('Hi hi HI');
		expect(capitalize('HI HI HI')).toBe('HI HI HI');
	});
});

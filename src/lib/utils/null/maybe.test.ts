import { describe, it, expect } from 'vitest';
import { Maybe } from './maybe';

describe('Maybe monad', () => {
	it('detects nullish values', () => {
		expect(Maybe.of(null).isNullish()).toBe(true);
		expect(Maybe.of(undefined).isNullish()).toBe(true);
	});

	it('constructs for defined values', () => {
		const maybe = Maybe.of('hello');
		expect(maybe.isNullish()).toBe(false);
		expect(maybe.orElse('world')).toBe('hello');
	});

	it('maps', () => {
		expect(
			Maybe.of(null)
				.map(() => 'x')
				.orElse('default')
		).toBe('default');

		expect(
			Maybe.of(42)
				.map((x) => x + 1)
				.orElse(0)
		).toBe(43);
	});

	it('uses an alt value', () => {
		expect(Maybe.of<string>(null).altValue('alt').orElse('default')).toBe('alt');

		expect(
			Maybe.of<string>(null).altValue(null).altValue('alt2').altValue('alt3').orElse('default')
		).toBe('alt2');

		expect(Maybe.of<string>('main').altValue('alt').orElse('default')).toBe('main');
	});
});

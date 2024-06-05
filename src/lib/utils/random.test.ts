import { randomChar, randomNumber, randomStr } from '$lib/utils/random';
import { describe, it, expect } from 'vitest';

describe('random int', () => {
	it('respects the limits', () => {
		const minimum = 10;
		const maximum = 12;
		const randNums = new Array(50).fill(null).map(() => randomNumber(minimum, maximum));

		expect(Math.max(...randNums)).toBe(maximum);
		expect(Math.min(...randNums)).toBe(minimum);
	});

	it('is random', () => {
		expect(randomNumber(0, 10_000)).not.toBe(randomNumber(0, 10_000));
	});
});

describe('random char', () => {
	it('works', () => {
		const chars = new Set(new Array(50_000).fill('').map(randomChar));

		expect(chars.size).toBe(52);
	});
});

describe('random strings', () => {
	it('works', () => {
		expect(randomStr(42).length).toBe(42);

		expect(new Set(randomStr(42).split('')).size).toBeGreaterThan(2);
	});
});

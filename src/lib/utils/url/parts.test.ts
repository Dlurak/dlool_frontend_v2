import { parseNumber } from '$lib/utils/url/parts';
import { describe, it, expect } from 'vitest';

describe('Parse numbers in the url', () => {
	it('parses normal values', () => {
		expect(
			parseNumber({
				attributes: ['num'],
				default: 42,
				params: new URLSearchParams({ num: '45' }),
				min: -42
			})
		).toBe(45);

		expect(
			parseNumber({
				attributes: ['invalidNum', 'num'],
				default: 42,
				params: new URLSearchParams({ num: '45' }),
				min: -42
			})
		).toBe(45);

		expect(
			parseNumber({
				attributes: ['mainNum', 'secondaryNum'],
				default: 42,
				params: new URLSearchParams({ mainNum: '45' }),
				min: -42
			})
		).toBe(45);
	});

	it('handles the default when needed', () => {
		expect(
			parseNumber({
				attributes: ['num'],
				default: 42,
				params: new URLSearchParams({ no: '45' }),
				min: -42
			})
		).toBe(42);
	});

	it('handles the minimum', () => {
		expect(
			parseNumber({
				attributes: ['num'],
				default: 42,
				params: new URLSearchParams({ num: '-45' }),
				min: -42
			})
		).toBe(-42);
	});
});

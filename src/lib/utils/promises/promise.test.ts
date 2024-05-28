import { wrapWithPromise, isPromise, promise } from '$lib/utils/promises';
import { describe, expect, it } from 'vitest';

describe('isPromise function', () => {
	it('should return true when passed a Promise object', () => {
		expect(isPromise(promise(''))).toBe(true);
	});

	it('should return false when passed a non-Promise object', () => {
		expect(isPromise({})).toBe(false);
		expect(isPromise({ then() {} })).toBe(false);
		expect(isPromise([])).toBe(false);
		expect(isPromise(5)).toBe(false);
		expect(isPromise('string')).toBe(false);
		expect(isPromise(null)).toBe(false);
		expect(isPromise(undefined)).toBe(false);
		expect(isPromise(() => {})).toBe(false);
	});
});

describe('promise function', () => {
	it('should resolve with the provided data', async () => {
		const data = 'test' as const;
		const result = promise(data);

		expect(result).toBeInstanceOf(Promise);
		expect(isPromise(result)).toBe(true);
		expect(await result).toBe(data);
	});
});

describe('allPromise function', () => {
	it('should return the same promise if input is a promise', async () => {
		const data = promise('test');
		expect(wrapWithPromise(data)).toBe(data);
	});

	it('should wrap non-promise data into a promise', async () => {
		const data = 'test';
		const result = wrapWithPromise(data);
		expect(result).toBeInstanceOf(Promise);
		expect(isPromise(result)).toBe(true);
		expect(await result).toBe(data);
	});
});

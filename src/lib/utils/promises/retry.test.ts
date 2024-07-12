import { describe, expect, it, vi } from 'vitest';
import { retry } from './retry';

describe('retry function', () => {
	it('calls the function only once ideally', () => {
		const functor = vi.fn(() => '42');
		const result = retry(functor, 50);

		expect(functor).toHaveBeenCalledTimes(1);
		expect(result).toBe('42');
	});

	it('retries n times', () => {
		const functor = vi
			.fn()
			.mockImplementationOnce(() => {
				throw new Error('fail');
			})
			.mockImplementationOnce(() => {
				throw new Error('fail again');
			})
			.mockImplementationOnce(() => 42);

		const result = retry(functor, 5);
		expect(result).toBe(42);
		expect(functor).toHaveBeenCalledTimes(3);
	});

	it('throws the error if the predicate throws and retries are exhausted', () => {
		const functor = vi.fn()
			.mockImplementationOnce(() => {
				throw new Error('fail');
			})
			.mockImplementation(() => {
				throw new Error('fail again');
			})

		expect(() => retry(functor, 3)).toThrow('fail again');
		expect(functor).toHaveBeenCalledTimes(3);
	});
});

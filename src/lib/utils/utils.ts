/**
 * A generic function that returns the argument it receives.
 *
 * @template T
 * @param x - The value to be returned.
 * @returns - Returns the same value that was passed as an argument.
 *
 * @example
 * ```typescript
 * const num = self(5); // returns 5
 * const str = self('hello'); // returns 'hello'
 * const obj = self({ key: 'value' }); // returns { key: 'value' }
 * ```
 */
export const self = <T>(x: T) => x;

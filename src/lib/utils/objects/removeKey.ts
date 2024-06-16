/**
 * Removes a specified key from an object and returns a new object without that key.
 *
 * @template T - The type of the object.
 * @template K - The type of the key to be removed.
 * @param obj - The original object.
 * @param key - The key to remove from the object.
 * @returns A new object without the specified key.
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: 2, c: 3 };
 * const result = removeKey(original, 'b');
 * console.log(result); // { a: 1, c: 3 }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeKey = <T extends Record<string | number | symbol, any>, K extends keyof T>(
	obj: T,
	key: K
) => {
	const { [key]: _, ...rest } = obj;

	return rest;
};

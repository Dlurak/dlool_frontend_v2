type PrivateEnumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc
	: PrivateEnumerate<N, [...Acc, Acc['length']]>;

/**
 * A utility type to create a tuple containing the sequence of numbers from 0 up to, but not including, N.
 *
 * @template N - The upper limit of the enumeration (exclusive).
 *
 * @example
 * type Result = Enumerate<5>; // Result is [0, 1, 2, 3, 4]
 */
export type Enumerate<N extends number> = PrivateEnumerate<N>;

/**
 * Extracts the last item of an array `T`. If the array is empty, returns the alternative type `Alt`.
 *
 * @template T - The array type.
 * @template Alt - The alternative type if `T` is empty.
 * @returns The last item of `T` or `Alt` if `T` is empty.
 *
 * @example
 * ```typescript
 * type Last = LastItem<[1, 2, 3], 0>; // Last is 3
 * type Empty = LastItem<[], 0>; // Empty is 0
 * ```
 */
export type LastItem<T extends unknown[], Alt> = T extends [...infer _, infer Last] ? Last : Alt;

import type { SubtractOne } from '$lib/types/math';

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

type PrivateRepeat<T, N extends number, Acc extends T[] = []> = N extends 0
	? Acc
	: PrivateRepeat<T, SubtractOne<N>, [...Acc, T]>;

/**
 * Creates a tuple type with the specified element type `T` repeated `N` times.
 *
 * This utility type is helpful when you need a tuple of a specific length and type.
 *
 * @template T - The type of elements in the tuple.
 * @template N - The number of times to repeat the type `T` in the tuple. Must be a positive integer.
 *
 * @example
 * ```typescript
 * // Creates a tuple of numbers repeated 3 times
 * type ThreeNumbers = Repeat<number, 3>; // [number, number, number]
 * ```
 *
 * @example
 * ```typescript
 * // Creates a tuple of strings repeated 2 times
 * type TwoStrings = Repeat<string, 2>; // [string, string]
 * ```
 * // Creates a tuple of strings repeated 2 times
 *
 * @param {T} T - The type of each element in the resulting tuple.
 * @param {number} N - The number of elements in the resulting tuple.
 *
 * @returns {T[]} - A tuple type with `T` repeated `N` times.
 */
export type Repeat<T, N extends number> = PrivateRepeat<T, N>;

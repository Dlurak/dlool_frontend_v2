import type { Range } from '$lib/types/array';

/**
 * Generates an array of numbers in a range from `min` to `max`, inclusive.
 *
 * @template TMin - The type of the minimum value, must extend `number`.
 * @template TMax - The type of the maximum value, must extend `number`.
 *
 * @param {TMin} min - The inclusive start of the range.
 * @param {TMax} max - The inclusive end of the range.
 *
 * @returns {Range<TMin, TMax>} An array of numbers from `min` to `max`. If `min` is greater than `max`, returns an empty array.
 *
 * @example
 * ```typescript
 * // Returns [1, 2, 3, 4, 5]
 * range(1, 5);
 * ```
 *
 * @example
 * ```typescript
 * // Returns []
 * range(5, 1);
 * ```
 */
export function range<TMin extends number, TMax extends number>(
	min: TMin,
	max: TMax
): Range<TMin, TMax> {
	type R = Range<TMin, TMax>;

	if (min > max) return [] as unknown as R;

	return [min, ...range(min + 1, max)] as unknown as R;
}

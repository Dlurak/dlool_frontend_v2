/**
 * Clamps a number within the inclusive range specified by the given minimum and maximum values.
 *
 * @param min The minimum value.
 * @param desired The number to clamp.
 * @param max The maximum value.
 * @returns The clamped value.
 * @throws {Error} Will throw an error if min is greater than max.
 */
export function clamp(min: number, desired: number, max: number) {
	if (min > max) throw new Error('min cannot be greater than max');
	if (desired > max) return max;
	if (desired < min) return min;

	return desired;
}

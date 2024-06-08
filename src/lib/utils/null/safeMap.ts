/**
 * Safely applies a functor to the provided data if it is not null or undefined.
 *
 * @template T The type of the input data.
 * @template R The type of the result of the functor.
 * @param {T | null | undefined} data - The data to be mapped, which can be of type T, null, or undefined.
 * @param {(data: T) => R} functor - The function to apply to the data if it is not null or undefined.
 * @returns {R | null} The result of applying the functor to the data, or null if the data is null or undefined.
 */
export const safeMap = <T, R>(data: T | null | undefined, functor: (data: T) => R): R | null => {
	if (data === null) return null;
	if (data === undefined) return null;

	return functor(data);
};

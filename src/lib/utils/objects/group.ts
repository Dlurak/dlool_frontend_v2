type Key = string | number | symbol;

/**
 * Groups an array of elements by a specified key derived from each element.
 *
 * @template T The type of elements in the array.
 * @template K The type of key to group elements by (can be string, number, or symbol).
 * @param {T[]} array The array of elements to be grouped.
 * @param {(item: T) => K} keySelector A function that extracts the key for grouping from each element.
 * @returns {Record<K, T[]>} An object where keys are derived from elements and values are arrays of elements with the same key.
 */
export function groupBy<T, K extends Key>(
	array: T[],
	keySelector: (item: T) => K
): Partial<Record<K, T[]>> {
	return array.reduce(
		(result, item) => {
			const key = keySelector(item);
			const old = result[key] || [];

			return {
				...result,
				[key]: [...old, item]
			};
		},
		{} as Record<K, T[]>
	);
}

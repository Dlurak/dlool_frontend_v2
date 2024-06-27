import { fromEntries, objectEntries } from '$lib/utils/objects/entries';

/**
 * Transforms the keys and values of an object based on the provided predicate functions.
 *
 * @template K The type of the keys in the input object.
 * @template V The type of the values in the input object.
 * @template NK The type of the keys in the output object.
 * @template NV The type of the values in the output object.
 *
 * @param object The input object to be transformed.
 * @param keyPredicate A function that transforms the keys.
 * @param valuePredicate A function that transforms the values.
 * @returns A new object with transformed keys and values.
 *
 * @example
 * ```typescript
 * const input = { a: 1, b: 2 };
 * const keyMapper = (key) => key.toUpperCase();
 * const valueMapper = (value) => value * 2;
 * const result = mapObject(input, keyMapper, valueMapper);
 * console.log(result); // { A: 2, B: 4 }
 * ```
 */
export function mapObject<K extends string | number, V, NK extends string | number, NV>(
	object: Record<K, V>,
	keyPredicate: (key: K) => NK,
	valuePredicate: (value: V) => NV
) {
	const entries = objectEntries(object).map(
		([key, value]) => [keyPredicate(key), valuePredicate(value)] as const
	);

	return fromEntries(entries);
}

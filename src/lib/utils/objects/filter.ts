import { fromEntries, objectEntries } from '$lib/utils/objects/entries';

export function filterObject<K extends string | number, V>(
	object: Partial<Record<K, V>>,
	keyPredicate: (key: K) => boolean,
	valuePredicate: (value: V) => boolean
) {
	const entries = objectEntries(object).filter(
		([key, value]) => keyPredicate(key) && valuePredicate(value as V)
	);

	return fromEntries(entries);
}

type ReplaceKey<T extends object, K extends keyof T, NewK extends string> = Omit<T, K> & {
	[P in NewK]: T[K];
};

/**
 * Replaces a key in an object with a new key.
 *
 * @template T - The object type.
 * @template K - The key to be replaced.
 * @template NewK - The new key.
 *
 * @param {T} obj - The object containing the key to be replaced.
 * @param {K} oldKey - The key to be replaced.
 * @param {NewK} newKey - The new key.
 * @returns {ReplaceKey<T, K, NewK>} A new object with the key replaced.
 */
export function replaceKey<T extends object, K extends keyof T, NewK extends string>(
	obj: T,
	oldKey: K,
	newKey: NewK
): ReplaceKey<T, K, NewK> {
	return Object.keys(obj).reduce(
		(acc, key) => {
			// @ts-expect-error Key can't be used to index
			if (key === oldKey) acc[newKey] = obj[key];
			// @ts-expect-error Key can't be used to index
			else acc[key] = obj[key];

			return acc;
		},
		{} as ReplaceKey<T, K, NewK>
	);
}

export function deepEqual(a: unknown, b: unknown): boolean {
	if (typeof a !== typeof b) return false;

	if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
		return a === b;
	}

	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) return false;

	return keysA.every((key) => {
		const isDeepEqual = deepEqual(
			(a as Record<string, unknown>)[key],
			(b as Record<string, unknown>)[key]
		);

		return keysB.includes(key) && isDeepEqual;
	});
}

export function retry<T>(predicate: () => T, tries: number): T {
	try {
		return predicate();
	} catch (e) {
		if (tries <= 1) {
			throw e;
		}

		return retry(predicate, tries - 1);
	}
}

export function removeNthElement<T>(array: T[], n: number) {
	if (n < 0 || n >= array.length) return [...array];

	return [...array.slice(0, n), ...array.slice(n + 1)];
}

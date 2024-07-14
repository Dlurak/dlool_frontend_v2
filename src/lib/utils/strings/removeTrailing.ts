/**
 * Removes all instances of a specified suffix from the end of a string.
 *
 * @param string The string from which the suffix should be removed.
 * @param suffix The suffix to be removed from the string.
 * @returns The resulting string after all instances of the suffix have been removed.
 *
 * @example
 * ```typescript
 * removeSuffix("hellooo", "o"); // returns "hell"
 * removeSuffix("foobarbar", "bar"); // returns "foo"
 * removeSuffix("test", ""); // returns "test"
 * ```
 */
export function removeSuffix(string: string, suffix: string) {
	if (!suffix) return string;
	if (!string.endsWith(suffix)) return string;

	const shortendString = string.slice(0, suffix.length * -1);
	return removeSuffix(shortendString, suffix);
}

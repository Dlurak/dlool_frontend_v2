/**
 * Executes a function and returns its result. If an error occurs, returns a fallback value.
 *
 * @template T
 * @param {() => T} func - The function to execute.
 * @param {T} fallback - The fallback value to return in case of an error.
 * @returns {T} The result of the function, or the fallback value if an error occurs.
 */
export const errorFallback = <T>(func: () => T, fallback: T): T => {
	try {
		return func();
	} catch {
		return fallback;
	}
};

export function lengthenUntil<T, U>(arr: T[], lengthenWith: U, minLength: number): (T | U)[] {
	if (arr.length >= minLength) return arr;

	return lengthenUntil<T | U, U>([...arr, lengthenWith], lengthenWith, minLength);
}

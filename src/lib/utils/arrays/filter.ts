export function filterOutDuplicates<T>(arr: T[]) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
}

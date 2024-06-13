export function filterOutDuplicates<T>(arr: T[]) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function isString(val: unknown): val is string {
	return typeof val === 'string';
}

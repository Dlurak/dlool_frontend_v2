type UnionKeys<T> = T extends T ? keyof T : never;
type UnionValues<T> = T extends T ? T[keyof T] : never;

type UnionEntries<T> = T extends T ? [UnionKeys<T>, UnionValues<T>][] : never;

export function objectEntries<T extends Record<string | number, unknown>>(obj: T): UnionEntries<T> {
	return Object.entries(obj) as UnionEntries<T>;
}

export function fromEntries<K extends string | number, V>(entries: ([K, V] | readonly [K, V])[]) {
	return Object.fromEntries(entries) as Record<K, V>;
}

export function keys<K extends string | number>(obj: Record<K, unknown>) {
	return objectEntries(obj).map(([key]) => key);
}

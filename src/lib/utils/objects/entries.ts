export function objectEntries<K extends string, V>(obj: Record<K, V>) {
	return Object.entries(obj) as [K, V][];
}

export function fromEntries<K extends string, V>(entries: [K, V][]) {
	return Object.fromEntries(entries) as Record<K, V>;
}

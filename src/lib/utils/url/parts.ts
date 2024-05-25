import { split } from '../strings/split';

function getFirstOf<T = string>(
	attributes: string[],
	predicate: (x: string | null) => T | null = (x) => x as T,
	filter: (item: T | null) => boolean = (item) => !!item
) {
	return (search: URLSearchParams) =>
		attributes.map((q) => predicate(search.get(q))).find(filter) ?? undefined;
}

export const getSchool = getFirstOf(['school', 'School', 's']);
export const getClasses = getFirstOf(
	['classes', 'class', 'Class', 'c'],
	(x) => split(x ?? '').filter((i) => i),
	(x) => !!(x && x?.length > 0)
);

export function parseNumber(props: {
	attributes: string[];
	default: number;
	min: number;
	params: URLSearchParams;
}) {
	const base = parseInt(getFirstOf(props.attributes)(props.params) ?? '0') || props.default;
	return Math.max(base, props.min);
}

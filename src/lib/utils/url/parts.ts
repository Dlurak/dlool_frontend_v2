import { safeMap } from '$lib/utils/null/safeMap';
import { split } from '../strings/split';

export function getFirstOf<T = string>(
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

/**
 * Parses a number from the URLSearchParams with specified attributes and applies default and minimum constraints.
 *
 * @param props - The properties object.
 * @param props.attributes - The list of attribute names to search for.
 * @param props.default - The default value to use if parsing fails.
 * @param props.min - The minimum value to return.
 * @param props.params - The URLSearchParams to search in.
 * @returns - The parsed and constrained number.
 */
export function parseNumber(props: {
	attributes: string[];
	default: number;
	min: number;
	params: URLSearchParams;
}) {
	const value = getFirstOf(props.attributes)(props.params);
	const base = safeMap(value, parseInt) || props.default;
	return Math.max(base, props.min);
}

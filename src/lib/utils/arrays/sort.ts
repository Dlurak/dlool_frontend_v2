/**
 * Enumeration for comparison results used in sorting.
 * @enum {number}
 */
enum ComparisonResult {
	/**
	 * The first value is before the second one
	 */
	Prev = -1,
	/**
	 * Both values are the same
	 */
	Same = 0,
	/**
	 * The first value is after the second one
	 */
	Next = 1
}

/**
 * Sorts an array of items based on their order in a reference array.
 *
 * @template TInput The type of the items in the unsorted array.
 * @template TRef The type of the items in the reference array.
 * @param {TInput[]} unsorted - The array of items to sort.
 * @param {TRef[]} reference - The reference array defining the desired order.
 * @param {(item: TInput) => TRef} functor - A function that maps each item in the unsorted array to a corresponding item in the reference array.
 * @returns {TInput[]} The sorted array.
 *
 * @example
 * ```typescript
 * sortBy(
 * 	[{ name: "cherry" }, { name: "apple" }, { name: "banana" }, { name: "date" }],
 * 	["apple", "banana", "cherry"],
 * 	(item) => item.name
 * );
 * ```
 */
export function sortBy<TInput, TRef>(
	unsorted: TInput[],
	reference: TRef[],
	functor: (item: TInput) => TRef
): TInput[] {
	const ind = (x: TInput) => reference.indexOf(functor(x));

	return unsorted.sort((a, b) => {
		const aIndex = ind(a);
		const bIndex = ind(b);

		if (aIndex === -1) return ComparisonResult.Next;

		if (aIndex < bIndex) return ComparisonResult.Prev;
		if (aIndex > bIndex) return ComparisonResult.Next;

		return ComparisonResult.Same;
	});
}

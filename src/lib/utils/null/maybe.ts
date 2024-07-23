/**
 * A type that represents a value that could be null or undefined.
 * @template T The type of the value.
 */
type Nullable<T> = T | null | undefined;

/**
 * Represents a value that might be null or undefined.
 * @template T The type of the value.
 */
export class Maybe<T> {
	/**
	 * @private
	 * @param {Nullable<T>} value The value to wrap.
	 */
	private constructor(private value: Nullable<T>) {}

	/**
	 * Creates an instance of Maybe wrapping the provided value.
	 * @template T
	 * @param value The value to wrap.
	 * @returns A new Maybe instance.
	 */
	static of<T>(value: Nullable<T>) {
		return new Maybe(value);
	}

	/**
	 * Checks if the wrapped value is null or undefined.
	 * @returns True if the value is null or undefined, false otherwise.
	 */
	isNullish() {
		const isNull = this.value === null;
		const isUndefined = this.value === undefined;
		return isNull || isUndefined;
	}

	/**
	 * Transforms the wrapped value using the provided function if it is not null or undefined.
	 * @template U
	 * @param fn The transformation function.
	 * @returns A new Maybe instance with the transformed value or null if the original value was nullish.
	 */
	map<U>(fn: (value: T) => Nullable<U>) {
		if (this.isNullish()) return Maybe.of<U>(null);

		return Maybe.of<U>(fn(this.value as T));
	}

	/**
	 * Transforms the wrapped value using the provided function if it is not null or undefined,
	 * and flattens the result.
	 * @template U
	 * @param fn The transformation function that returns a Maybe.
	 * @returns The result of the transformation function or a Maybe with null if the original value was nullish.
	 */
	flatMap<U>(fn: (value: T) => Maybe<U>) {
		if (this.isNullish()) return Maybe.of<U>(null);

		return fn(this.value as T);
	}

	/**
	 * Returns the wrapped value if it is not null or undefined, otherwise returns the provided default value.
	 * @param {T} defaultValue The default value to return if the wrapped value is null or undefined.
	 * @returns {T} The wrapped value or the default value.
	 */
	orElse<U>(defaultValue: U): T | U {
		if (this.isNullish()) return defaultValue;

		return this.value as T;
	}

	/**
	 * Returns a Maybe wrapping the alternative value if the wrapped value is null or undefined,
	 * otherwise returns a Maybe wrapping the original value.
	 * @template T
	 * @param alt The alternative value to use if the wrapped value is nullish.
	 * @returns A Maybe instance wrapping the original or alternative value.
	 */
	altValue<T>(alt: Nullable<T>) {
		if (this.isNullish()) return Maybe.of(alt);

		return this;
	}
}

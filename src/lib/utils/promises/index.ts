/**
 * Creates a Promise that resolves with the given data.
 * @template T
 * @param {T} data The data to resolve the Promise with.
 * @returns A Promise that resolves with the given data.
 * @example
 * ```typescript
 * promise(42); // Promise that resolves to 42
 * ```
 */
export function promise<T>(data: T) {
	return new Promise<T>((resolve) => resolve(data));
}

/**
 * Checks if the given object is a Promise.
 * @param {unknown} obj The object to check.
 * @returns True if the object is a Promise, false otherwise.
 * @example
 * ```typescript
 * const myPromise = promise(42);
 * console.log(isPromise(myPromise)); // Output: true
 * ```
 */
export function isPromise(obj: unknown) {
	return obj instanceof Promise;
}

type AllPromise<T> = T extends Promise<infer _> ? T : Promise<T>;

/**
 * Converts the given data into a Promise.
 * If the data is already a Promise, it returns the same Promise.
 * If the data is not a Promise, it creates a Promise that resolves with the data.
 * @template T
 * @param {T} data The data to convert into a Promise.
 * @returns A Promise that resolves with the given data or the original Promise.
 * @example
 * ```typescript
 * const myWrappedPromise = wrapWithPromise(42);
 * myWrappedPromise.then(result => console.log(result)); // Output: 42
 * ```
 * @example
 * ```typescript
 * const myWrappedPromise = wrapWithPromise(promise(42));
 * myWrappedPromise.then(result => console.log(result)); // Output: 42
 * ```
 */
export function wrapWithPromise<T>(data: T) {
	if (isPromise(data)) return data as AllPromise<T>;

	return promise(data) as AllPromise<T>;
}

/**
 * Wraps a promise to return an object indicating success or failure.
 *
 * @template T The type of the resolved value of the promise.
 * @param data - The promise to be handled.
 * @returns A promise that resolves to an object with either the resolved data and a type of 'success',
 *          or the caught error and a type of 'error'.
 *
 * @example
 * ```typescript
 * const myPromise = fetch('/api/data').then(response => response.json());
 *
 * safePromise(myPromise).then(result => {
 *   if (result.type === 'success') {
 *     console.log('Data:', result.data);
 *   } else {
 *     console.error('Error:', result.error);
 *   }
 * });
 * ```
 */
export async function safePromise<T>(data: Promise<T>) {
	return data
		.then((data) => ({
			data,
			type: 'success' as const,
			isSuccessfull: true as const,
			isError: false as const
		}))
		.catch((error) => ({
			error,
			type: 'error' as const,
			isSuccessfull: false as const,
			isError: true as const
		}));
}

/**
 * A typed function to parse a JSON string into a specified type.
 *
 * @template T - The type to which the parsed JSON should conform.
 * @param text The JSON string to parse.
 * @returns The parsed JSON object, typed as T.
 *
 * This function provides a typed way to access JSON.parse,
 * ensuring that the returned object conforms to the expected type T.
 */
export const jsonParse = <T>(text: string) => {
	return JSON.parse(text) as T;
};

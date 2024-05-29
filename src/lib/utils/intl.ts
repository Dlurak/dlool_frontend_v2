/**
 * Formats a number using the default locale and number formatting options.
 *
 * This utility uses the `Intl.NumberFormat` object to format numbers according to the
 * default locale and formatting conventions of the user's environment.
 *
 * @example
 * ```typescript
 * fmtNum(1234567.89);
 * ```
 *
 * @function
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string.
 */
export const fmtNum = new Intl.NumberFormat().format

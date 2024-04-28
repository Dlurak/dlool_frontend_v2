/**
 * Retrieves the value associated with a specified key from an object. If the key is present
 * in the object and its associated value is not `undefined`, returns the value; otherwise,
 * returns the specified default value.
 *
 * @template Key - The type of the keys in the object.
 * @template Obj - The type of the object.
 * @template Default - The type of the default value to return if the key is not present or its value is `undefined`.
 * @template Val - The type of the values in the object.
 *
 * @param {Key} Key - The key whose value to retrieve.
 * @param {Obj} Obj - The object from which to retrieve the value.
 * @param {Default} Default - The default value to return if the key is not present or its value is `undefined`.
 * @param {Val} Val - The type of the values in the object.
 *
 * @returns {Default | Val} The value associated with the specified key if it exists and is not `undefined`,
 * or the specified default value.
 */
export type DefaultValue<
	Key extends string | number | symbol,
	Obj extends { [key in Key]?: Val },
	Default extends Val,
	Val
> = Obj extends { [P in Key]: infer U } ? (U extends undefined ? Default : U) : Default;

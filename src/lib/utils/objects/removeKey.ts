export const removeKey = <T extends Record<string | number | symbol, any>>(
	obj: T,
	key: keyof T
) => {
	const { [key]: _, ...rest } = obj;

	return rest;
};

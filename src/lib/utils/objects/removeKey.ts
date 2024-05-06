// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeKey = <T extends Record<string | number | symbol, any>>(
	obj: T,
	key: keyof T
) => {
	const { [key]: _, ...rest } = obj;

	return rest;
};

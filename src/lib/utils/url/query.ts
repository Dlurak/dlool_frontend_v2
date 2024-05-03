// TODO: Write unit test

type Convertable = string | number;

export const objToQueryParams = (obj: Record<string, Convertable | Convertable[]>) => {
	const entries = Object.entries(obj);
	const params = entries.map(([key, value]) => {
		const keyString = encodeURIComponent(key);

		const valArray = Array.isArray(value) ? value : [value];
		const valString = encodeURIComponent(valArray.map((s) => `${s}`).join(','));

		return `${keyString}=${valString}`;
	});

	return params.join('&');
};

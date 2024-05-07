// TODO: Write unit test

type Convertable = string | number | Record<string, unknown>;

export const objToQueryParams = (obj: Record<string, Convertable | Convertable[]>) => {
	const entries = Object.entries(obj);
	const params = entries.map(([key, value]) => {
		const keyString = encodeURIComponent(key);

		const valArray = Array.isArray(value) ? value : [value];
		const valString = encodeURIComponent(
			valArray
				.map((s) => {
					if (typeof s === 'object') return JSON.stringify(s);
					return `${s}`;
				})
				.join(',')
		);

		return `${keyString}=${valString}`;
	});

	return params.join('&');
};

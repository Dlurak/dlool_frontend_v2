export const safeMap = <T, R>(data: T | null, functor: (data: T) => R) => {
	if (data === null) return null;

	return functor(data);
};

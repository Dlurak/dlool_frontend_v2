import type { RouteMatchCallbackOptions } from 'workbox-core';

export type RouteName = 'image' | 'holiday' | 'general' | 'dlool-api';

function getRouteName(props: RouteMatchCallbackOptions): RouteName {
	const { request } = props;
	const { url } = request;

	if (request.destination === 'image') return 'image';

	if (url.startsWith('https://openholidaysapi.org')) return 'holiday';

	if (url.startsWith('https://dlool.onrender.com')) return 'dlool-api';

	return 'general';
}

export function filterForType(type: RouteName) {
	return (props: RouteMatchCallbackOptions) => getRouteName(props) === type;
}

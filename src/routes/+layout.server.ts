import { UAParser } from 'ua-parser-js';
import type { LayoutServerLoad } from './$types';
import { safeMap } from '$lib/utils/null/safeMap';

const isOperatingSystemByApple = (os: string) => {
	if (os.toLowerCase() === 'ios') return true;
	if (os.toLowerCase() === 'mac os') return true;

	return false;
};

export const load: LayoutServerLoad = ({ request }) => {
	const userAgent = request.headers.get('user-agent');

	const os = safeMap(userAgent, (u) => new UAParser(u).getOS().name);

	if (!os) return { isApple: false };

	return { isApple: isOperatingSystemByApple(os) };
};

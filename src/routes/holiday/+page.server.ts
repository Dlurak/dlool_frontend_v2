import type { PageServerLoad } from './$types';
import { getIpApiResponse } from '$lib/utils/ip/getGeolocation';
import { randomItem } from '$lib/utils/random';
import { IPV4_ADRESSES } from '$lib/constants/ips';

function getDevAddress() {
	const ip = randomItem(IPV4_ADRESSES);
	console.log(ip);
	return ip;
}

export const load: PageServerLoad = async ({ getClientAddress }) => {
	const ip = import.meta.env.MODE === 'development' ? getDevAddress() : getClientAddress();

	try {
		const data = await getIpApiResponse(ip);
		return {
			data,
			isSuccessfull: true
		} as const;
	} catch (e) {
		console.error(JSON.stringify(e, null, 4));
		return { isSuccessfull: false } as const;
	}
};

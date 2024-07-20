import { IP_INFO_TOKEN } from '$env/static/private';
import { z } from 'zod';

const regionCodes: Record<string, string> = {
	'baden-württemberg': 'BW',
	bavaria: 'BY',
	berlin: 'BE',
	brandenburg: 'BB',
	bremen: 'HB',
	hamburg: 'HH',
	hesse: 'HE',
	'lower saxony': 'NI',
	'mecklenburg-vorpommern': 'MV',
	'north rhine-westphalia': 'NW',
	'rhineland-palatinate': 'RP',
	saarland: 'SL',
	saxony: 'SN',
	'saxony-anhalt': 'ST',
	'schleswig-holstein': 'SH',
	thuringia: 'TH'
};

const scheme = z.object({
	country: z.string(),
	region: z.string()
});

export async function getIpApiResponse(ip: string) {
	const url = `https://ipinfo.io/${ip}?token=${IP_INFO_TOKEN}`;
	const unparsed = await fetch(url).then((r) => r.json());

	const parsed = scheme.parse(unparsed);

	return {
		regionCode: regionCodes[parsed.region.toLowerCase()] || parsed.region.toUpperCase().slice(0, 2),
		...parsed
	};
}

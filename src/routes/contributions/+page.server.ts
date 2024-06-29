import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const test = await fetch(
		'https://api.github.com/repos/dlurak/dlool_frontend_v2/collaborators'
	).then((r) => r.json());
	console.log(test);
	return {};
};

import { redirect, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_TODOIST_SECRET, PUBLIC_TODOIST_CLIENT_ID } from '$env/static/public';
import { TODOIST_CLIENT_SECRET } from '$env/static/private';
import { z } from 'zod';

export const GET: RequestHandler = async ({ url: { searchParams }, fetch }) => {
	const code = searchParams.get('code');
	const state = searchParams.get('state');

	if (state !== PUBLIC_TODOIST_SECRET || !code) {
		redirect(302, '/settings/todo?error=true');
	}

	const url = new URL('https://todoist.com/oauth/access_token');
	url.searchParams.append('client_id', PUBLIC_TODOIST_CLIENT_ID);
	url.searchParams.append('client_secret', TODOIST_CLIENT_SECRET);
	url.searchParams.append('code', code);
	url.searchParams.append('redirect_uri', 'http://localhost:5173/settings/todo/todoist');
	const res = await fetch(url, { method: 'POST' })
		.then((res) => res.json())
		.then((res) => z.object({ access_token: z.string().min(1) }).parse(res));

	redirect(302, `/settings/todo?todoist=${res.access_token}`);
};

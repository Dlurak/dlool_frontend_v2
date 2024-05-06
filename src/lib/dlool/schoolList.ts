import { getApibase, getAuthHeader } from '$lib/utils/api';
import { z } from 'zod';

const schoolScheme = z.object({
	name: z.string(),
	description: z.string()
});

export type School = z.infer<typeof schoolScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved schools'),
	data: z.array(schoolScheme)
});

interface SchoolProps {
	limit?: number;
	offset?: number;
	query?: string;
}

export async function listSchools(props: SchoolProps) {
	const limit = props.limit ? `limit=${props.limit}&` : '';
	const offset = props.offset ? `offset=${props.offset}&` : '';
	const query = props.query ? `query=${props.query}&` : '';

	const res = await fetch(`${getApibase()}/school?${limit}${offset}${query}`, {
		headers: { Authorization: getAuthHeader() }
	}).then((r) => r.json());

	const parsed = scheme.parse(res);

	return parsed;
}

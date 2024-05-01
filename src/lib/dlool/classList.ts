import { getApibase } from '$lib/utils/api';
import { z } from 'zod';

const classScheme = z.object({ name: z.string(), created: z.number() });

export type Class = z.infer<typeof classScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully retrieved classes'),
	data: z.array(classScheme)
});

interface ClassProps {
	school: string;
	query?: string;
	limit?: number;
	offset?: number;
}

export async function listClasses(props: ClassProps) {
	const params = [
		`school=${props.school}`,
		props.query ? `query=${props.query}` : '',
		props.limit ? `limit=${props.limit}` : '',
		props.offset ? `offset=${props.offset}` : ''
	];

	const res = await fetch(`${getApibase()}/classes?${params.join('&')}`).then((r) => r.json());

	const parsed = scheme.parse(res);
	return parsed;
}

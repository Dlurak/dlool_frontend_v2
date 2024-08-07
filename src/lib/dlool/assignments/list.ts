import { getApibase } from '$lib/utils/api';
import { objToQueryParams } from '$lib/utils/url/query';
import { z } from 'zod';

const dateScheme = z.object({
	day: z.number().int().min(1).max(31),
	month: z.number().int().min(1).max(12),
	year: z.number().int()
});

const assignmentScheme = z.object({
	subject: z.string(),
	description: z.string(),
	from: dateScheme,
	due: dateScheme,
	updates: z.array(
		z.object({
			user: z.object({
				username: z.string(),
				displayname: z.string()
			}),
			time: z.number().int().min(0)
		})
	),
	class: z.object({ name: z.string() }),
	id: z.string()
});

export type Assignment = z.infer<typeof assignmentScheme>;

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Received data'),
	data: z.object({
		totalCount: z.number().int(),
		assignments: z.array(assignmentScheme)
	})
});

interface TimeFilter {
	earliest?: string;
	latest?: string;
}
interface TextFilter {
	query: number;
	exact?: boolean;
}

export interface AssignmentProps {
	school: string;
	classes: string[];
	limit?: number;
	offset?: number;
	orderDirection?: 'asc' | 'desc';
	orderKey?: 'due' | 'from' | 'subject' | 'description' | 'versionsCount';
	filter?: {
		from?: TimeFilter;
		due?: TimeFilter;
		subject?: TextFilter;
		description?: TextFilter;
	};
}

export async function loadAssignments(props: AssignmentProps) {
	const params = objToQueryParams({ ...props });
	const res = await fetch(`${getApibase()}/assignments?${params}`).then((r) => r.json());

	return scheme.parse(res);
}

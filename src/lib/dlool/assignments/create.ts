import { getApibase, getHeader } from '$lib/utils/api';
import type { CustomDate } from '$lib/utils/dates/custom';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully created assignment'),
	data: z.object({
		id: z.string()
	})
});

interface CreateAssignmentProps {
	school: string;
	class: string;
	subject: string;
	description: string;
	from: CustomDate;
	due: CustomDate;
}

export async function createAssignment(props: CreateAssignmentProps) {
	const res = await fetch(`${getApibase()}/assignments`, {
		method: 'POST',
		headers: getHeader(),
		body: JSON.stringify({ ...props })
	}).then((r) => r.json());

	return scheme.parse(res);
}

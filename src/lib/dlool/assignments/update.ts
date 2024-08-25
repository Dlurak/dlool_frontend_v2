import { getApibase, getAuthHeader } from '$lib/utils/api';
import type { CustomDate } from '$lib/utils/dates/custom';
import { removeKey } from '$lib/utils/objects/removeKey';
import { prettify } from '$lib/utils/strings/prettify';
import { z } from 'zod';

const scheme = z.object({
	status: z.literal('success'),
	message: z.literal('Successfully updated assignment'),
	data: z.null()
});

interface UpdateProps {
	id: string;

	subject?: string;
	description?: string;
	fromDate?: CustomDate;
	dueDate?: CustomDate;
}

export async function updateAssignment(props: UpdateProps) {
	const res = await fetch(`${getApibase()}/assignments/${props.id}`, {
		method: 'PATCH',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...removeKey(props, 'id'),
			...(props.description && { description: prettify(props.description) })
		})
	}).then((r) => r.json());

	return scheme.parse(res);
}

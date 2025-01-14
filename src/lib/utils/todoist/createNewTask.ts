import { Method } from '$lib/utils/api';
import type { CustomDate } from '$lib/utils/dates/custom';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
import { z } from 'zod';

const todoistToken = svocal('settings.todo.todoist.code');
const todoisttaskIds = svocal('settings.todo.todoist.taskIds');

const fmtDayMonth = (dayOrMonth: number) => dayOrMonth.toString().padStart(2, '0');

const newScheme = z.object({
	creator_id: z.string(),
	created_at: z.string(),
	assignee_id: z.nullable(z.unknown()),
	assigner_id: z.nullable(z.unknown()),
	comment_count: z.number().min(0),
	is_completed: z.boolean(),
	content: z.string(),
	description: z.string(),
	due: z.object({}),
	duration: z.nullable(z.unknown()),
	id: z.string(),
	labels: z.array(z.unknown()),
	order: z.number(),
	priority: z.number(),
	project_id: z.string(),
	section_id: z.string(),
	parent_id: z.nullable(z.string()),
	url: z.string().url()
});

const retrieveScheme = z.object({
	id: z.string(),
	content: z.string(),
	due: z.object({
		date: z.string()
	})
});

type TaskProps = {
	content: string;
	sectionId: string;
	dloolId: string;
	due: CustomDate;
};

export async function createNewTask({ content, sectionId, dloolId, due }: TaskProps): Promise<{
	id: string;
}> {
	const todoistId = get(todoisttaskIds)[dloolId];
	const formattedDate = `${due.year}-${fmtDayMonth(due.month)}-${fmtDayMonth(due.day)}`;
	if (!todoistId) {
		return await fetch('https://api.todoist.com/rest/v2/tasks', {
			method: Method.POST,
			headers: { Authorization: `Bearer ${get(todoistToken)}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				content,
				section_id: sectionId,
				due_string: formattedDate
			})
		})
			.then((r) => r.json())
			.then(newScheme.parse);
	}

	const alreadyCreated = await fetch(`https://api.todoist.com/rest/v2/tasks/${todoistId}`, {
		method: Method.GET,
		headers: { Authorization: `Bearer ${get(todoistToken)}` }
	})
		.then((r) => r.json())
		.then(retrieveScheme.parse);

	if (typeof alreadyCreated === 'string') {
		return { id: alreadyCreated };
	}

	if (content === alreadyCreated.content && formattedDate === alreadyCreated.due.date) {
		return { id: todoistId };
	}

	const updatedTask = await fetch(`https://api.todoist.com/rest/v2/tasks/${todoistId}`, {
		method: Method.POST,
		headers: {
			Authorization: `Bearer ${get(todoistToken)}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content,
			due_string: formattedDate
		})
	})
		.then((r) => r.json())
		.then(z.object({ id: z.string() }).parse);

	return updatedTask;
}

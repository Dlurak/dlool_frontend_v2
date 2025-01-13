import { Method } from '$lib/utils/api';
import type { CustomDate } from '$lib/utils/dates/custom';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
import { z } from 'zod';

const todoistToken = svocal('settings.todo.todoist.code');

const fmtDayMonth = (dayOrMonth: number) => dayOrMonth.toString().padStart(2, '0');

const scheme = z.object({
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

type TaskProps = {
	content: string;
	sectionId: string;
	id: string;
	due: CustomDate;
};

export async function createNewTask({ content, sectionId, id: dloolId, due }: TaskProps) {
	const res = await fetch('https://api.todoist.com/rest/v2/tasks', {
		method: Method.POST,
		headers: { Authorization: `Bearer ${get(todoistToken)}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			content,
			description: dloolId,
			section_id: sectionId,
			due_string: `${due.year}-${fmtDayMonth(due.month)}-${fmtDayMonth(due.day)}`
		})
	}).then((r) => r.json());

	const parsed = scheme.parse(res);
	return parsed
}

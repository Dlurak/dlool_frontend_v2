import { Method } from '$lib/utils/api';
import { svocal } from '$lib/utils/store/svocal';
import { internalSubjectRepresentation } from '$lib/utils/subjects/internal';
import { get } from 'svelte/store';
import { z } from 'zod';

const todoistToken = svocal('settings.todo.todoist.code');
const todoistProjectId = svocal('settings.todo.todoist.listId');
const todoistSections = svocal('settings.todo.todoist.projectIds');

const scheme = z.object({ id: z.string() });

export async function createSection(name: string) {
	const subject = internalSubjectRepresentation(name);

	if (get(todoistSections)[subject]) {
		return { id: get(todoistSections)[subject] };
	}

	const res = await fetch('https://api.todoist.com/rest/v2/sections', {
		method: Method.POST,
		headers: { Authorization: `Bearer ${get(todoistToken)}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, project_id: get(todoistProjectId) })
	}).then((r) => r.json());
	const parsed = scheme.parse(res);

	todoistSections.update((prev) => {
		prev[subject] = parsed.id;
		return prev;
	});

	return parsed;
}

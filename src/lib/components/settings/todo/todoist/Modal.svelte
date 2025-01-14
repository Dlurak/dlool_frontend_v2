<script context="module" lang="ts">
	const todoitToken = svocal('settings.todo.todoist.code');

	type Color = keyof typeof TODOIST_COLORS;
	async function createProject(name: string, color: Color) {
		const res = await fetch('https://api.todoist.com/rest/v2/projects', {
			method: Method.POST,
			headers: { Authorization: `Bearer ${get(todoitToken)}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name.trim() || 'Dlool',
				color,
				is_favourite: true,
				view_style: 'board'
			})
		}).then((r) => r.json());

		const scheme = z.object({
			id: z.string(),
			name: z.string(),
			comment_count: z.number(),
			color: z.union([
				z.literal('berry_red'),
				z.literal('red'),
				z.literal('orange'),
				z.literal('yellow'),
				z.literal('olive_green'),
				z.literal('lime_green'),
				z.literal('green'),
				z.literal('mint_green'),
				z.literal('teal'),
				z.literal('sky_blue'),
				z.literal('light_blue'),
				z.literal('blue'),
				z.literal('grape'),
				z.literal('violet'),
				z.literal('lavender'),
				z.literal('magenta'),
				z.literal('salmon'),
				z.literal('charcoal'),
				z.literal('grey'),
				z.literal('taupe')
			]),
			is_shared: z.boolean(),
			order: z.number(),
			is_favorite: z.boolean(),
			is_inbox_project: z.boolean(),
			is_team_inbox: z.boolean(),
			view_style: z.union([z.literal('list'), z.literal('board')]),
			url: z.string().url(),
			parent_id: z.nullable(z.unknown())
		});
		return scheme.parse(res);
	}
</script>

<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Info from '$lib/components/utils/Info.svelte';
	import { TODOIST_COLORS } from '$lib/constants/todoistColors';
	import { i } from '$lib/i18n/store';
	import { Method } from '$lib/utils/api';
	import { objectEntries } from '$lib/utils/objects/entries';
	import { svocal } from '$lib/utils/store/svocal';
	import { createEventDispatcher } from 'svelte';
	import { get, readable } from 'svelte/store';
	import { z } from 'zod';

	let selectedColor: Color = 'green';
	let disabled = false;
	let name = 'Dlool';

	const dispatch = createEventDispatcher<{ finish: string }>();
</script>

<div class="flex max-w-[26rem] flex-col gap-4">
	<Info>
		Dlool erstellt ein neues Todoist projekt, die Erinerrungen in diesem Projekt werden automatisch
		aktualisiert. Bitte ändere die Beschreibung deswegen nicht
	</Info>

	<h3>Neues Projekt</h3>
	<TextInput placeholder={readable('hallo')} bind:value={name} />

	<h4>Farbe</h4>
	<div class="flex flex-wrap gap-1">
		{#each objectEntries(TODOIST_COLORS) as [key, hex] (key)}
			<button
				on:click={() => {
					selectedColor = key;
				}}
				class="h-7 w-7 rounded-full border-solid border-black bg-[--bg] touch:h-10 touch:w-10"
				class:border-2={selectedColor === key}
				style:--bg={hex}
			/>
		{/each}
	</div>

	<PrimaryButton
		on:click={async () => {
			disabled = true;
			try {
				const { id } = await createProject(name, selectedColor);
				sendToast({
					type: 'success',
					content: i('todoist.listCreated'),
					timeout: 5_000
				});
				dispatch('finish', id);
			} catch {
				disabled = false;
				sendDefaultErrorToast();
			}
		}}
		{disabled}
	>
		Erstellen!
	</PrimaryButton>
</div>

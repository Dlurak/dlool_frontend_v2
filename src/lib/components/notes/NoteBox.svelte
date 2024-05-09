<script lang="ts">
	import type { Note } from '$lib/dlool/notes/list';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import { Trash } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { confirm } from '../layout/confirmation';
	import { i } from '$lib/i18n/store';
	import { sendToast } from '../layout/toasts';
	import { createEventDispatcher } from 'svelte';
	import { deleteNote } from '$lib/dlool/notes/delete';
	import { page } from '$app/stores';

	export let note: Note & { id: string };

	const userDetails = svocal('dlool.ownUserDetails');
	const { isLoggedIn } = useAuth();
	const dispatch = createEventDispatcher<{ delete: null }>();

	$: matchingClass = $userDetails?.classes.find((c) => deepEqual(note.class, c));
	$: matchingSchool = $userDetails?.classes.find(
		({ school }) => school.name === note.class.school.name
	);
	$: isMatchingUser = $userDetails?.username === note.creator.username;

	$: canEdit =
		($isLoggedIn &&
			(isMatchingUser ||
				(matchingClass && (note.editScope === 'School' || note.editScope === 'Class')) ||
				(matchingSchool && note.editScope === 'School'))) ??
		false;
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<a
		href={`/notes/${note.id}${$page.url.search}`}
		class="flex flex-col gap-2 text-black dark:text-white"
	>
		<h3>{note.title}</h3>

		{#if note.summary}
			<p>{note.summary}</p>
		{:else}
			<p class="text-center italic text-gray-600 dark:text-gray-500">No summary provided</p>
		{/if}
	</a>

	{#if canEdit}
		<div class="flex w-full justify-evenly pt-2">
			<QuickAction
				icon={Trash}
				small
				color="red"
				on:click={async () => {
					const isConfirmed = await confirm({
						desc: i('notes.delete.desc'),
						ok: i('notes.delete.ok')
					});
					if (!isConfirmed) return;

					await deleteNote(note.id);

					sendToast({
						type: 'success',
						content: i('note.delete.success'),
						timeout: 5_000
					});

					dispatch('delete', null);
				}}
			/>
		</div>
	{/if}
</div>

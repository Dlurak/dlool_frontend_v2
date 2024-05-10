<script lang="ts">
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { confirm } from '$lib/components/layout/confirmation';
	import { sendToast } from '$lib/components/layout/toasts';
	import { deleteNote } from '$lib/dlool/notes/delete';
	import type { Note } from '$lib/dlool/notes/list';
	import { i } from '$lib/i18n/store';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import { createEventDispatcher } from 'svelte';
	import { PencilSquare, Trash } from 'svelte-hero-icons';
	import Edit from '../Edit.svelte';

	export let note: Note;
	export let id: string;

	let isOpen = false;

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

{#if canEdit}
	<div class="flex gap-2">
		<QuickAction
			icon={PencilSquare}
			small
			color="blue"
			on:click={() => {
				isOpen = !isOpen;
			}}
		/>

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

				await deleteNote(id);

				sendToast({
					type: 'success',
					content: i('note.delete.success'),
					timeout: 5_000
				});

				dispatch('delete');
			}}
		/>
	</div>
{/if}

<Edit {id} {note} bind:isOpen on:update />

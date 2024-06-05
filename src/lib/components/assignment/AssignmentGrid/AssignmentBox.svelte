<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { Trash, Pencil } from 'svelte-hero-icons';
	import { i } from '$lib/i18n/store';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { deleteAssignment } from '$lib/dlool/assignments/delete';
	import { createEventDispatcher } from 'svelte';
	import { svocal } from '$lib/utils/store/svocal';
	import { confirm } from '$lib/components/layout/confirmation';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import ReadAssignmentBox from './ReadAssignmentBox.svelte';
	import EditAssignmentBox from './EditAssignmentBox.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { updateAssignment } from '$lib/dlool/assignments/update';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Store from '$lib/components/utils/Store.svelte';

	export let assignment: Assignment;
	export let school: string;

	type ReadState = {
		view: 'read';
	};
	type WriteState = {
		view: 'write';
		hasUnsavedEdits: boolean;
	};
	type State = ReadState | WriteState;

	const state: Writable<State> = writable({ view: 'read' });

	const userDetails = svocal('dlool.ownUserDetails');

	$: hasEditRights = $userDetails?.classes.some(({ name, school: schoolObj }) => {
		const classMatches = assignment.class.name === name;
		const schoolMatches = school === schoolObj.name;

		return classMatches && schoolMatches;
	});

	const dispatch = createEventDispatcher<{
		delete: null;
		update: null;
	}>();
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<ReadAssignmentBox {assignment} />

	{#if hasEditRights}
		<div class="flex w-full justify-evenly pt-2">
			<QuickAction
				icon={Trash}
				small
				color="red"
				on:click={async () => {
					const isConfirmed = await confirm({
						desc: i('assignments.delete.desc'),
						ok: i('assignments.delete.ok')
					});
					if (!isConfirmed) return;

					await deleteAssignment(assignment.id);

					sendToast({
						type: 'success',
						content: i('assignments.delete.success'),
						timeout: 5_000
					});
					dispatch('delete', null);
				}}
			/>
			<QuickAction
				icon={Pencil}
				color="blue"
				disabled={$state.view === 'write' && $state.hasUnsavedEdits}
				small
				on:click={() => {
					state.update((val) => {
						if (val.view === 'write') return { view: 'read' };

						return { view: 'write', hasUnsavedEdits: false };
					});
				}}
			/>
		</div>
	{/if}
</div>

<Modal
	isOpen={$state.view === 'write'}
	closeDisabled={$state.view === 'write' && $state.hasUnsavedEdits}
	on:close={() => {
		$state.view = 'read';
	}}
>
	<div slot="title">
		<Store store={i('assignments.edit')} />
	</div>

	<div slot="body" class="flex flex-col gap-3 py-1">
		<EditAssignmentBox
			{assignment}
			disabled={$state.view === 'write' && !$state.hasUnsavedEdits}
			on:change={({ detail }) => {
				if ($state.view === 'read') return;

				state.set({
					view: 'write',
					hasUnsavedEdits: !detail.isOriginal
				});
			}}
			on:submit={({ detail }) => {
				updateAssignment({
					id: assignment.id,
					...detail
				})
					.then(() => {
						sendToast({
							type: 'success',
							content: i('assignments.update.success'),
							timeout: 5_000
						});
						dispatch('update', null);
					})
					.catch(sendDefaultErrorToast);
			}}
		/>
	</div>
</Modal>

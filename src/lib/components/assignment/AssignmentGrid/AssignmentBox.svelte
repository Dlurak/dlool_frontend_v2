<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { Trash, Pencil, Photo } from 'svelte-hero-icons';
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
	import { useAuth } from '$lib/utils/store/auth';
	import { downloadUrl, asyncRequestAnimationFrame } from '$lib/utils/dom';

	export let assignment: Assignment;
	export let school: string;
	export let overdue = false;

	let element: HTMLDivElement | undefined = undefined;
	let capturing = false;

	type ReadState = {
		view: 'read';
	};
	type WriteState = {
		view: 'write';
		hasUnsavedEdits: boolean;
	};
	type State = ReadState | WriteState;

	const state: Writable<State> = writable({ view: 'read' });

	const transparencyOfOverdue = svocal('settings.homework.transparency');

	const queryStore = writable({ school, classes: [assignment.class.name] });
	$: queryStore.update((props) => ({ ...props, school }));
	$: queryStore.update((props) => ({ ...props, classes: [assignment.class.name] }));

	const { isLoggedIn, isInClass } = useAuth({ query: queryStore });

	const dispatch = createEventDispatcher<{
		delete: null;
		update: null;
	}>();
</script>

{#if !(overdue && $transparencyOfOverdue === 0)}
	<div
		style:--opac={$transparencyOfOverdue}
		class:opacity-[--opac]={overdue}
		class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
	>
		<ReadAssignmentBox {assignment} bind:ele={element} {capturing} />

		<div class="flex w-full justify-evenly pt-2">
			{#if $isInClass && $isLoggedIn}
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
			{/if}
			<QuickAction
				icon={Photo}
				small
				color="indigo"
				on:click={async () => {
					if (!element) return;
					const html2canvas = await import('html2canvas').then((lib) => lib.default);

					capturing = true;
					await asyncRequestAnimationFrame();

					const canvas = await html2canvas(element);
					capturing = false;

					downloadUrl({
						url: canvas.toDataURL(),
						fileName: 'Dlool-homework.png'
					});
				}}
			/>
		</div>
	</div>

	<Modal
		isOpen={$state.view === 'write'}
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
{/if}

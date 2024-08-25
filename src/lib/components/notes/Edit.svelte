<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import { updateNote } from '$lib/dlool/notes/update';
	import { createEventDispatcher } from 'svelte';
	import { sendDefaultErrorToast, sendToast } from '../layout/toasts';
	import CreationInner from './CreationInner.svelte';
	import type { Note } from '$lib/dlool/notes/list';
	import Store from '../utils/Store.svelte';

	export let isOpen: boolean = false;
	export let note: Note;
	export let id: string;

	let { title, priority, editScope, tags } = note;
	let summary = note.summary ?? undefined;

	const dispatch = createEventDispatcher<{ update: null }>();

	$: hasChanges = !deepEqual(note, {
		...note,
		title,
		priority,
		editScope,
		tags,
		summary: summary ?? null
	});
</script>

<Modal bind:isOpen>
	<div slot="title">Edit</div>

	<div slot="body" class="flex flex-col gap-3 py-3">
		<CreationInner
			bind:title
			bind:summary
			bind:priority
			bind:editScope
			bind:tags
			className={note.class.name}
			schoolName={note.class.school.name}
		/>

		<PrimaryButton
			disabled={!hasChanges}
			on:click={async () => {
				await updateNote({
					id,
					title,
					summary,
					editScope,
					tags,
					priority: priority ?? 'Minimal'
				}).catch(sendDefaultErrorToast);

				isOpen = false;

				sendToast({
					type: 'success',
					content: i('note.update.success'),
					timeout: 5_000
				});

				dispatch('update', null);
			}}
		>
			<Store store={i('update')} />
		</PrimaryButton>
	</div>
</Modal>

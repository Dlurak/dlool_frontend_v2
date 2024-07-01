<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { listClasses, type Class } from '$lib/dlool/classList';
	import type { Note } from '$lib/dlool/notes/list';
	import { isUserInClass } from '$lib/utils/dlool/isInClass';
	import { AcademicCap } from 'svelte-hero-icons';
	import Select from '../select/Select.svelte';
	import CreationInner from './CreationInner.svelte';
	import { i } from '$lib/i18n/store';
	import { readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import { createNote } from '$lib/dlool/notes/create';
	import { sendDefaultErrorToast, sendToast } from '../layout/toasts';
	import { createEventDispatcher } from 'svelte';
	import type { Tag } from '../tags/types';
	import { safePromise } from '$lib/utils/promises';

	let isOpen = false;
	let onGoing = false;

	export let query: {
		school: string;
		classes: string[];
	};

	const showClass = (name: string) => isUserInClass({ class: name, school: query.school });

	$: selectableClasses = query.classes.filter(showClass);
	const initiallySelected = query.classes.filter(showClass);

	let classBucket: Class[] = [];
	let classInput = initiallySelected.length === 1 ? initiallySelected[0] : '';

	let title = '';
	let summary = '';
	let priority: Note['priority'] = 'Minimal';
	let editScope: Note['editScope'] = 'Self';
	let tags: Tag[] = [];

	const dispatch = createEventDispatcher<{ create: null }>();
</script>

<button
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 hover:outline-emerald-500 focus:outline-emerald-500 dark:outline-zinc-700"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	New Note
</button>

<Modal bind:isOpen>
	<div slot="title">Create a new note</div>

	<div slot="body" class="flex flex-col gap-3 py-3">
		{#if selectableClasses.length > 1}
			<h4><Store store={i('class')} /></h4>

			<Select
				icon={AcademicCap}
				threshold={0.1}
				placeholder={i('class')}
				value={[classInput]}
				bind:firstValue={classInput}
				options={classBucket.map(({ name }) => ({
					label: readable(name),
					value: name
				}))}
				on:userInput={async (e) => {
					classBucket = await listClasses({
						school: query.school,
						query: e.detail
					}).then((d) => d.data.filter(({ name }) => selectableClasses.includes(name)));
				}}
			/>
		{/if}

		<CreationInner
			bind:title
			bind:summary
			bind:priority
			bind:editScope
			bind:tags
			className={classInput}
			schoolName={query.school}
		/>

		<hr class="border-zinc-300 dark:border-zinc-700" />

		<PrimaryButton
			disabled={!(classInput && title) || onGoing}
			on:click={async () => {
				onGoing = true;
				const res = await safePromise(
					createNote({
						title,
						editScope,
						summary,
						tags,
						priority: priority ?? undefined,
						school: query.school,
						class: classInput
					})
				);

				onGoing = false;

				if (res.isError) return sendDefaultErrorToast();

				sendToast({
					type: 'success',
					content: i('note.create.success'),
					timeout: 5_000
				});

				// Resetting state
				isOpen = false;
				title = '';
				summary = '';
				priority = 'Minimal';
				editScope = 'Self';
				tags = [];

				dispatch('create', null);
			}}
		>
			<Store store={i('note.create.new')} />
		</PrimaryButton>
	</div>
</Modal>

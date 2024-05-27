<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { isUserInClass } from '$lib/utils/dlool/isInClass';
	import SingleClass from '$lib/components/input/SingleClass.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import {
		customDateToNormal,
		UNIX_TIME_EPOCHE_START,
		type CustomDateTime
	} from '$lib/utils/dates/custom';
	import type { Priority } from '$lib/types/priority';
	import { createCalendar } from '$lib/dlool/calendar/create';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { invalidateAll } from '$app/navigation';
	import { safeMap } from '$lib/utils/null/safeMap';
	import NewInner from './NewInner.svelte';
	import { i } from '$lib/i18n/store';

	export let query: {
		school: string;
		classes: string[];
	};

	let isOpen = false;

	const showClass = ({ name }: { name: string }) =>
		isUserInClass({ class: name, school: query.school });
	const directShowClass = (name: string) => showClass({ name });

	let selectedClass = query.classes.find(directShowClass) ?? null;
	let title: string = '';
	let beginning: CustomDateTime | null = null;
	let ending: CustomDateTime | null = null;
	let summary = '';
	let location = '';
	let priority: Priority | null = null;

	const ts = (d: CustomDateTime | null) => {
		return customDateToNormal(d ?? UNIX_TIME_EPOCHE_START).getTime();
	};

	$: beginningIsEarlierThenEnding = ending ? ts(beginning) < ts(ending) : true;

	$: isEnabled =
		!!title && !!query.school && !!selectedClass && !!beginning && beginningIsEarlierThenEnding;
</script>

<button
	class="flex w-full flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 hover:outline-emerald-500 focus:outline-emerald-500 dark:outline-zinc-700"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	<!-- TODO: i18n -->
	New Note
</button>

<Modal bind:isOpen>
	<!-- TODO: i18n -->
	<div slot="title">Create a new event</div>

	<div slot="body" class="flex flex-col gap-3 py-3">
		{#if query.classes.filter(directShowClass).length > 1}
			<SingleClass bind:selectedClass school={query.school} filter={showClass} />
		{/if}

		<NewInner
			bind:title
			bind:beginning
			bind:ending
			bind:summary
			bind:location
			bind:priority
		/>

		<hr class="border-zinc-300 dark:border-zinc-700" />

		<PrimaryButton
			disabled={!isEnabled}
			on:click={() => {
				if (!selectedClass || !beginning) return;

				createCalendar({
					school: query.school,
					class: selectedClass,
					title: title,
					beginning: customDateToNormal(beginning).getTime(),
					ending: safeMap(ending, (ending) => customDateToNormal(ending).getTime()) ?? undefined,
					summary: summary || undefined,
					location: location || undefined,
					priority: priority ?? undefined
				})
					.then(() => {
						sendToast({
							type: 'success',
							// TODO: i18n
							content: i('note.create.success'),
							timeout: 5_000
						});
						return invalidateAll();
					})
					.catch(sendDefaultErrorToast);
			}}
		>
			<!-- TODO: i18n -->
			Create
		</PrimaryButton>
	</div>
</Modal>

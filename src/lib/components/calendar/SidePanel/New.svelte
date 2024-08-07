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
	import Store from '$lib/components/utils/Store.svelte';
	import type { Tag } from '$lib/components/tags/types';

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
	let tags: Tag[] = [];

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
	<Store store={i('calendar.new')} />
</button>

<Modal bind:isOpen>
	<div slot="title">
		<Store store={i('calendar.new.modal.title')} />
	</div>

	<div slot="body" class="flex flex-col gap-3 py-3">
		{#if query.classes.filter(directShowClass).length > 1}
			<SingleClass bind:selectedClass school={query.school} filter={showClass} />
		{/if}

		<NewInner
			schoolName={query.school}
			className={selectedClass}
			bind:title
			bind:beginning
			bind:ending
			bind:summary
			bind:location
			bind:priority
			bind:tags
		/>

		<hr class="border-zinc-300 dark:border-zinc-700" />

		<PrimaryButton
			disabled={!isEnabled}
			on:click={() => {
				if (!selectedClass || !beginning) return;

				createCalendar({
					tags,
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
							content: i('calendar.create.success'),
							timeout: 5_000
						});

						title = '';
						beginning = null;
						ending = null;
						summary = '';
						location = '';
						priority = null;
						tags = [];

						isOpen = false;
						return invalidateAll();
					})
					.catch(sendDefaultErrorToast);
			}}
		>
			<Store store={i('calendar.new.create')} />
		</PrimaryButton>
	</div>
</Modal>

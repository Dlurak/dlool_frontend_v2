<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { priorities } from '$lib/constants/priorities';
	import { isUserInClass } from '$lib/utils/dlool/isInClass';
	import SingleClass from '$lib/components/input/SingleClass.svelte';
	import { i } from '$lib/i18n/store';
	import Store from '$lib/components/utils/Store.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import TimeSelector from '$lib/components/input/date/time/DateTime.svelte';
	import Collapseable from '$lib/components/utils/Collapseable.svelte';
	import { MapPin } from 'svelte-hero-icons';
	import NotTyppable from '$lib/components/select/NotTyppable.svelte';
	import { capitalize } from '$lib/utils/strings/case';
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

		<h4><Store store={i('calendar.title')} /></h4>
		<TextInput placeholder={i('calendar.title.placeholder')} bind:value={title} />

		<!-- TODO: i18n -->
		<h4>Beginning</h4>
		<TimeSelector bind:date={beginning} />

		<Collapseable id="create-cal-optional">
			<div slot="heading">
				<!-- TODO: i18n -->
				<h3>Optional but recommended</h3>
			</div>

			<div slot="content" class="flex flex-col gap-3">
				<!-- TODO: i18n -->
				<h4>Ending</h4>
				<TimeSelector showResetButton bind:date={ending} />

				<!-- TODO: i18n -->
				<h4>Location</h4>
				<TextInput
					placeholder={i('calendar.title.placeholder')}
					icon={MapPin}
					bind:value={location}
				/>

				<!-- TODO: i18n -->
				<h4>Summary</h4>
				<TextInput placeholder={i('calendar.title.placeholder')} bind:value={summary} />

				<!-- TODO: i18n -->
				<h4>Priority</h4>
				<NotTyppable
					options={priorities.map((prio) => ({
						// TODO: i18n
						label: i(`note.priority.${prio}`),
						value: capitalize(prio)
					}))}
					bind:value={priority}
				/>
			</div>
		</Collapseable>

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

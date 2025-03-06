<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import DateSelector from '$lib/components/input/date/DateSelector.svelte';
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { i } from '$lib/i18n/store';
	import { customDateToNormal, normalToCustomDate, type CustomDate } from '$lib/utils/dates/custom';
	import { createEventDispatcher } from 'svelte';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import TextArea from '$lib/components/input/TextArea.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { prettify } from '$lib/utils/strings/prettify';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { ArrowLongRight } from 'svelte-hero-icons';
	import { WEEKDAYS } from '$lib/components/settings/timetable/weekdays';
	import { svocal } from '$lib/utils/store/svocal';
	import { daysUntil } from '$lib/components/settings/timetable/daysUntil';
	import { get } from 'svelte/store';

	const timetable = svocal('settings.timetable');

	export let assignment: Assignment;
	export let disabled: boolean;

	let { subject, description, from: fromDate, due: dueDate } = assignment;

	$: internallyEnabled =
		!!subject &&
		!!prettify(description) &&
		customDateToNormal(dueDate) > customDateToNormal(fromDate);

	$: {
		dispatch('change', {
			isOriginal: deepEqual(
				{ subject, description, from: fromDate, due: dueDate },
				{
					subject: assignment.subject,
					description: assignment.description,
					from: assignment.from,
					due: assignment.due
				}
			)
		});
	}

	type UpdateAssignment = {
		subject: string;
		description: string;
		fromDate: CustomDate;
		dueDate: CustomDate;
	};

	const dispatch = createEventDispatcher<{
		change: { isOriginal: boolean };
		submit: UpdateAssignment;
	}>();
</script>

<TextInput placeholder={i('assignments.create.subject')} bind:value={subject} />
<TextArea markdown placeholder={i('assignments.create.description')} bind:value={description} />

<DateSelector bind:date={fromDate}>
	<span slot="postIcon"><Store store={i('assignments.create.from')} /></span>
</DateSelector>
<DateSelector bind:date={dueDate}>
	<span slot="postIcon"><Store store={i('assignments.create.due')} /></span>
	<span slot="postButton">
		<QuickAction
			icon={ArrowLongRight}
			small
			on:click={() => {
				const original = customDateToNormal(dueDate);
				const currentDay = WEEKDAYS[original.getDay()];

				let dueInDays = 7;
				try {
					dueInDays = daysUntil({
						subject,
						timetable: get(timetable),
						currentDay
					});
				} catch {}

				original.setDate(original.getDate() + dueInDays);
				dueDate = normalToCustomDate(original);
			}}
		/>
	</span>
</DateSelector>

<PrimaryButton
	disabled={disabled || !internallyEnabled}
	on:click={() => {
		dispatch('submit', { subject, description, fromDate, dueDate });
	}}
>
	<Store store={i('update')} />
</PrimaryButton>

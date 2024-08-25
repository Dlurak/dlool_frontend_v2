<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import DateSelector from '$lib/components/input/date/DateSelector.svelte';
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { i } from '$lib/i18n/store';
	import { customDateToNormal, type CustomDate } from '$lib/utils/dates/custom';
	import { createEventDispatcher } from 'svelte';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import TextArea from '$lib/components/input/TextArea.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { prettify } from '$lib/utils/strings/prettify';

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

<DateSelector bind:date={fromDate} />
<DateSelector bind:date={dueDate} />

<PrimaryButton
	disabled={disabled || !internallyEnabled}
	on:click={() => {
		dispatch('submit', { subject, description, fromDate, dueDate });
	}}
>
	<Store store={i('update')} />
</PrimaryButton>

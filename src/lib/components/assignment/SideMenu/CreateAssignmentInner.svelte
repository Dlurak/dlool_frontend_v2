<script context="module" lang="ts">
	export const wasSuccessfull = writable<boolean | null>(null);

	function safeDaysUntil(props: DaysUntilProps) {
		try {
			return daysUntil(props);
		} catch {
			return 7;
		}
	}
</script>

<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { listClasses, type Class } from '$lib/dlool/classList';
	import { i } from '$lib/i18n/store';
	import { createEventDispatcher } from 'svelte';
	import { AcademicCap } from 'svelte-hero-icons';
	import { readable, writable } from 'svelte/store';
	import {
		currentCustomDate,
		customDateToNormal,
		normalToCustomDate,
		type CustomDate
	} from '$lib/utils/dates/custom';
	import DateSelector from '$lib/components/input/date/DateSelector.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { isUserInClass } from '$lib/utils/dlool/isInClass';
	import { WEEKDAYS } from '$lib/components/settings/timetable/weekdays';
	import { svocal } from '$lib/utils/store/svocal';
	import { isString } from '$lib/utils/arrays/filter';
	import { daysUntil, type DaysUntilProps } from '$lib/components/settings/timetable/daysUntil';

	interface CreationPayload {
		school: string;
		class: string;
		subject: string;
		description: string;
		from: CustomDate;
		due: CustomDate;
	}

	const timetable = svocal('settings.timetable');

	const dispatch = createEventDispatcher<{ submit: CreationPayload }>();

	const showClass = (name: string) => isUserInClass({ class: name, school });

	export let school: string;
	export let allowedClasses: string[];

	$: selectableClasses = allowedClasses.filter(showClass);
	const initiallySelected = allowedClasses.filter(showClass);

	let classes: Class[] = [];
	let classInput = initiallySelected.length === 1 ? initiallySelected[0] : '';

	let subject = '';
	let description = '';

	let from = currentCustomDate();
	let due = currentCustomDate();

	$: disabled = !(
		classInput &&
		subject &&
		description &&
		customDateToNormal(due) > customDateToNormal(from)
	);

	$: {
		const dueInDays = safeDaysUntil({
			subject,
			timetable: $timetable,
			currentDay: WEEKDAYS[customDateToNormal(from).getDay()]
		});

		const date = customDateToNormal(from);
		date.setDate(date.getDate() + dueInDays);

		due = normalToCustomDate(date);
	}

	wasSuccessfull.subscribe((successfull) => {
		if (successfull) {
			subject = '';
			description = '';
		}

		disabled = false;
	});
</script>

<div class="flex flex-col gap-4 py-2">
	{#if selectableClasses.length > 1}
		<Select
			icon={AcademicCap}
			on:userInput={async (e) => {
				classes = await listClasses({
					school: school,
					query: e.detail
				}).then((d) => d.data.filter(({ name }) => selectableClasses.includes(name)));
			}}
			placeholder={i('class')}
			options={classes.map(({ name }) => ({
				label: readable(name),
				value: name
			}))}
			value={[classInput]}
			bind:firstValue={classInput}
			threshold={0.1}
		/>
	{/if}

	<TextInput
		placeholder={i('assignments.create.subject')}
		bind:value={subject}
		isValid={!!subject}
		options={$timetable[WEEKDAYS[customDateToNormal(from).getDay()]].filter(isString)}
	/>

	<!-- TODO: Replace description input with a textarea -->
	<TextInput
		placeholder={i('assignments.create.description')}
		bind:value={description}
		isValid={!!description}
	/>

	<DateSelector bind:date={from}>
		<span slot="postIcon"><Store store={i('assignments.create.from')} /></span>
	</DateSelector>
	<DateSelector bind:date={due}>
		<span slot="postIcon"><Store store={i('assignments.create.due')} /></span>
	</DateSelector>

	<PrimaryButton
		{disabled}
		on:click={() => {
			disabled = true;
			dispatch('submit', { description, subject, due, from, school, class: classInput });
		}}
	>
		<Store store={i('assignments.create.create')} />
	</PrimaryButton>
</div>

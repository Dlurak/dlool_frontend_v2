<script lang="ts">
	import Select from '$lib/components/select/Select.svelte';
	import { AcademicCap, BuildingLibrary } from 'svelte-hero-icons';
	import { listSchools, type School } from '$lib/dlool/schoolList';
	import { i } from '$lib/i18n/store';
	import { readable } from 'svelte/store';
	import { listClasses, type Class } from '$lib/dlool/classList';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { createEventDispatcher } from 'svelte';
	import Collapseable from '$lib/components/utils/Collapseable.svelte';
	import TimeRange from './TimeRange.svelte';
	import type { CustomDate } from '$lib/utils/dates/custom';

	type Query<S> = {
		school: S;
		classes: string[];
		dueStart: CustomDate | null;
		dueEnd: CustomDate | null;

		fromStart: CustomDate | null;
		fromEnd: CustomDate | null;
	};

	export let query: Query<string | null>;

	let schools: School[] = [];
	let schoolInput = query.school;

	let classes: Class[] = [];
	let classInput = query.classes;

	let dueStart: CustomDate | null = null;
	let dueEnd: CustomDate | null = null;

	let fromStart: CustomDate | null = null;
	let fromEnd: CustomDate | null = null;

	const dispatch = createEventDispatcher<{ filterApply: Query<string> }>();
</script>

<Collapseable id="homework-filter">
	<h3 class="pb-3 pt-2" slot="heading">Filters</h3>

	<div class="flex flex-col gap-3" slot="content">
		<Select
			icon={BuildingLibrary}
			on:userInput={async (e) => {
				schools = await listSchools({
					query: e.detail
				}).then((d) => d.data);
			}}
			placeholder={i('school')}
			options={schools.map(({ name }) => ({
				label: readable(name),
				value: name
			}))}
			bind:firstValue={schoolInput}
			value={schoolInput ? [schoolInput] : null}
			threshold={0.25}
		/>

		<Select
			allowMultiple
			icon={AcademicCap}
			on:userInput={async (e) => {
				classes = await listClasses({
					school: schoolInput ?? '',
					query: e.detail
				}).then((d) => d.data);
			}}
			placeholder={i('class')}
			options={classes.map(({ name }) => ({
				label: readable(name),
				value: name
			}))}
			bind:value={classInput}
			threshold={0.1}
		/>

		<h4><Store store={i('assignments.filter.due')} /></h4>

		<TimeRange bind:start={dueStart} bind:end={dueEnd}>
			<span slot="start"><Store store={i('assignments.filter.due.earliest')} /></span>

			<span slot="end"><Store store={i('assignments.filter.due.latest')} /></span>
		</TimeRange>

		<h4><Store store={i('assignments.filter.from')} /></h4>

		<TimeRange bind:start={fromStart} bind:end={fromEnd}>
			<span slot="start"><Store store={i('assignments.filter.from.earliest')} /></span>

			<span slot="end"><Store store={i('assignments.filter.from.latest')} /></span>
		</TimeRange>

		<PrimaryButton
			disabled={classInput.length === 0 || schoolInput === null}
			on:click={() => {
				dispatch('filterApply', {
					classes: classInput,
					school: schoolInput ?? '',
					dueStart,
					dueEnd,
					fromStart,
					fromEnd
				});
			}}
		>
			<Store store={i('assignments.filter.apply')} />
		</PrimaryButton>
	</div>
</Collapseable>

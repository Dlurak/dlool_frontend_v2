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

	type Query = {
		school: string;
		classes: string[];
	};

	export let query: Query;

	let schools: School[] = [];
	let schoolInput = query.school;

	let classes: Class[] = [];
	let classInput = query.classes;

	const dispatch = createEventDispatcher<{ filterApply: Query }>();
</script>

<h3 class="pb-3 pt-2">Filters</h3>

<div class="flex flex-col gap-3">
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
		value={[schoolInput]}
		threshold={0.25}
	/>

	<Select
		allowMultiple
		icon={AcademicCap}
		on:userInput={async (e) => {
			classes = await listClasses({
				school: schoolInput,
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

	<PrimaryButton
		disabled={classInput.length === 0}
		on:click={() => {
			dispatch('filterApply', {
				classes: classInput,
				school: schoolInput
			});
		}}
	>
		<Store store={i('assignments.filter.apply')} />
	</PrimaryButton>
</div>

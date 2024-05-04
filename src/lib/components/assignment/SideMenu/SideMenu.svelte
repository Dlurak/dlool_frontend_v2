<script lang="ts">
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import Select from '$lib/components/select/Select.svelte';
	import { AcademicCap, BuildingLibrary } from 'svelte-hero-icons';
	import { listSchools, type School } from '$lib/dlool/schoolList';
	import { i } from '$lib/i18n/store';
	import { readable } from 'svelte/store';
	import { listClasses, type Class } from '$lib/dlool/classList';

	export let query: {
		school: string;
		classes: string[];
	};

	const { isLoggedIn } = useAuth();
	const userDetails = svocal('dlool.ownUserDetails');

	$: isInClass =
		$userDetails?.classes.some(({ school, name }) => {
			const schoolMatches = query.school === school.name;
			const classMatches = query.classes.includes(name);

			return schoolMatches && classMatches;
		}) ?? false;

	let schools: School[] = [];
	let schoolInput = query.school;

	let classes: Class[] = [];
	let classInput = query.classes[0];
</script>

<div>
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
			bind:value={schoolInput}
			threshold={0.25}
		/>

		<Select
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
	</div>
</div>

{#if isInClass && $isLoggedIn}
	<div>
		<h3>Create a new assignment</h3>
	</div>
{/if}

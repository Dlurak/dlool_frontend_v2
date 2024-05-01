<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { listClasses, type Class } from '$lib/dlool/classList';
	import { listSchools, type School } from '$lib/dlool/schoolList';
	import { i } from '$lib/i18n/store';
	import { useAuth } from '$lib/utils/store/auth';
	import { readable } from 'svelte/store';
	import Store from '$lib/components/utils/Store.svelte';
	import { AcademicCap, BuildingLibrary } from 'svelte-hero-icons';

	const { isLoggedIn } = useAuth();

	let schoolInput = '';
	let schools: School[] = [];

	let classInput = '';
	let classes: Class[] = [];
</script>

<div
	class="flex w-[min(100%,28rem)] flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400"
>
	{#if $isLoggedIn}
		<h4 class="text-center">Join a class</h4>

		<Select
			allowCustomval
			icon={BuildingLibrary}
			on:userInput={async (e) => {
				schools = await listSchools({
					query: e.detail
				}).then((d) => d.data);
			}}
			placeholder={i('school')}
			options={schools.map((sch) => ({
				label: readable(sch.name),
				value: sch.name
			}))}
			bind:value={schoolInput}
			threshold={0.1}
		/>
		<Select
			allowCustomval
			icon={AcademicCap}
			placeholder={i('class')}
			options={classes.map(({ name }) => ({
				label: readable(name),
				value: name
			}))}
			on:userInput={async (e) => {
				classes = await listClasses({
					school: schoolInput,
					query: e.detail
				}).then((d) => d.data);
			}}
			bind:value={classInput}
			threshold={0.1}
		/>

		<PrimaryButton disabled={!(classInput && schoolInput)}>
			<Store store={i('join.joinClass')} />
		</PrimaryButton>
	{:else}
		You need to be logged in to join a class
		<div class="text-center">
			<a href="/login">Go to login</a>
		</div>
	{/if}
</div>

<script lang="ts">
	import { i } from '$lib/i18n/store';
	import { AcademicCap } from 'svelte-hero-icons';
	import { readable } from 'svelte/store';
	import Select from '$lib/components/select/Select.svelte';
	import { listClasses, type Class } from '$lib/dlool/classList';

	export let school: string | null;
	export let selectedClass: string | null = null;

	export let threshold = 0.1;
	export let filter: (c: Class) => boolean = () => true;

	let classBucket: Class[] = [];
</script>

<Select
	{threshold}
	icon={AcademicCap}
	placeholder={i('class')}
	options={classBucket.map(({ name }) => ({
		label: readable(name),
		value: name
	}))}
	bind:firstValue={selectedClass}
	on:userInput={async (e) => {
		if (school) {
			classBucket = await listClasses({
				school: school,
				query: e.detail
			}).then((d) => {
				return d.data.filter(filter);
			});
		} else {
			classBucket = [];
		}
	}}
/>

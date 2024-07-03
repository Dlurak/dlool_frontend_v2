<script lang="ts">
	import { listSchools } from '$lib/dlool/schoolList';
	import { i } from '$lib/i18n/store';
	import { BuildingLibrary } from 'svelte-hero-icons';
	import { readable } from 'svelte/store';
	import type { School } from '$lib/dlool/schoolList';
	import Select from '$lib/components/select/Select.svelte';

	export let school: string | null = null;
	export let threshold = 0.25;

	let schoolBucket: School[] = [];

	listSchools({ query: '' }).then(({ data }) => (schoolBucket = data));
</script>

<Select
	{threshold}
	icon={BuildingLibrary}
	placeholder={i('school')}
	userInput={school ?? ''}
	value={school ? [school] : null}
	options={schoolBucket.map(({ name }) => ({
		label: readable(name),
		value: name
	}))}
	bind:firstValue={school}
	on:userInput={async (e) => {
		schoolBucket = await listSchools({
			query: e.detail
		}).then((d) => d.data);
	}}
/>

<script lang="ts">
	import { i } from '$lib/i18n/store';
	import Store from '$lib/components/utils/Store.svelte';
	import { createEventDispatcher } from 'svelte';
	import TimeRange from './TimeRange.svelte';
	import type { CustomDate } from '$lib/utils/dates/custom';
	import SchoolAndClass from '$lib/components/filter/SchoolAndClass.svelte';

	type Query<S> = {
		school: S;
		classes: string[];
		dueStart: CustomDate | null;
		dueEnd: CustomDate | null;

		fromStart: CustomDate | null;
		fromEnd: CustomDate | null;
	};

	export let query: Query<string | null>;

	let dueStart: CustomDate | null = null;
	let dueEnd: CustomDate | null = null;

	let fromStart: CustomDate | null = null;
	let fromEnd: CustomDate | null = null;

	const dispatch = createEventDispatcher<{ filterApply: Query<string> }>();
</script>

<div class="flex flex-col gap-3">
	<SchoolAndClass
		{query}
		on:change={({ detail }) => {
			dispatch('filterApply', {
				classes: detail.classes,
				school: detail.school,
				dueStart,
				dueEnd,
				fromStart,
				fromEnd
			});
		}}
	>
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
	</SchoolAndClass>
</div>

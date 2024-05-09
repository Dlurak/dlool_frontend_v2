<script lang="ts">
	import { i } from '$lib/i18n/store';
	import { type Class } from '$lib/dlool/classList';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { createEventDispatcher } from 'svelte';
	import Collapseable from '$lib/components/utils/Collapseable.svelte';
	import TimeRange from './TimeRange.svelte';
	import type { CustomDate } from '$lib/utils/dates/custom';
	import School from '$lib/components/input/School.svelte';
	import Classes from '$lib/components/input/Classes.svelte';

	type Query<S> = {
		school: S;
		classes: string[];
		dueStart: CustomDate | null;
		dueEnd: CustomDate | null;

		fromStart: CustomDate | null;
		fromEnd: CustomDate | null;
	};

	export let query: Query<string | null>;

	let school = query.school;

	let classes = query.classes;

	let dueStart: CustomDate | null = null;
	let dueEnd: CustomDate | null = null;

	let fromStart: CustomDate | null = null;
	let fromEnd: CustomDate | null = null;

	const dispatch = createEventDispatcher<{ filterApply: Query<string> }>();
</script>

<Collapseable id="homework-filter">
	<h3 class="pb-3 pt-2" slot="heading">Filters</h3>

	<div class="flex flex-col gap-3" slot="content">
		<School bind:school />
		<Classes {school} bind:classes />

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
			disabled={classes.length === 0 || school === null}
			on:click={() => {
				dispatch('filterApply', {
					classes: classes,
					school: school ?? '',
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

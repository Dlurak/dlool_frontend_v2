<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { getDaysInMonth, getPaddingDays } from '$lib/utils/dates/calendar';
	import { normalToCustomDate, type CustomDate } from '$lib/utils/dates/custom';
	import { svocal } from '$lib/utils/store/svocal';
	import { createEventDispatcher } from 'svelte';
	import CalHeader from './CalHeader.svelte';

	export let displayMonth: Date;
	export let earliest: CustomDate | null;
	export let latest: CustomDate | null;

	$: isEarliestMonth =
		earliest?.year === displayMonth.getFullYear() &&
		earliest?.month === displayMonth.getMonth() + 1;

	$: isLatestMonth =
		latest?.year === displayMonth.getFullYear() && latest?.month === displayMonth.getMonth() + 1;

	const weekStartsOn = svocal('settings.weekStartsOn');

	const dispatch = createEventDispatcher<{
		change: {
			date: Date;
			customDate: CustomDate;
		};
	}>();
</script>

<CalHeader
	{displayMonth}
	disableLeft={isEarliestMonth}
	disableRight={isLatestMonth}
	on:prev={() => {
		displayMonth.setMonth(displayMonth.getMonth() - 1);
		displayMonth = displayMonth;
	}}
	on:next={() => {
		displayMonth.setMonth(displayMonth.getMonth() + 1);
		displayMonth = displayMonth;
	}}
/>

<div class="grid grid-cols-7">
	{#each { length: 7 } as _, ind}
		<b class="text-center">
			<Store store={i('calendar.weekday.abbr', {}, { count: (ind + $weekStartsOn) % 7 })} />
		</b>
	{/each}

	<div class="col-span-7 flex items-center py-1">
		<hr class="w-full border-zinc-200 dark:border-zinc-800" />
	</div>

	{#each { length: getPaddingDays(displayMonth, $weekStartsOn) } as _}
		<span />
	{/each}
	{#each { length: getDaysInMonth(displayMonth) } as _, ind}
		{@const isTooEarly = isEarliestMonth && (earliest?.day ?? Infinity) >= ind + 2}
		{@const isTooLate = isLatestMonth && (latest?.day ?? -Infinity) <= ind + 1}

		<button
			class="
					flex aspect-square items-center justify-center rounded-sm p-1.5
					hover:bg-zinc-200 focus:bg-zinc-200
					disabled:opacity-50
					dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
				"
			disabled={isTooEarly || isTooLate}
			on:click={() => {
				displayMonth.setDate(ind + 1);

				dispatch('change', {
					date: new Date(displayMonth),
					customDate: normalToCustomDate(displayMonth)
				});
			}}
		>
			{ind + 1}
		</button>
	{/each}
</div>

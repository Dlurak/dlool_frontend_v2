<script lang="ts">
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import type { Calendar } from '$lib/dlool/calendar/list';
	import { i } from '$lib/i18n/store';
	import { getDaysInMonth, getPaddingDays } from '$lib/utils/dates/calendar';
	import { svocal } from '$lib/utils/store/svocal';
	import { mediaQuery } from 'nutzlich';
	import Store from '$lib/components/utils/Store.svelte';
	import Header from './Header.svelte';
	import EventPreview from './EventPreview.svelte';

	const weekStartsOn = svocal('settings.weekStartsOn');
	const isSmall = mediaQuery('(max-width: 768px)');

	let displayMonth = new Date();

	export let events: Calendar[];
</script>

<Header
	{displayMonth}
	on:prev={() => {
		displayMonth.setMonth(displayMonth.getMonth() - 1);
		displayMonth = displayMonth;
	}}
	on:next={() => {
		displayMonth.setMonth(displayMonth.getMonth() + 1);
		displayMonth = displayMonth;
	}}
/>

<div class="grid w-full border-collapse grid-cols-7">
	{#each { length: 7 } as _, ind}
		<b class="pb-2 text-center">
			<Store
				store={i(
					$isSmall ? 'calendar.weekday.abbr' : 'calendar.weekday',
					{},
					{ count: (ind + $weekStartsOn) % 7 }
				)}
			/>
		</b>
	{/each}

	{#each { length: getPaddingDays(displayMonth, $weekStartsOn) } as _}
		<span />
	{/each}

	{#each { length: getDaysInMonth(displayMonth) } as _, ind}
		{@const date = {
			year: displayMonth.getFullYear(),
			month: displayMonth.getMonth() + 1,
			day: ind + 1
		}}
		{@const todaysEvents = events.filter(({ beginning }) => deepEqual(beginning, date))}

		<div class="border border-solid dark:border-white">
			<div>
				<span class="flex h-6 w-6 items-center justify-center rounded-full p-1.5">
					{ind + 1}
				</span>
			</div>

			<div class="flex min-h-4 flex-wrap gap-2 p-2 @container">
				{#each todaysEvents as ev}
					<EventPreview event={ev} />
				{/each}
			</div>
		</div>
	{/each}
</div>

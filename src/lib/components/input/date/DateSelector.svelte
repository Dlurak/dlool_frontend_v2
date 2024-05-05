<script lang="ts">
	import {
		stringify,
		currentCustomDate,
		normalToCustomDate,
		customDateToNormal,
		type CustomDate
	} from '$lib/utils/dates/custom';
	import { i } from '$lib/i18n/store';
	import { getDaysInMonth, getPaddingDays } from '$lib/utils/dates/calendar';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { offset, flip, shift } from '@floating-ui/core';
	import { createEventDispatcher } from 'svelte';
	import { useToggle } from 'nutzlich';
	import { Icon, CalendarDays, ChevronLeft, ChevronRight } from 'svelte-hero-icons';
	import Frame from '../Frame.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';

	export let date: CustomDate | null = currentCustomDate();
	export let normalDate = date && customDateToNormal(date);
	export let icon = CalendarDays;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(4), flip(), shift()]
	});

	const show = useToggle(false);

	interface EventDetails {
		date: Date;
		customDate: CustomDate;
	}

	const dispatch = createEventDispatcher<{ change: EventDetails }>();

	$: displayMonth = normalDate ?? new Date();
</script>

<svelte:window
	on:keyup={({ key }) => {
		if (key == 'Escape') show.set(false);
	}}
/>

<Frame>
	<button class="flex w-full items-stretch gap-1" use:floatingRef on:click={() => show.toggle()}>
		<Icon src={icon} mini class="h-6 w-6" />

		<div class="px-1">
			<slot name="postIcon" />
		</div>

		<div class="w-0.5 py-0.5">
			<div class="h-full w-full bg-zinc-200 dark:bg-zinc-800" />
		</div>

		<span>
			{#if date}
				{stringify(date)}
			{:else}
				<Store store={i('calendar.select')} />
			{/if}
		</span>
	</button>
</Frame>

{#if $show}
	<div class="z-10 px-2 py-2" use:floatingContent>
		<div class="rounded bg-zinc-300 px-2 py-2 dark:bg-zinc-700">
			<div class="flex items-center justify-between gap-2">
				<QuickAction
					icon={ChevronLeft}
					on:click={() => {
						displayMonth.setMonth(displayMonth.getMonth() - 1);
						displayMonth = displayMonth;
					}}
				/>
				<span class="text-nowrap">
					<Store
						store={i(
							'calendar.month',
							{ year: `${displayMonth.getFullYear()}` },
							{ count: displayMonth.getMonth() }
						)}
					/>
				</span>
				<QuickAction
					icon={ChevronRight}
					on:click={() => {
						displayMonth.setMonth(displayMonth.getMonth() + 1);
						displayMonth = displayMonth;
					}}
				/>
			</div>

			<div class="grid grid-cols-7">
				{#each { length: 7 } as _, ind}
					<b class="text-center">
						<Store store={i('calendar.weekday.abbr', {}, { count: ind })} />
					</b>
				{/each}
				<div class="col-span-7 flex items-center py-1">
					<hr class="w-full border-zinc-200 dark:border-zinc-800" />
				</div>
				{#each { length: getPaddingDays(displayMonth, 1) } as _}
					<span />
				{/each}
				{#each { length: getDaysInMonth(displayMonth) } as _, ind}
					<button
						class="
							flex aspect-square items-center justify-center rounded-sm p-1.5
							hover:bg-zinc-200 focus:bg-zinc-200
							dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
						"
						on:click={() => {
							displayMonth.setDate(ind + 1);
							normalDate = new Date(displayMonth);
							date = normalToCustomDate(normalDate);
							show.set(false);

							dispatch('change', {
								date: normalDate,
								customDate: date
							});
						}}
					>
						{ind + 1}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

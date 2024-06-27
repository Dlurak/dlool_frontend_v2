<script lang="ts">
	import {
		stringify,
		currentCustomDate,
		customDateToNormal,
		normalToCustomDate,
		type CustomDate,
	} from '$lib/utils/dates/custom';
	import { i } from '$lib/i18n/store';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { offset, flip, shift } from '@floating-ui/core';
	import { createEventDispatcher } from 'svelte';
	import { useToggle, clickOutside } from 'nutzlich';
	import { Icon, CalendarDays } from 'svelte-hero-icons';
	import Frame from '../Frame.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import Cal from './Cal.svelte';

	export let date: CustomDate | null = currentCustomDate();
	export let normalDate = date && customDateToNormal(date);
	export let icon = CalendarDays;

	export let earliest: CustomDate | null = null;
	export let latest: CustomDate | null = null;

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
</script>

<svelte:window
	on:keyup={({ key }) => {
		if (key == 'Escape') show.set(false);
	}}
/>

<Frame>
	<button class="flex w-full items-stretch gap-1" use:floatingRef on:click={() => show.toggle()}>
		<span class="flex items-center">
			<Icon src={icon} mini class="h-6 w-6" />
		</span>

		<div class="flex items-center px-1">
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
	<div
		class="z-10 px-2 py-2"
		use:floatingContent
		use:clickOutside={{
			callback: () => show.set(false)
		}}
	>
		<Cal
			{earliest}
			{latest}
			displayMonth={new Date(normalDate ?? new Date())}
			on:change={({ detail }) => {
				normalDate = new Date(detail.date);
				date = normalToCustomDate(normalDate);
				show.set(false);

				dispatch('change', detail);
			}}
			on:close={show.toggle}
		/>
	</div>
{/if}

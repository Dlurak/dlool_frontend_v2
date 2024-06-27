<script lang="ts">
	import {
		stringify,
		currentCustomDate,
		type CustomDate,
		type CustomDateTime
	} from '$lib/utils/dates/custom';
	import { i } from '$lib/i18n/store';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { offset, flip, shift } from '@floating-ui/core';
	import { useToggle } from 'nutzlich';
	import { Icon, CalendarDays, XMark } from 'svelte-hero-icons';
	import Frame from '../../Frame.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import DateTimeInner from './DateTimeInner.svelte';
	import { createEventDispatcher } from 'svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';

	export let date: CustomDateTime | null = currentCustomDate();

	export let icon = CalendarDays;

	export let showResetButton = false;

	export let earliest: CustomDate | null = null;
	export let latest: CustomDate | null = null;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(4), flip(), shift()]
	});

	const show = useToggle(false);

	const dispatch = createEventDispatcher<{
		change: {
			custom: CustomDateTime;
			normal: Date;
		};
	}>();
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

		<span class="flex items-center">
			{#if date}
				{stringify(date, { includeTime: true })}
			{:else}
				<Store store={i('calendar.select')} />
			{/if}
		</span>
	</button>
	{#if showResetButton}
		<QuickAction
			icon={XMark}
			on:click={() => {
				date = null;
			}}
		/>
	{/if}
</Frame>

{#if $show}
	<div class="z-10 px-2 py-2" use:floatingContent>
		<DateTimeInner
			{earliest}
			{latest}
			on:change={({ detail }) => {
				show.set(false);
				date = detail.custom;
				dispatch('change', detail);
			}}
			on:close={show.toggle}
		/>
	</div>
{/if}

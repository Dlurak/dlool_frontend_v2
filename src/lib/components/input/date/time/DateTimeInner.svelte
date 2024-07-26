<script lang="ts">
	import {
		currentCustomDate,
		customDateToNormal,
		normalToCustomDate,
		type CustomDate,
		type CustomDateTime,
		type CustomTime
	} from '$lib/utils/dates/custom';
	import { createEventDispatcher } from 'svelte';
	import CalFrame from '../CalFrame.svelte';
	import CalInner from '../CalInner.svelte';
	import TimeInput from './TimeInput.svelte';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';

	export let displayMonth: Date = new Date();
	export let earliest: CustomDate | null = null;
	export let latest: CustomDate | null = null;

	export let time: CustomTime | null = {
		hour: currentCustomDate().hour,
		min: currentCustomDate().min
	};
	let date: CustomDate | null = null;

	const dispatch = createEventDispatcher<{
		change: {
			custom: CustomDateTime;
			normal: Date;
		};
		close: null;
	}>();

	const dispatchChange = (date: CustomDate, time: CustomTime) => {
		const customDateTime: CustomDateTime = { ...date, ...time };

		dispatch('change', {
			custom: customDateTime,
			normal: customDateToNormal(customDateTime)
		});
	};

	$: if (date && time) {
		dispatchChange(date, time);
	}
</script>

<CalFrame on:close>
	<CalInner
		{displayMonth}
		{earliest}
		{latest}
		on:change={({ detail }) => {
			date = detail.customDate;
		}}
	/>

	<div class="col-span-7 flex items-center py-1">
		<hr class="w-full border-zinc-200 dark:border-zinc-800" />
	</div>

	<div class="flex items-center justify-between">
		<span class="w-full">
			<TimeInput
				hour={time?.hour}
				min={time?.min}
				on:change={({ detail }) => {
					const { hour, min } = detail;

					if (hour === null || min === null) {
						time = null;
						return;
					}

					time = { hour, min };
				}}
			/>
		</span>

		<SettingsButton
			on:click={() => {
				const { min, hour, day, month, year } = normalToCustomDate(new Date());

				time = time ?? { min, hour };
				date = date ?? { day, month, year };
			}}
		>
			Ok
		</SettingsButton>
	</div>
</CalFrame>

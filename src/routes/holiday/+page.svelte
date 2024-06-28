<script context="module" lang="ts">
	async function gotoDate(date: Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const monthStr = month.toString().padStart(2, '0');

		await goto(`/holiday?date=${year}-${monthStr}`);
		invalidateAll();
	}
</script>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import LocationLine from '$lib/components/holiday/LocationLine.svelte';
	import HolidayBox from '$lib/components/holiday/HolidayBox.svelte';
	import Header from '$lib/components/holiday/Header.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';

	export let data: PageData;

	$: {
		if (data.type === 'error' && browser) {
			gotoDate(new Date());
		}
	}
</script>

<MetaData title={i('title.holiday')} />

{#if data.type === 'success'}
	<div class="flex w-full flex-col gap-2">
		<Header
			date={data.startDate}
			on:change={async ({ detail: { year, month } }) => {
				await goto(`/holiday?date=${year}-${month}`);
				invalidateAll();
			}}
		/>

		<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-2">
			{#each data.holidays as holiday}
				<HolidayBox {holiday} country={data.location.apiCountry?.isoCode} />
			{/each}
		</div>

		{#if data.holidays.length === 0}
			<span><Store store={i('holiday.noData')} /></span>
		{/if}

		<div class="w-full">
			<LocationLine country={data.location.apiCountry} state={data.location.apiSubdivision} />
		</div>
	</div>
{/if}

<script context="module" lang="ts">
	async function gotoDate(date: Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const monthStr = month.toString().padStart(2, '0');

		await goto(`/holiday?date=${year}-${monthStr}`);
		invalidateAll();
	}

	function addMonths(summand: number, startDate: Date) {
		return new Date(startDate.getFullYear(), startDate.getMonth() + summand, startDate.getDate());
	}
</script>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { ChevronLeft, ChevronRight, Icon, MapPin } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import { currentLang } from '$lib/stores';
	import { hasSameTimestamp } from '$lib/utils/dates/difference';
	import { browser } from '$app/environment';

	export let data: PageData;

	$: {
		if (data.type === 'error' && browser) {
			gotoDate(new Date());
		}
	}
</script>

{#if data.type === 'success'}
	<div class="flex w-full flex-col gap-2">
		<div class="flex w-full justify-evenly">
			<QuickAction
				icon={ChevronLeft}
				on:click={() => {
					gotoDate(addMonths(-1, data.startDate));
				}}
			/>

			<h3>
				<Store
					store={i(
						'calendar.month',
						{ year: `${data.startDate.getFullYear()}` },
						{ count: data.startDate.getMonth() }
					)}
				/>
			</h3>

			<QuickAction
				icon={ChevronRight}
				on:click={() => {
					gotoDate(addMonths(1, data.startDate));
				}}
			/>
		</div>

		<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-2">
			{#each data.holidays as holiday}
				{@const name = (
					holiday.name.find(({ language }) => language === $currentLang.toUpperCase()) ??
					holiday.name.find(({ language }) => language === 'EN')
				)?.text}
				{@const comment = (
					(holiday.comment ?? []).find(({ language }) => language === $currentLang.toUpperCase()) ??
					(holiday.comment ?? []).find(({ language }) => language === 'EN')
				)?.text}

				<div
					class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
				>
					<h4>{name}</h4>

					{#if hasSameTimestamp(holiday.startDate, holiday.endDate)}
						<Store
							store={i(
								'holiday.date',
								{
									date: holiday.startDate.toLocaleDateString($currentLang)
								},
								{}
							)}
						/>
					{:else}
						<Store
							store={i(
								'holiday.timeRange',
								{
									start: holiday.startDate.toLocaleDateString($currentLang),
									end: holiday.endDate.toLocaleDateString($currentLang)
								},
								{}
							)}
						/>
					{/if}

					{#if comment}
						{comment}
					{/if}

					{#if holiday.quality === 'Mandatory'}
						<Store store={i('holiday.quality.mandatory')} />
					{:else if holiday.quality === 'Optional'}
						<Store store={i('holiday.quality.optional')} />
					{/if}

					<div class="flex items-center gap-1">
						<Icon src={MapPin} class="h-5 w-5" mini />

						{#if holiday.nationwide}
							<Store store={i('holiday.nationwide.true')} />
						{:else}
							<Store store={i('holiday.nationwide.false')} />
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if data.holidays.length === 0}
			<span><Store store={i('holiday.noData')} /></span>
		{/if}

		<div class="w-full">
			<!-- TODO: extract that mess into the load function and use the api for the -->
			{#if data.location.state === 'DE-BB'}
				<Store store={i('holiday.location.brandenburg')} />
			{:else if data.location.state === 'DE-BE'}
				<Store store={i('holiday.location.berlin')} />
			{:else if data.location.state === 'DE-BW'}
				<Store store={i('holiday.location.baden-wuerttemberg')} />
			{:else if data.location.state === 'DE-BY'}
				<Store store={i('holiday.location.bavaria')} />
			{:else if data.location.state === 'DE-HB'}
				<Store store={i('holiday.location.bremen')} />
			{:else if data.location.state === 'DE-HE'}
				<Store store={i('holiday.location.hesse')} />
			{:else if data.location.state === 'DE-HH'}
				<Store store={i('holiday.location.hamburg')} />
			{:else if data.location.state === 'DE-MV'}
				<Store store={i('holiday.location.mecklenburg-vorpommern')} />
			{:else if data.location.state === 'DE-NI'}
				<Store store={i('holiday.location.lower-saxony')} />
			{:else if data.location.state === 'DE-NW'}
				<Store store={i('holiday.location.northrhine-westfalia')} />
			{:else if data.location.state === 'DE-RP'}
				<Store store={i('holiday.location.rhineland')} />
			{:else if data.location.state === 'DE-SH'}
				<Store store={i('holiday.location.schleswig-holstein')} />
			{:else if data.location.state === 'DE-SL'}
				<Store store={i('holiday.location.saarland')} />
			{:else if data.location.state === 'DE-SN'}
				<Store store={i('holiday.location.saxony')} />
			{:else if data.location.state === 'DE-ST'}
				<Store store={i('holiday.location.saxony-anhalt')} />
			{:else if data.location.state === 'DE-TH'}
				<Store store={i('holiday.location.thuringia')} />
			{:else if data.location.state}
				<span>{data.location.state}</span>
			{:else}
				<span>{data.location.state}, {data.location.country}</span>
			{/if}
		</div>
	</div>
{/if}

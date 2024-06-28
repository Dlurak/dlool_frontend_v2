<script context="module" lang="ts">
	type NameEntry = {
		language: string;
		text: string;
	};

	function getPrefferedString(entries: NameEntry[], prefferedLocale: string) {
		const desired = entries.find(({ language }) => language === prefferedLocale.toUpperCase());
		const english = entries.find(({ language }) => language === 'EN');

		const obj = desired ?? english;
		if (!obj) return undefined;

		return obj.text;
	}

	function nationwideLocalizer(country: string) {
		switch (country.toLowerCase()) {
			case 'de':
				return '.germany';
			default:
				return '';
		}
	}
</script>

<script lang="ts">
	import { currentLang } from '$lib/stores';

	import { Holiday } from 'open-holiday-js';
	import Store from '../utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { Icon, MapPin } from 'svelte-hero-icons';
	import { hasSameTimestamp } from '$lib/utils/dates/difference';
	import { fmtNum } from '$lib/utils/intl';

	type HolidayEvent = Awaited<ReturnType<Holiday['getSchoolHolidays']>>[number];

	export let holiday: HolidayEvent;
	export let country: string | undefined;

	$: name = getPrefferedString(holiday.name, $currentLang);
	$: comment = getPrefferedString(holiday.comment ?? [], $currentLang);
	$: inDays = Math.ceil(
		(holiday.startDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1_000)
	);
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<h4>{name}</h4>

	{#if hasSameTimestamp(holiday.startDate, holiday.endDate)}
		<Store
			store={i(
				'holiday.date',
				{ date: holiday.startDate.toLocaleDateString($currentLang) },
				{ count: holiday.startDate.getDay() }
			)}
		/>
	{:else}
		<Store
			store={i('holiday.timeRange', {
				start: holiday.startDate.toLocaleDateString($currentLang),
				end: holiday.endDate.toLocaleDateString($currentLang)
			})}
		/>
	{/if}

	<span>
		{#if inDays === 0}
			<Store store={i('holiday.today')} />
		{:else if inDays > 0}
			<Store store={i('holiday.inDays', { days: fmtNum(inDays) }, { count: inDays })} />
		{:else}
			<Store store={i('holiday.daysAgo', { days: fmtNum(inDays * -1) }, { count: inDays })} />
		{/if}
	</span>

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
			<Store store={i(`holiday.nationwide.true${nationwideLocalizer(country ?? '')}`)} />
		{:else}
			<Store store={i(`holiday.nationwide.false${nationwideLocalizer(country ?? '')}`)} />
		{/if}
	</div>
</div>

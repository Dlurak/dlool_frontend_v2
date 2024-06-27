<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import SidePanel from '$lib/components/calendar/SidePanel/SidePanel.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import { objToQueryParams } from '$lib/utils/url/query';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Calendar from '$lib/components/calendar/Calendar/Calendar.svelte';
	import List from '$lib/components/calendar/List/List.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Tabbar from '$lib/components/tabs/Tabbar.svelte';
	import type { PageData } from './$types';
	import { i } from '$lib/i18n/store';

	export let data: PageData;

	let currentView: 'calendar' | 'list' = 'calendar';
</script>

<MetaData title={i('title.calendar')} />

<Panes>
	<div slot="a">
		<SidePanel
			query={data.query ?? {
				school: null,
				classes: [],
				limit: 1,
				offset: 0
			}}
			totalCount={data.data?.then(({ data }) => data.totalCount)}
			on:change={async ({ detail }) => {
				await goto(`?${objToQueryParams(detail)}`);
				invalidateAll();
			}}
		/>
	</div>

	<div slot="b" class="flex h-full w-full flex-col items-center justify-center gap-2">
		{#if data.data}
			<Tabbar>
				<Tab value="list" bind:active={currentView}>List</Tab>
				<Tab value="calendar" bind:active={currentView}>Calendar</Tab>
			</Tabbar>

			<div class="h-full w-full">
				{#await data.data.then((d) => d.data) then data}
					{#if currentView === 'calendar'}
						<Calendar events={data.calendar} />
					{:else if currentView === 'list'}
						<List events={data.calendar} />
					{/if}
				{/await}
			</div>
		{:else if data.msg === 'missing school and class'}
			<span>Specify a class and school</span>
		{/if}
	</div>
</Panes>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Calendar from '$lib/components/calendar/Calendar/Calendar.svelte';
	import List from '$lib/components/calendar/List/List.svelte';
	import SidePanel from '$lib/components/calendar/SidePanel/SidePanel.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Tabbar from '$lib/components/tabs/Tabbar.svelte';
	import { objToQueryParams } from '$lib/utils/url/query';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentView: 'calendar' | 'list' = 'calendar';
</script>

<Panes>
	<div slot="a">
		<SidePanel
			query={data.query ?? {
				school: null,
				classes: []
			}}
			on:change={async ({ detail }) => {
				await goto(`?${objToQueryParams(detail)}`);
				invalidateAll();
			}}
		/>
	</div>

	<div slot="b" class="flex w-full flex-col items-center justify-center gap-2">
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

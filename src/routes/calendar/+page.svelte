<script lang="ts">
	import Calendar from '$lib/components/calendar/Calendar/Calendar.svelte';
	import List from '$lib/components/calendar/List/List.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Tabbar from '$lib/components/tabs/Tabbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentView: 'calendar' | 'list' = 'calendar';
</script>

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

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Calendar from '$lib/components/calendar/Calendar/Calendar.svelte';
	import SidePanel from '$lib/components/calendar/SidePanel/SidePanel.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import { objToQueryParams } from '$lib/utils/url/query';
	import type { PageData } from './$types';

	export let data: PageData;
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

	<div slot="b" class="flex w-full items-center justify-center">
		{#if data.data}
			<div class="h-full w-full">
				{#await data.data.then((d) => d.data) then data}
					<Calendar events={data.calendar} />
				{/await}
			</div>
		{:else if data.msg === 'missing school and class'}
			<span>Specify a class and school</span>
		{/if}
	</div>
</Panes>

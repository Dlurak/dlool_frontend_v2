<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Calendar } from '$lib/dlool/calendar/list';
	import { i } from '$lib/i18n/store';
	import { stringify } from '$lib/utils/dates/custom';
	import { groupBy } from '$lib/utils/objects/group';
	import CalEventListBox from './CalEventListBox.svelte';

	export let events: Calendar[];
	$: grouped = Object.values(groupBy(events, ({ beginning }) => stringify(beginning)));
</script>

{#each grouped as day, index}
	<h3 class="leading-loose">{stringify(day[0].beginning)}</h3>

	<div class="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
		{#each day as event}
			<CalEventListBox {event} />
		{/each}
	</div>

	{#if index !== grouped.length - 1}
		<div class="flex items-center py-2">
			<hr class="w-full border-zinc-300 dark:border-zinc-700" />
		</div>
	{/if}
{:else}
	<div class="flex h-full justify-center items-center">
		<Store store={i('calendar.noData')} />
	</div>
{/each}

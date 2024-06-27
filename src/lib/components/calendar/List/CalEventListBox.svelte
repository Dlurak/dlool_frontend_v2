<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { page } from '$app/stores';
	import type { Calendar } from '$lib/dlool/calendar/list';
	import { i } from '$lib/i18n/store';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, MapPin } from 'svelte-hero-icons';
	import Updates from '$lib/components/utils/Updates.svelte';

	export let event: Calendar;

	$: startString = stringify(event.beginning, {
		includeTime: true,
		includeDate: false
	});
</script>

<a
	href={`/calendar/${event.id}${$page.url.search}`}
	class="
		flex flex-col gap-2 rounded px-2 py-1 text-black outline outline-2 outline-zinc-300
		dark:text-white dark:outline-zinc-700
	"
>
	<h4>{event.title}</h4>

	<div class="grid grid-cols-2">
		<span>
			{#if event.ending}
				<Store
					store={i('calendar.timeRange.withEnd', {
						start: startString,
						end: stringify(event.ending, {
							includeTime: true,
							includeDate: false
						})
					})}
				/>
			{:else}
				<Store
					store={i('calendar.timeRange.withoutEnd', {
						start: startString
					})}
				/>
			{/if}
		</span>

		{#if event.location}
			<span class="flex items-center gap-1">
				<Icon src={MapPin} class="h-5 w-5" mini />
				{event.location}
			</span>
		{/if}

		{#if event.priority}
			<span>
				<Store store={i(`calendar.priority.${event.priority}`)} />
			</span>
		{/if}
	</div>

	{#if event.summary}
		<span>
			{event.summary}
		</span>
	{/if}

	<Updates updates={event.updates} />
</a>

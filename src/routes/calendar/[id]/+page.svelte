<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, MapPin } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col gap-2">
	{#if data.data}
		{@const event = data.data}
		{@const startsString = stringify(event.beginning, {
			includeTime: true,
			includeDate: false
		})}

		<h3 class="border-b border-zinc-300 leading-loose dark:border-zinc-700">{event.title}</h3>

		<div class="grid grid-cols-2">
			<span>
				{#if event.ending}
					<Store
						store={i('calendar.timeRange.withEnd', {
							start: startsString,
							end: stringify(event.ending, {
								includeTime: true,
								includeDate: false
							})
						})}
					/>
				{:else}
					<Store
						store={i('calendar.timeRange.withoutEnd', {
							start: startsString
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
	{/if}
</div>

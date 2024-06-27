<script lang="ts">
	import { confirm } from '$lib/components/layout/confirmation';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, MapPin, Pencil, Trash } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import { useAuth } from '$lib/utils/store/auth';
	import { derived, writable } from 'svelte/store';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteCalendar } from '$lib/dlool/calendar/delete';
	import EditModal from '$lib/components/calendar/List/EditModal.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Updates from '$lib/components/utils/Updates.svelte';

	export let data: PageData;

	let showEditModal = false;

	const queryStore = writable({
		school: data.data?.class.school.name ?? '',
		classes: data.data?.class.name ? [data.data?.class.name] : []
	});

	const { isInClass, isLoggedIn } = useAuth({
		query: queryStore
	});

	const hasEditRights = derived([isInClass, isLoggedIn], ([a, b]) => a && b);

	$: queryStore.set({
		school: data.data?.class.school.name ?? '',
		classes: data.data?.class.name ? [data.data?.class.name] : []
	});
</script>

<MetaData title={i('title.calendar')} />

<div class="flex h-full w-full flex-col gap-2">
	{#if data.data}
		{@const event = data.data}
		{@const startsString = stringify(event.beginning, {
			includeTime: true,
			includeDate: false
		})}

		<div class="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-700">
			<h3 class=" leading-loose">{event.title}</h3>
			{#if $hasEditRights}
				<div class="flex gap-2">
					<QuickAction
						icon={Trash}
						color="red"
						small
						on:click={async () => {
							const isConfirmed = await confirm({
								ok: i('calendar.delete.confirm.ok'),
								desc: i('calendar.delete.confirm', { name: event.title })
							});
							if (!isConfirmed) return;

							deleteCalendar(event.id)
								.then(() => {
									sendToast({
										type: 'success',
										content: i('calendar.delete.success'),
										timeout: 5_000
									});
									return goto(`/calendar${$page.url.search}`);
								})
								.catch(sendDefaultErrorToast);
						}}
					/>
					<QuickAction
						icon={Pencil}
						color="blue"
						small
						on:click={() => {
							showEditModal = true;
						}}
					/>
				</div>
			{/if}
		</div>

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

			<Updates updates={event.updates} />
		</div>

		{#if event.summary}
			<span>{event.summary}</span>
		{/if}

		<EditModal bind:showEditModal {event} />
	{/if}
</div>

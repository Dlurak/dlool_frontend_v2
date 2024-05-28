<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { Calendar } from '$lib/dlool/calendar/list';
	import { updateCalendar } from '$lib/dlool/calendar/update';
	import { i } from '$lib/i18n/store';
	import {
		UNIX_TIME_EPOCHE_START,
		customDateToNormal,
		type CustomDateTime
	} from '$lib/utils/dates/custom';
	import { safeMap } from '$lib/utils/null/safeMap';
	import NewInner from '../SidePanel/NewInner.svelte';

	export let showEditModal = false;
	export let event: Calendar;

	const ts = (d: CustomDateTime | null) => {
		return customDateToNormal(d ?? UNIX_TIME_EPOCHE_START).getTime();
	};

	$: beginningIsEarlierThenEnding = event.ending ? ts(event.beginning) < ts(event.ending) : true;

	$: isEnabled = !!event.title && !!event.beginning && beginningIsEarlierThenEnding;
</script>

<Modal bind:isOpen={showEditModal}>
	<div class="flex flex-col gap-2" slot="body">
		<NewInner
			bind:title={event.title}
			bind:beginning={event.beginning}
			bind:ending={event.ending}
			on:summary={({ detail }) => {
				event.summary = detail;
			}}
			on:location={({ detail }) => {
				event.location = detail;
			}}
			bind:priority={event.priority}
		/>

		<hr class="border-zinc-300 dark:border-zinc-700" />

		<PrimaryButton
			disabled={!isEnabled}
			on:click={() => {
				updateCalendar({
					id: event.id,
					title: event.title,
					summary: event.summary ?? undefined,
					beginning: customDateToNormal(event.beginning).getTime(),
					ending:
						safeMap(event.ending, (ending) => customDateToNormal(ending).getTime()) ?? undefined,
					location: event.location ?? undefined,
					priority: event.priority ?? undefined
				})
					.then(() => {
						sendToast({
							type: 'success',
							content: i('calendar.update.success'),
							timeout: 5_000
						});
						invalidateAll();
					})
					.catch(sendDefaultErrorToast);
			}}
		>
			<!-- TODO: i18n -->
			Update
		</PrimaryButton>
	</div>
</Modal>

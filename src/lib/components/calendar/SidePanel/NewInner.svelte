<script lang="ts">
	import { priorities } from '$lib/constants/priorities';
	import { i } from '$lib/i18n/store';
	import Store from '$lib/components/utils/Store.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import TimeSelector from '$lib/components/input/date/time/DateTime.svelte';
	import Collapseable from '$lib/components/utils/Collapseable.svelte';
	import { MapPin } from 'svelte-hero-icons';
	import NotTyppable from '$lib/components/select/NotTyppable.svelte';
	import { capitalize } from '$lib/utils/strings/case';
	import { type CustomDateTime } from '$lib/utils/dates/custom';
	import type { Priority } from '$lib/types/priority';
	import { createEventDispatcher } from 'svelte';
	import type { Tag } from '$lib/components/tags/types';
	import ChooseTag from '$lib/components/tags/ChooseTag.svelte';

	export let className: string | null;
	export let schoolName: string;

	export let title: string = '';
	export let beginning: CustomDateTime | null = null;
	export let ending: CustomDateTime | null = null;
	export let summary = '';
	export let location = '';
	export let priority: Priority | null = null;
	export let tags: Tag[] = [];

	const dispatch = createEventDispatcher<{
		summary: string | null;
		location: string | null;
	}>();
</script>

<h4><Store store={i('calendar.title')} /></h4>
<TextInput placeholder={i('calendar.title.placeholder')} bind:value={title} />

<!-- TODO: i18n -->
<h4>Beginning</h4>
<TimeSelector bind:date={beginning} />

<Collapseable id="create-cal-optional">
	<div slot="heading">
		<!-- TODO: i18n -->
		<h3>Optional but recommended</h3>
	</div>

	<div slot="content" class="flex flex-col gap-3">
		<!-- TODO: i18n -->
		<h4>Ending</h4>
		<TimeSelector showResetButton bind:date={ending} />

		<!-- TODO: i18n -->
		<h4>Location</h4>
		<TextInput
			placeholder={i('calendar.title.placeholder')}
			icon={MapPin}
			bind:value={location}
			on:input={({ detail }) => {
				dispatch('location', detail || null);
			}}
		/>

		<!-- TODO: i18n -->
		<h4>Summary</h4>
		<TextInput
			placeholder={i('calendar.title.placeholder')}
			bind:value={summary}
			on:input={({ detail }) => {
				dispatch('summary', detail || null);
			}}
		/>

		<!-- TODO: i18n -->
		<h4>Priority</h4>
		<NotTyppable
			options={priorities.map((prio) => ({
				// TODO: i18n
				label: i(`note.priority.${prio}`),
				value: capitalize(prio)
			}))}
			bind:value={priority}
		/>

		{#if className}
			<!-- TODO: i18n -->
			<h4>Tags</h4>
			<ChooseTag bind:selected={tags} {className} {schoolName} />
		{/if}
	</div>
</Collapseable>

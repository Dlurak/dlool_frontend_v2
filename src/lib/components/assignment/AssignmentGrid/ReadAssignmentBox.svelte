<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, Clock } from 'svelte-hero-icons';
	import Store from '../../utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { getSubjectIcon } from '$lib/utils/icons/subjectIcons';
	import { svocal } from '$lib/utils/store/svocal';
	import Updates from '$lib/components/utils/Updates.svelte';
	import { mapObject } from '$lib/utils/objects/map';
	import { self } from '$lib/utils/utils';
	import Markdown from '$lib/components/markdown/Markdown.svelte';
	import { derived } from 'svelte/store';
	import { internalSubjectRepresentation } from '$lib/utils/subjects/internal';

	export let assignment: Assignment;
	export let ele: HTMLDivElement | undefined = undefined;
	export let capturing = false;

	$: icon = getSubjectIcon(assignment.subject);

	const colors = svocal('settings.color');
	const internalColors = derived(colors, (c) =>
		mapObject(c, (key) => internalSubjectRepresentation(key), self)
	);

	$: color = $internalColors[internalSubjectRepresentation(assignment.subject)] ?? undefined;
</script>

<div
	class="flex gap-3"
	class:bg-white={capturing}
	class:text-black={capturing}
	class:p-3={capturing}
	bind:this={ele}
>
	{#if color}
		<div class="box-content h-full w-1.5 px-1">
			<div class="h-full w-full rounded bg-[--bg]" style:--bg={color} />
		</div>
	{/if}

	<div class="flex w-full flex-col gap-2">
		<div class="flex items-center gap-2">
			{#if icon}
				<Icon src={icon} class="h-6 w-6" mini />
			{/if}

			<h3>{assignment.subject}</h3>
		</div>

		<Markdown markdown={assignment.description} />

		<hr class="rounded-full border-zinc-300 dark:border-zinc-600" />

		<div class="flex items-center gap-1 text-sm">
			<Icon src={Clock} class="h-4 w-4" micro />
			<Store
				store={i('assignments.assignment.date', {
					start: stringify(assignment.from, { weekday: 'short' }),
					end: stringify(assignment.due, { weekday: 'short' })
				})}
			/>
		</div>

		<div class="text-sm">
			<Updates updates={assignment.updates} />
		</div>
	</div>
</div>

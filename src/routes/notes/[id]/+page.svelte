<script lang="ts">
	import type { PageData } from './$types';
	import { AcademicCap, BuildingLibrary, Icon } from 'svelte-hero-icons';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import Actions from '$lib/components/notes/specific/Actions.svelte';
	import TagLabel from '$lib/components/tags/TagLabel.svelte';
	import { sortByPredicate } from '$lib/utils/arrays/sort';
	import Updates from '$lib/components/utils/Updates.svelte';

	export let data: PageData;
</script>

{#if data.data}
	{@const note = data.data.data}

	<div class="flex items-center justify-between">
		<h2>{note.title}</h2>

		<Actions
			{note}
			id={$page.params.id}
			on:update={() => {
				invalidateAll();
			}}
			on:delete={() => {
				goto(`/notes${$page.url.search}`);
			}}
		/>
	</div>

	<div class="flex flex-wrap gap-1 py-1 empty:hidden">
		{#each sortByPredicate(note.tags, ({ tag }) => tag) as tag (tag.tag)}
			<TagLabel {tag} />
		{/each}
	</div>

	{#if note.summary}
		<p>{note.summary}</p>
	{:else}
		<p class="italic text-gray-600 dark:text-gray-400">No summary provided</p>
	{/if}

	<div class="flex flex-col gap-2 pt-4 text-sm text-gray-600 dark:text-gray-400">
		<div>
			<span class="flex items-center gap-1">
				<Icon src={BuildingLibrary} class="h-5 w-5" mini />
				{note.class.school.name}
			</span>

			<span class="flex items-center gap-1">
				<Icon src={AcademicCap} class="h-5 w-5" mini />
				{note.class.name}
			</span>
		</div>

		<Updates updates={note.updates} />
	</div>
{/if}

<script lang="ts">
	import type { Note } from '$lib/dlool/notes/list';
	import { page } from '$app/stores';
	import TagLabel from '../tags/TagLabel.svelte';
	import { sortByPredicate } from '$lib/utils/arrays/sort';
	import { svocal } from '$lib/utils/store/svocal';
	import { slide } from 'svelte/transition';
	import { animationLength } from '$lib/utils/store/animation';

	export let note: Note & { id: string };

	const tagsInOverview = svocal('settings.tagsInOverview');
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<a
		href={`/notes/${note.id}${$page.url.search}`}
		class="flex flex-col gap-2 text-black dark:text-white"
	>
		<h3>{note.title}</h3>

		{#if $tagsInOverview}
			<div
				class="flex flex-wrap gap-1 py-1 text-sm empty:hidden"
				transition:slide={{ duration: $animationLength }}
			>
				{#each sortByPredicate(note.tags, ({ tag }) => tag) as tag (tag.tag)}
					<TagLabel {tag} />
				{/each}
			</div>
		{/if}

		{#if note.summary}
			<p>{note.summary}</p>
		{:else}
			<p class="text-center italic text-gray-600 dark:text-gray-500">No summary provided</p>
		{/if}
	</a>
</div>

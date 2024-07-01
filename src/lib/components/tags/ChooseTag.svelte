<script lang="ts">
	import { listTags } from '$lib/dlool/tags/list';
	import { createEventDispatcher } from 'svelte';
	import Modal from '../modal/Modal.svelte';
	import NewTag from './NewTag.svelte';
	import TagButton from './TagButton.svelte';
	import type { Tag } from './types';
	import Store from '../utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	export let className: string;
	export let schoolName: string;
	export let selected: Tag[] = [];

	let isOpen = false;

	const dispatch = createEventDispatcher<{
		change: Tag;
	}>();
</script>

<div class="flex items-center justify-between gap-2">
	<span><Store store={i('tags.choose')} /></span>

	<div class="flex flex-wrap gap-1">
		{#each selected as tag (tag.tag)}
			<TagButton
				{tag}
				removable
				on:click={() => (isOpen = !isOpen)}
				on:remove={({ detail }) => {
					selected = selected.filter(({ tag: t }) => t !== detail.tag);
				}}
			/>
		{/each}
		<button
			class="rounded-full bg-zinc-200 px-2 py-0.5 outline outline-1 outline-zinc-400 dark:bg-zinc-700 dark:outline-zinc-600"
			on:click={() => {
				isOpen = !isOpen;
			}}
		>
			<Store store={i('tags.choose.choose')} />
		</button>
	</div>
</div>

<Modal bind:isOpen>
	<div slot="title">
		<Store store={i('tags.choose')} />
	</div>

	<div slot="body">
		<div class="flex flex-col">
			<NewTag
				{className}
				on:create={({ detail }) => {
					dispatch('change', detail);
					selected = [...selected, { ...detail }];
					isOpen = false;
				}}
			/>

			<!-- TODO: reload the list when it gets opened again -->
			{#await listTags({ school: schoolName, class: className }) then data}
				<div class="flex flex-wrap gap-1 py-2">
					{#each data as tag (tag.id)}
						<TagButton
							{tag}
							disabled={selected.some(({ tag: t }) => t === tag.tag)}
							on:click={({ detail }) => {
								dispatch('change', detail);
								selected = [...selected, { ...detail }];
								isOpen = false;
							}}
						/>
					{/each}
				</div>
			{/await}
		</div>
	</div>
</Modal>

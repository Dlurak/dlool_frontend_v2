<script lang="ts">
	import type { PageData } from './$types';
	import UpdatedAt from '$lib/components/utils/UpdatedAt.svelte';
	import { AcademicCap, BuildingLibrary, Icon } from 'svelte-hero-icons';

	export let data: PageData;
</script>

{#if data.data.status === 'success'}
	{@const note = data.data.data}

	<h2>{note.title}</h2>

	{#if note.summary}
		<p>{note.summary}</p>
	{:else}
		<p class="italic text-gray-600 dark:text-gray-400">No summary provided</p>
	{/if}

	<div
		class="flex w-fit min-w-[50%] max-w-full flex-wrap justify-between gap-4 text-sm text-gray-600 dark:text-gray-400"
	>
		<span class="flex flex-col">
			{#if note.updates[0]}
				{@const update = note.updates[0]}
				<span>
					<UpdatedAt type="created" timestamp={update.time} displayname={update.user.displayname} />
				</span>
			{/if}

			{#if note.updates.length > 1}
				{@const lastUpdate = note.updates[note.updates.length - 1]}
				<span>
					<UpdatedAt
						type="edited"
						timestamp={lastUpdate.time}
						displayname={lastUpdate.user.displayname}
					/>
				</span>
			{/if}
		</span>

		<div>
			<span class="flex items-center gap-1">
				<Icon src={BuildingLibrary} class="h-5 w-5" mini />
				{note.class.name}
			</span>

			<span class="flex items-center gap-1">
				<Icon src={AcademicCap} class="h-5 w-5" mini />
				{note.class.school.name}
			</span>
		</div>
	</div>
{/if}

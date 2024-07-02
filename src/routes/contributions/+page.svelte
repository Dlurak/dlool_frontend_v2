<script lang="ts">
	import Card from '$lib/components/contributors/Card.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { i } from '$lib/i18n/store';
	import { objectEntries } from '$lib/utils/objects/entries';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<MetaData title={i('contributions.title')} />

<div class="flex w-full flex-col gap-2">
	{#each objectEntries(data.contributions) as [category, contris]}
		<section>
			<h2 class="mb-2 border-b border-b-zinc-300 dark:border-b-zinc-800">{category}</h2>
			<div class="flex gap-2 py-2">
				{#each contris as contributor}
					<Card {contributor} />
				{/each}
			</div>
		</section>
	{/each}
</div>

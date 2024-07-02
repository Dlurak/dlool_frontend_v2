<script lang="ts">
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { fmtNum } from '$lib/utils/intl';
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
				{#each contris as con}
					<div
						class="
							flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300
							dark:outline-zinc-700
						"
					>
						<img src={con.avatar_url} alt="" class="h-36 w-36 rounded" loading="lazy" />
						<span class="flex flex-col text-center">
							<a class="text-lg" href={con.html_url}>
								{con.login}
							</a>
							<span class="text-sm">
								<Store
									store={i(
										'contributions.count',
										{ contributions: fmtNum(con.contributions) },
										{ count: con.contributions }
									)}
								/>
							</span>
						</span>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>

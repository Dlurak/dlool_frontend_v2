<script lang="ts">
	import { i } from '$lib/i18n/store';
	import type { Contributor } from '$lib/schemes/contributor';
	import { fmtNum } from '$lib/utils/intl';
	import Store from '../utils/Store.svelte';

	export let contributor: Contributor;
</script>

<div
	class="
		flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300
		dark:outline-zinc-700
	"
>
	<img src={contributor.avatar_url} alt="" class="h-36 w-36 rounded" loading="lazy" />
	<span class="flex flex-col text-center">
		<a class="text-lg" href={contributor.html_url}>
			{contributor.login}
		</a>
		<span class="text-sm">
			<Store
				store={i(
					'contributions.count',
					{ contributions: fmtNum(contributor.contributions) },
					{ count: contributor.contributions }
				)}
			/>
		</span>
	</span>
</div>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import SidePanel from '$lib/components/calendar/SidePanel/SidePanel.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import { objToQueryParams } from '$lib/utils/url/query';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Panes>
	<div slot="a">
		<SidePanel
			query={data.query ?? {
				school: null,
				classes: []
			}}
			on:change={async ({ detail }) => {
				await goto(`?${objToQueryParams(detail)}`);
				invalidateAll();
			}}
		/>
	</div>

	<div slot="b" class="flex w-full flex-col items-center justify-center gap-2">
		<slot />
	</div>
</Panes>

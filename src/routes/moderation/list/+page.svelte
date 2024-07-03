<script lang="ts">
	import Chips from '$lib/components/filter/Chips.svelte';
	import ForeignReqBox from '$lib/components/moderation/ReqBox/foreign/ForeignReqBox.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { foreignRequests, type ForeignReq } from '$lib/dlool/moderation/foreign';
	import { i } from '$lib/i18n/store';
	import { onMount } from 'svelte';

	let data: ForeignReq[] = [];
	let filterValue = 'all';

	onMount(async () => {
		// requires auth so we run it on the client
		data = await foreignRequests({ type: 'all' }).then((d) => d.data);
	});

	const states = ['all', 'Pending', 'Accepted', 'Rejected'] as const;
</script>

<MetaData title={i('title.moderation.list')} />

{#if !(filterValue === 'all' && data.length === 0)}
	<div class="w-full py-3">
		<Chips
			bind:value={filterValue}
			options={states.map((state) => ({
				value: state,
				label: i(`moderation.state.${state}`)
			}))}
			on:change={async ({ detail }) => {
				// @ts-expect-error Detail is a state but svelte generics are kinda broken
				data = await foreignRequests({ type: detail }).then((d) => d.data);
			}}
		/>
	</div>
{/if}

<div
	class="grid w-full gap-3"
	class:grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]={data.length > 0}
>
	{#each data as d}
		<ForeignReqBox
			req={d}
			on:review={async () => {
				// @ts-expect-error filterValue is only a string, type requires something more precise
				data = await foreignRequests({ type: filterValue }).then((d) => d.data);
			}}
		/>
	{:else}
		<div class="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
			<p><Store store={i('moderation.foreign.noData')} /></p>
		</div>
	{/each}
</div>

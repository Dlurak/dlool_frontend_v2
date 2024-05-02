<script lang="ts">
	import ForeignReqBox from '$lib/components/moderation/ReqBox/foreign/ForeignReqBox.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { foreignRequests, type ForeignReq } from '$lib/dlool/moderation/foreign';
	import { i } from '$lib/i18n/store';
	import { onMount } from 'svelte';

	let data: ForeignReq[] = [];

	onMount(async () => {
		// requires auth so we run it on the client
		data = await foreignRequests({}).then((d) => d.data);
	});
</script>

<div
	class="grid w-full gap-3"
	class:grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]={data.length > 0}
>
	{#each data as d}
		<ForeignReqBox
			req={d}
			on:review={async () => {
				data = await foreignRequests({}).then((d) => d.data);
			}}
		/>
	{:else}
		<div class="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
			<p><Store store={i('moderation.foreign.noData')} /></p>
		</div>
	{/each}
</div>

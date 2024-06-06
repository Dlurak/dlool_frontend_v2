<script lang="ts">
	import ReqBox from '$lib/components/moderation/ReqBox/ReqBox.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { ownRequests, type JoinReq } from '$lib/dlool/moderation/own';
	import { i } from '$lib/i18n/store';
	import { title } from '$lib/stores';
	import { onMount } from 'svelte';

	title.set(i('title.moderation.own'));

	let data: JoinReq[] = [];

	onMount(async () => {
		// requires auth so we run it on the client
		data = await ownRequests().then((d) => d.data);
	});
</script>

<div
	class="grid w-full gap-3"
	class:grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]={data.length > 0}
>
	{#each data as d}
		<ReqBox req={d} />
	{:else}
		<div class="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
			<p><Store store={i('moderation.own.noData')} /></p>
		</div>
	{/each}
</div>

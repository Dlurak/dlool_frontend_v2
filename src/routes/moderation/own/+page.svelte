<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import Tooltipped from '$lib/components/utils/Tooltipped.svelte';
	import { ownRequests, type JoinReq } from '$lib/dlool/moderation/own';
	import { i } from '$lib/i18n/store';
	import { currentLang } from '$lib/stores';
	import { onMount } from 'svelte';
	import { AcademicCap, BuildingLibrary, Clock, Icon, User } from 'svelte-hero-icons';

	let data: JoinReq[] = []; //ownRequests()

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
		<div class="rounded-md px-2 py-2 outline outline-2 outline-gray-500">
			<div
				class="w-full rounded px-4 py-2 text-center text-xl font-semibold"
				class:bg-red-500={d.status === 'Rejected'}
				class:bg-green-500={d.status === 'Accepted'}
				class:bg-blue-500={d.status === 'Pending'}
			>
				<Store store={i(`moderation.state.${d.status}`)} />
			</div>

			<div class="flex py-3">
				<div class="flex w-full gap-1">
					<Icon src={AcademicCap} class="h-6 w-6" mini />
					{d.wantsToJoin.name}
				</div>

				<div class="flex w-full gap-1">
					<Icon src={BuildingLibrary} class="h-6 w-6" mini />
					{d.wantsToJoin.school.name}
				</div>
			</div>

			<div class="pb-0.5 text-xs text-gray-500 dark:text-gray-400">
				{#if d.status === 'Accepted' || d.status === 'Rejected'}
					<h4 class="pb-1 text-sm leading-relaxed"><Store store={i('moderation.own.review')} /></h4>
					<div class="flex gap-3">
						<div class="flex gap-1">
							<Icon src={User} class="h-4 w-4" micro />
							{d.reviewedBy.displayname}
						</div>
						<Tooltipped>
							<div class="flex gap-1">
								<Icon src={Clock} class="h-4 w-4" micro />
								{new Date(d.reviewedAt).toLocaleString($currentLang, {
									minute: '2-digit',
									hour: '2-digit',
									day: '2-digit',
									month: '2-digit'
								})}
							</div>
							<svelte:fragment slot="tooltip">
								{new Date(d.reviewedAt).toLocaleString($currentLang, {
									second: '2-digit',
									minute: '2-digit',
									hour: '2-digit',
									day: '2-digit',
									month: '2-digit',
									year: '2-digit'
								})}
							</svelte:fragment>
						</Tooltipped>
						<div class="w-full" />
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
			<p><Store store={i('moderation.own.noData')} /></p>
		</div>
	{/each}
</div>

<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import Tooltipped from '$lib/components/utils/Tooltipped.svelte';
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import type { JoinReq } from '$lib/dlool/moderation/own';
	import { i } from '$lib/i18n/store';
	import { currentLang } from '$lib/stores';
	import { Clock, Icon, User } from 'svelte-hero-icons';

	export let req: JoinReq | ForeignReq;
</script>

<div class="pb-0.5 text-xs text-gray-500 dark:text-gray-400">
	{#if req.status === 'Accepted' || req.status === 'Rejected'}
		<h4 class="pb-1 text-sm leading-relaxed"><Store store={i('moderation.own.review')} /></h4>
		<div class="flex gap-3">
			<div class="flex gap-1">
				<Icon src={User} class="h-4 w-4" micro />
				{req.reviewedBy.displayname}
			</div>
			<Tooltipped>
				<div class="flex gap-1">
					<Icon src={Clock} class="h-4 w-4" micro />
					{new Date(req.reviewedAt).toLocaleString($currentLang, {
						minute: '2-digit',
						hour: '2-digit',
						day: '2-digit',
						month: '2-digit'
					})}
				</div>
				<svelte:fragment slot="tooltip">
					{new Date(req.reviewedAt).toLocaleString($currentLang, {
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

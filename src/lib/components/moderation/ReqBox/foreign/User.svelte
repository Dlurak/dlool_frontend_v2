<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import { i } from '$lib/i18n/store';

	export let req: ForeignReq;

	const classLimit = 5;
</script>

<div class="flex flex-col">
	{req.user.displayname}
	{#if req.user.displayname !== req.user.username}
		<span class="text-sm text-gray-400">
			{req.user.username}
		</span>
	{/if}
</div>
{#if req.user.classes.length > 0}
	{@const classes = req.user.classes}
	{@const others = classes.slice(classLimit).length}
	<div>
		<h5>Accepted in</h5>
		<ul class="grid list-none grid-cols-3">
			{#each classes.slice(0, classLimit) as cl}
				<li>{cl.name}</li>
			{/each}
		</ul>
		{#if others}
			<Store
				store={i('moderation.foreign.acceptedIn.others', { count: `${others}` }, { count: others })}
			/>
		{/if}
	</div>
{/if}

<script lang="ts">
	import { getConditions } from '$lib/utils/strings/password';
	import Store from '../utils/Store.svelte';
	import Tooltipped from '../utils/Tooltipped.svelte';
	import PwdStrengthBox from './PwdStrengthBox.svelte';

	export let pwd: string;

	const colorPairs: [
		[string, string],
		[string, string],
		[string, string],
		[string, string],
		[string, string]
	] = [
		['#ef4444', '#f97316'],
		['#f97316', '#eab308'],
		['#eab308', '#84cc16'],
		['#84cc16', '#22c55e'],
		['#22c55e', '#10b981']
	];
</script>

<div class="flex gap-1 overflow-hidden rounded-md">
	{#each getConditions(pwd) as cond, i}
		{@const pair = colorPairs[i]}

		<Tooltipped>
			<PwdStrengthBox isFullfilled={cond.isValid} start={pair[0]} end={pair[1]} />
			<span slot="tooltip">
				{cond.isValid ? '✅' : '❌'}
				<Store store={cond.string} />
			</span>
		</Tooltipped>
	{/each}
</div>

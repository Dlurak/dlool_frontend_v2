<script lang="ts">
	import { i } from '$lib/i18n/store';
	import { useInterval } from 'nutzlich';
	import Store from './Store.svelte';
	import { getDifference } from '$lib/utils/dates/difference';

	export let displayname: string;
	export let timestamp: number;
	export let type: 'edited' | 'created';

	let { unit, diff } = getDifference(new Date(timestamp), new Date());

	useInterval(() => {
		const { unit: newUnit, diff: newDiff } = getDifference(new Date(timestamp), new Date());

		unit = newUnit;
		diff = newDiff;
	}, 1_000);
</script>

<Store store={i(`time.ago.${type}.${unit}`, { diff: `${diff}`, name: displayname })} />

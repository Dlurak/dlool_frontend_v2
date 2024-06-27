<script lang="ts">
	import { type CustomDate } from '$lib/utils/dates/custom';
	import CalFrame from './CalFrame.svelte';
	import CalInner from './CalInner.svelte';

	export let displayMonth: Date;
	export let earliest: CustomDate | null;
	export let latest: CustomDate | null;
</script>

<CalFrame on:close>
	<CalInner {displayMonth} {earliest} {latest} on:change />
</CalFrame>

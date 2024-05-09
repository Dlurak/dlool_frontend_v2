<script lang="ts">
	import DateSelector from '$lib/components/input/date/DateSelector.svelte';
	import type { CustomDate } from '$lib/utils/dates/custom';

	export let start: null | CustomDate = null;
	export let end: null | CustomDate = null;
</script>

<DateSelector bind:date={start} latest={end}>
	<slot slot="postIcon" name="start"></slot>
</DateSelector>

<DateSelector bind:date={end} earliest={start}>
	<slot slot="postIcon" name="end"></slot>
</DateSelector>

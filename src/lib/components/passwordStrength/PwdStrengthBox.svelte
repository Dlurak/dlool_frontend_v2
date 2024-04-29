<script lang="ts">
	export let isFullfilled: boolean;
	export let start: string;
	export let end: string;
</script>

<div
	class="h-7 w-full rounded-sm from-[--start] to-[--end]"
	style:--start={start}
	style:--end={end}
	class:bg-gray-300={!isFullfilled}
	class:dark:bg-gray-700={!isFullfilled}
	class:bg-gradient-to-r={isFullfilled}
/>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	export let hour: number | null = 6;
	export let min: number | null = 6;

	const dispatch = createEventDispatcher<{
		change: {
			hour: number | null;
			min: number | null;
		};
	}>();

	let focusMin = false;
</script>

<span
	class="flex w-fit items-center justify-center gap-1 rounded bg-zinc-200 px-2 py-1 dark:bg-zinc-800"
>
	<Input
		on:change={({ detail }) => {
			dispatch('change', {
				hour: detail,
				min
			});
		}}
		max={23}
		bind:value={hour}
		on:next={() => {
			focusMin = true;
		}}
	/>
	:
	<Input
		bind:value={min}
		bind:focus={focusMin}
		max={59}
		on:change={({ detail }) => {
			dispatch('change', {
				hour,
				min: detail
			});
		}}
	/>
</span>

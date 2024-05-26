<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | null = null;
	export let focus = false;

	export let max = 23;

	let ele: HTMLInputElement | null;

	const dispatch = createEventDispatcher<{
		next: null;
		change: number;
	}>();

	$: {
		if (focus && ele) {
			ele.focus();
			ele.select();
		}
	}
</script>

<input
	type="text"
	inputmode="numeric"
	value={value ? `${value}` : ''}
	placeholder="--"
	maxlength="2"
	class="w-7 border-none bg-transparent px-1 text-center text-black outline-none dark:text-white"
	bind:this={ele}
	on:input={({ currentTarget }) => {
		const val = currentTarget.value.trim();

		const reset = () => (currentTarget.value = value ? `${value}` : '');

		if (!val) {
			value = null;
			return;
		}

		if (!/^\d{1,2}$/.test(val)) {
			reset();
			return;
		}

		const num = parseInt(val);
		if (num > max) {
			reset();
			return;
		}

		value = num;
		dispatch('change', value);

		if (val.length === 2) dispatch('next');
	}}
	on:focus={() => (focus = true)}
	on:blur={() => {
		focus = false;
	}}
/>

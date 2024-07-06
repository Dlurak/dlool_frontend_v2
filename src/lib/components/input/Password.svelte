<script lang="ts">
	import { Icon, LockClosed } from 'svelte-hero-icons';
	import Frame from './Frame.svelte';
	import type { Readable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let placeholder: Readable<string>;

	const dispatch = createEventDispatcher<{ enter: null }>();
</script>

<Frame>
	<Icon src={LockClosed} class="h-6 w-6" solid />

	<input
		type="password"
		class="w-full bg-transparent focus:outline-none"
		bind:value
		on:input
		placeholder={$placeholder}
		on:keydown={({ key }) => {
			if (key === 'Enter') dispatch('enter', null);
		}}
	/>
</Frame>

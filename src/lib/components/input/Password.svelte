<script lang="ts">
	import { Icon, LockClosed } from 'svelte-hero-icons';
	import Frame from './Frame.svelte';
	import type { Readable } from 'svelte/store';

	export let value = '';
	export let placeholder: Readable<string>;
</script>

<Frame>
	<Icon src={LockClosed} class="h-6 w-6" solid />

	<input
		type="password"
		class="bg-transparent focus:outline-none"
		bind:value
		placeholder={$placeholder}
	/>
</Frame>

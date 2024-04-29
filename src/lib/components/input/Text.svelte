<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let value: string = '';
</script>

<Frame>
	{#if icon}
		<Icon src={icon} class="h-6" solid />
	{/if}

	<input
		type="text"
		class="bg-transparent focus:outline-none"
		placeholder={$placeholder}
		bind:value
	/>
</Frame>

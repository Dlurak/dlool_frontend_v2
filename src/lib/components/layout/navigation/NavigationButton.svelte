<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { navbarEntries } from '$lib/constants/navbar';
	import { svocal } from '$lib/utils/store/svocal';
	import type { NavigationTarget } from './types';
	import { Icon } from 'svelte-hero-icons';

	export let target: NavigationTarget;

	$: data = navbarEntries[target];

	const showText = svocal('settings.nav.texts');
</script>

<button class="flex w-full flex-col items-center" on:click={() => data.action()}>
	<div class="h-8 p-0.5">
		<Icon src={data.icon} micro />
	</div>

	{#if $showText}
		<span class="text-xs"><Store store={data.text} /></span>
	{/if}
</button>

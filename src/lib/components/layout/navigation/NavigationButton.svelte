<script lang="ts">
	import { goto } from '$app/navigation';
	import { svocal } from '$lib/utils/store/svocal';
	import type { NavigationTarget } from './types';
	import {
		Icon,
		BookOpen,
		User,
		UserPlus,
		Calendar,
		PencilSquare,
		MagnifyingGlass,
		type IconSource
	} from 'svelte-hero-icons';

	export let target: NavigationTarget;

	const entries: Record<NavigationTarget, { icon: IconSource; action: () => void }> = {
		login: { icon: User, action: () => goto('/login') },
		notes: { icon: PencilSquare, action: () => goto('/notes') },
		calendar: { icon: Calendar, action: () => goto('/calendar') },
		homework: { icon: BookOpen, action: () => goto('/homework') },
		launcher: { icon: MagnifyingGlass, action: () => {} },
		register: { icon: UserPlus, action: () => goto('/register') }
	};

	$: data = entries[target];

	const showText = svocal('settings.nav.texts');
</script>

<button class="flex w-full flex-col items-center" on:click={() => data.action()}>
	<div class="h-8 p-0.5">
		<Icon src={data.icon} micro />
	</div>

	{#if $showText}
		<span class="text-xs">{target}</span>
	{/if}
</button>

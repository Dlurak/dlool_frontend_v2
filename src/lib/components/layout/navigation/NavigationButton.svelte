<script lang="ts">
	import { goto } from '$app/navigation';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
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
	import { type Readable } from 'svelte/store';

	export let target: NavigationTarget;

	const entries: Record<
		NavigationTarget,
		{ icon: IconSource; action: () => void; text: Readable<string> }
	> = {
		login: {
			icon: User,
			action: () => goto('/login'),
			text: i('nav.login')
		},
		notes: {
			icon: PencilSquare,
			action: () => goto('/notes'),
			text: i('nav.notes')
		},
		calendar: {
			icon: Calendar,
			action: () => goto('/calendar'),
			text: i('nav.calendar')
		},
		homework: {
			icon: BookOpen,
			action: () => goto('/homework'),
			text: i('nav.homework')
		},
		launcher: {
			icon: MagnifyingGlass,
			action: () => {},
			text: i('nav.launcher')
		},
		register: {
			icon: UserPlus,
			action: () => goto('/register'),
			text: i('nav.register')
		}
	};

	$: data = entries[target];

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

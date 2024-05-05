<script lang="ts">
	import { counterMs } from '$lib/utils/store/countMs';
	import { useHover, useToggle } from 'nutzlich';
	import { createEventDispatcher } from 'svelte';
	import {
		Icon,
		XMark,
		InformationCircle,
		CheckCircle,
		ExclamationCircle
	} from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import { confirmation } from '../confirmation';

	export let type: 'success' | 'error' | 'warning' | 'info' = 'success';
	export let content: Readable<string>;
	export let timeout: number | undefined | null = null;

	$: icon = {
		success: CheckCircle,
		error: ExclamationCircle,
		warning: ExclamationCircle,
		info: InformationCircle
	}[type];

	const [isHovered, hoverRef] = useHover();

	const timePassed = counterMs({
		isPaused: () => !!($isHovered || !document.hasFocus() || $confirmation)
	});

	const manuallyFinished = useToggle(false);

	$: percentages =
		timeout === undefined || timeout === null ? 0 : Math.min(($timePassed / timeout) * 100, 100);
	$: isFinished = $manuallyFinished || percentages === 100;

	const dispatch = createEventDispatcher();

	$: if (isFinished) {
		dispatch('finished');
	}
</script>

<div
	class="
		pointer-events-auto relative flex w-full gap-4 rounded px-4 py-1 shadow-md
		after:pointer-events-none after:absolute after:inset-0 after:w-[--after-w] after:bg-black after:bg-opacity-20
	"
	use:hoverRef
	style:--after-w={`${percentages}%`}
	class:bg-green-400={type === 'success'}
	class:dark:bg-green-500={type === 'success'}
	class:bg-red-500={type === 'error'}
	class:text-white={type === 'error'}
	class:bg-amber-400={type === 'warning'}
	class:dark:bg-amber-500={type === 'warning'}
	class:bg-stone-400={type === 'info'}
	class:dark:bg-stone-500={type === 'info'}
>
	<div class="flex items-center">
		<Icon src={icon} class="h-10 w-10" />
	</div>

	<div class="flex w-full items-center">
		{$content}
	</div>

	<button on:click={() => manuallyFinished.set(true)}>
		<Icon src={XMark} class="h-5 w-5" />
	</button>
</div>

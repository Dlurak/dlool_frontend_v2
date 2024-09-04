<script lang="ts">
	import { openedModals } from '$lib/stores';
	import { enableScrolling } from '$lib/utils/dom/scroll';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { Icon, XMark } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher<{ open: null; close: null }>();

	let dialogElement: HTMLDialogElement | undefined;
	export let isOpen = false;

	export const open = () => {
		if (!dialogElement) return;
		if (dialogElement.open) return;

		openedModals.inc();
		dialogElement.showModal();
		isOpen = true;
		dispatch('open');
		enableScrolling(false);
	};

	export const close = () => {
		openedModals.dec();
		if (!dialogElement) return;
		if (!dialogElement.open) return;

		dialogElement.close();
		isOpen = false;
		dispatch('close');
		enableScrolling(true);
	};

	$: {
		if (isOpen) open();
		else close();
	}

	onDestroy(() => {
		openedModals.dec();
		enableScrolling(true);
	});
</script>

<dialog
	bind:this={dialogElement}
	class="min-w-[min(24rem,90%)] overflow-visible rounded-md bg-gray-200 text-black shadow-2xl backdrop:bg-black backdrop:opacity-50 backdrop:saturate-50 dark:bg-zinc-800 dark:text-white"
	on:cancel={close}
>
	<div
		class="flex items-center gap-6 rounded-t-md border-b-gray-500 bg-gray-300 px-3 py-1 dark:bg-zinc-900"
	>
		<div class="w-full">
			<b><slot name="title" /></b>
		</div>

		<button on:click={close}>
			<Icon src={XMark} class="h-8 w-8 text-red-500" />
		</button>
	</div>

	<div class="max-h-[calc(100dvh-5rem)] overflow-y-auto px-3 py-1">
		<slot name="body" />
	</div>
</dialog>

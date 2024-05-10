<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, XMark } from 'svelte-hero-icons';

	export let closeDisabled = false;

	const dispatch = createEventDispatcher<{ open: null; close: null }>();

	let dialogElement: HTMLDialogElement;
	export let isOpen = false;

	export const open = () => {
		if (!dialogElement) return;
		dialogElement.showModal();
		isOpen = true;
		dispatch('open');
	};

	export const close = () => {
		if (!dialogElement) return;
		dialogElement.close();
		isOpen = false;
		dispatch('close');
	};

	$: {
		if (isOpen) open();
		else close();
	}
</script>

<dialog
	bind:this={dialogElement}
	class="min-w-[min(24rem,90%)] rounded-md bg-gray-200 text-black shadow-2xl backdrop:bg-black backdrop:opacity-50 backdrop:saturate-50 dark:bg-zinc-800 dark:text-white"
>
	<div class="flex items-center gap-6 border-b-gray-500 bg-gray-300 px-3 py-1 dark:bg-zinc-900">
		<div class="w-full">
			<b><slot name="title" /></b>
		</div>

		<button
			on:click={close}
			disabled={closeDisabled}
			class="disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Icon src={XMark} class="h-8 w-8 text-red-500" />
		</button>
	</div>

	<div class="px-3 py-1">
		<slot name="body" />
	</div>
</dialog>

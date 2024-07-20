<script lang="ts">
	import { shortcuts as shortcutsConst } from '$lib/constants/keyboardShortcuts';
	import type { Context, Shortcut } from './types';
	import { objectEntries } from '$lib/utils/objects/entries';
	import KeyboardShortcut from './KeyboardShortcut.svelte';
	import { i } from '$lib/i18n/store';
	import Store from '$lib/components/utils/Store.svelte';

	export let isApple = false;
	let dialogEle: HTMLDialogElement | undefined;

	export let shortcuts: Record<Context, Shortcut[]> = shortcutsConst;
</script>

<svelte:window
	on:keydown={(e) => {
		const { key, ctrlKey } = e;
		const isCorrectKey = key === 'ß' || key === '?';
		if (!(ctrlKey && isCorrectKey)) return;

		e.preventDefault();

		const open = dialogEle?.open;

		if (open) dialogEle?.close();
		else dialogEle?.showModal();
	}}
/>

<dialog
	bind:this={dialogEle}
	class="
		h-fit min-h-48 min-w-96 max-w-[90%] rounded-md px-2 py-2 outline-none
		backdrop:bg-black backdrop:opacity-50 backdrop:saturate-50
		dark:bg-zinc-800 dark:text-white
		print:hidden
	"
>
	<div class="flex flex-col gap-2">
		{#each objectEntries(shortcuts) as [category, data]}
			<div>
				<h3><Store store={i(`keyboardshortcuts.${category}`)} /></h3>

				<ul class="grid list-none grid-cols-2">
					{#each data as singleShortcut}
						<li>
							<KeyboardShortcut {isApple} shortcut={singleShortcut} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</dialog>

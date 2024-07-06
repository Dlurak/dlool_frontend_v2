<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { readable, writable } from 'svelte/store';
	import type { Tag } from '../types';
	import ColorPreview from '$lib/components/settings/color/ColorPreview.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { updateTag } from '$lib/dlool/tags/update';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { createEventDispatcher } from 'svelte';

	export let editing: (Tag & { id: string }) | null;

	let newTag = { ...editing };

	const editingStore = writable(editing);
	$: editingStore.set(editing);
	editingStore.subscribe((e) => {
		newTag = { ...e };
	});

	const dispatch = createEventDispatcher<{
		edit: Tag;
	}>();
</script>

<Modal
	isOpen={!!editing}
	on:close={() => {
		editing = null;
	}}
>
	<div slot="title">
		<Store store={i('tags.edit.title', { tag: editing?.tag ?? '' })} />
	</div>
	<div slot="body" class="flex flex-col gap-2 py-2">
		{#if editing && newTag.tag && newTag.color}
			<div class="flex items-stretch gap-2">
				<TextInput bind:value={newTag.tag} placeholder={readable('')} />
				<ColorPreview subject={newTag.tag} bind:hexColor={newTag.color} />
			</div>

			<PrimaryButton
				on:click={() => {
					if (!editing) return;
					if (!newTag.tag) return;
					if (!newTag.color) return;

					updateTag(editing.id, {
						tag: newTag.tag,
						color: newTag.color.toLowerCase()
					})
						.then(() => {
							sendToast({
								type: 'success',
								content: i('tags.edit.success'),
								timeout: 5_000
							});

							if (!newTag.tag) return;
							if (!newTag.color) return;

							dispatch('edit', {
								tag: newTag.tag,
								color: newTag.color
							});
						})
						.catch(sendDefaultErrorToast);
				}}
			>
				<Store store={i('update')} />
			</PrimaryButton>
		{/if}
	</div>
</Modal>

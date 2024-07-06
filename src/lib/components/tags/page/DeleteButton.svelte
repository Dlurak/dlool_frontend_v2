<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { confirm } from '$lib/components/layout/confirmation';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { deleteTag } from '$lib/dlool/tags/delete';
	import { Trash } from 'svelte-hero-icons';
	import type { Tag } from '../types';
	import { i } from '$lib/i18n/store';

	export let tag: Tag & { id: string };
</script>

<QuickAction
	icon={Trash}
	color="red"
	on:click={async () => {
		const confirmed = await confirm({
			ok: i('tags.delete.ok'),
			desc: i('tags.delete.desc', { tag: tag.tag })
		});
		if (!confirmed) return;

		deleteTag(tag.id)
			.then(() => {
				sendToast({
					type: 'success',
					timeout: 5_000,
					content: i('tags.delete.success')
				});
				return invalidateAll();
			})
			.catch(sendDefaultErrorToast);
	}}
/>

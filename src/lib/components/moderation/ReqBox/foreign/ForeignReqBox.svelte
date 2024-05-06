<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Store from '$lib/components/utils/Store.svelte';
	import type { ForeignReq } from '$lib/dlool/moderation/foreign';
	import { review } from '$lib/dlool/moderation/review';
	import { i } from '$lib/i18n/store';
	import { createEventDispatcher } from 'svelte';
	import ReqBox from '../ReqBox.svelte';
	import User from './User.svelte';
	import { confirm } from '$lib/components/layout/confirmation';

	export let req: ForeignReq;

	const dispatch = createEventDispatcher<{ review: 'accept' | 'reject' }>();

	const operate = async (action: 'accept' | 'reject') => {
		if (
			!(await confirm({
				ok: i(`moderation.foreign.${action}`)
			}))
		)
			return;

		await review({
			id: req.id,
			operation: (
				{
					accept: 'Accepted',
					reject: 'Rejected'
				} as const
			)[action]
		})
			.then(() => {
				sendToast({
					type: 'success',
					content: i(`toast.mod.foreing.${action}.success`),
					timeout: 5_000
				});
			})
			.catch(sendDefaultErrorToast);

		dispatch('review', action);
	};
</script>

<ReqBox {req}>
	<svelte:fragment slot="userDetails">
		<User {req} />
	</svelte:fragment>

	<svelte:fragment slot="bottom">
		{#if req.status === 'Pending'}
			<div class="flex flex-col gap-3 pb-1 pt-5">
				<PrimaryButton color="green" on:click={() => operate('accept')}>
					<Store store={i('moderation.foreign.accept')} />
				</PrimaryButton>
				<PrimaryButton color="red" on:click={() => operate('reject')}>
					<Store store={i('moderation.foreign.reject')} />
				</PrimaryButton>
			</div>
		{/if}
	</svelte:fragment>
</ReqBox>

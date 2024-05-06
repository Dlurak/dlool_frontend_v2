<script lang="ts">
	import { navHeight } from '$lib/stores';
	import Toast from './Toast.svelte';
	import { toasts } from './store';

	const finishedIds: number[] = [];
	const isActive = (id: number) => !finishedIds.includes(id);

	// delete all toasts once they are all finished
	toasts.subscribe((t) => {
		const hasContent = t.length > 0;
		const isFullyInactive = t.every(({ active }) => !active);

		if (hasContent && isFullyInactive) {
			toasts.set([]);
		}
	});
</script>

<div
	class="pointer-events-none fixed bottom-4 flex w-full justify-center px-4 pb-[--nav-h] sm:pb-0"
	style:--nav-h={`${$navHeight}px`}
>
	<div class="flex w-[32rem] max-w-full flex-col gap-2">
		{#each $toasts as toast}
			{#if toast.active}
				<span>
					<Toast
						content={toast.content}
						timeout={toast.timeout}
						type={toast.type}
						on:finished={() => {
							// set the toast as inactive
							finishedIds.push(toast.id);
							toasts.update((t) =>
								t.map((tt) => ({
									...tt,
									active: isActive(tt.id)
								}))
							);
						}}
					/>
				</span>
			{/if}
		{/each}
	</div>
</div>

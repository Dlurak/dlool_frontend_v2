<script>
	import { confirmation } from '.';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
</script>

{#if $confirmation}
	<div
		class="fixed inset-0 isolate z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
	>
		<div class="w-[32rem] max-w-[90%] overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
			{#if $confirmation.title}
				<div class="bg-zinc-300 px-2 py-1 dark:bg-zinc-700">
					<Store store={$confirmation.title} />
				</div>
			{/if}

			<div class="flex flex-col gap-2 p-2">
				<Store store={$confirmation.desc || i('confirmation.default.content')} />

				<div class="flex justify-end gap-2">
					<button
						class="rounded-sm px-5 py-2 outline outline-1 outline-gray-400"
						on:click={() => {
							$confirmation.callback('cancel');
							confirmation.set(null);
						}}
					>
						<Store store={$confirmation.cancel || i('confirmation.default.cancel')} />
					</button>
					<button
						class="rounded-sm bg-emerald-500 px-5 py-2 dark:bg-emerald-600"
						on:click={() => {
							$confirmation.callback('success');
							confirmation.set(null);
						}}
					>
						<Store store={$confirmation.ok || i('confirmation.default.ok')} />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

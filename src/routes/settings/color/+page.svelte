<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { Icon, Plus, Trash } from 'svelte-hero-icons';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import ColorPreview from '$lib/components/settings/color/ColorPreview.svelte';
	import { DEFAULT_SUBJECT_COLOR } from '$lib/constants/settings';
	import { removeKey } from '$lib/utils/objects/removeKey';
	import { replaceKey } from '$lib/utils/objects/replaceKey';

	const colors = svocal('settings.color');
</script>

<div class="flex w-full flex-col gap-4">
	{#each Object.entries($colors) as [subject, hexColor]}
		<div class="flex justify-between">
			<ColorPreview
				{hexColor}
				on:change={({ detail: color }) => {
					colors.update((obj) => {
						obj[subject] = color;
						return obj;
					});
				}}
			/>

			<span class="flex gap-2">
				<TextInput
					value={subject}
					placeholder={i('settings.color.subject.placeholder')}
					on:input={({ detail }) => {
						colors.update((obj) => {
							return replaceKey(obj, subject, detail);
						});
					}}
				/>

				<QuickAction
					icon={Trash}
					color="red"
					on:click={() => {
						colors.update((obj) => removeKey(obj, subject));
					}}
				/>
			</span>
		</div>
	{/each}

	<button
		class="flex w-full items-center justify-center gap-2 rounded-sm bg-zinc-200 py-1 transition-colors hover:bg-zinc-300 focus:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 disabled:dark:hover:bg-zinc-800"
		on:click={() => {
			colors.update((old) => ({
				...old,
				'': DEFAULT_SUBJECT_COLOR
			}));
		}}
		disabled={!!$colors['']}
	>
		<Store store={i('settings.color.new')} />
		<Icon class="h-6 w-6" src={Plus} />
	</button>
</div>

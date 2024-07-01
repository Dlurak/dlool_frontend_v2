<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import ColorPreview from '../settings/color/ColorPreview.svelte';
	import SettingsButton from '../buttons/SettingsButton.svelte';
	import { createTag } from '$lib/dlool/tags/create';
	import { sendDefaultErrorToast, sendToast } from '../layout/toasts';
	import { createEventDispatcher } from 'svelte';
	import { DEFAULT_SUBJECT_COLOR } from '$lib/constants/settings';
	import { i } from '$lib/i18n/store';
	import Store from '../utils/Store.svelte';

	export let className: string;

	let name = '';
	let color = DEFAULT_SUBJECT_COLOR;

	let disabled = false;

	const dispatch = createEventDispatcher<{
		create: {
			tag: string;
			color: string;
		};
	}>();
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<TextInput placeholder={i('tags.new.placeholder')} bind:value={name} />
		<ColorPreview subject={name} bind:hexColor={color} />
	</div>

	<div class="flex w-full">
		<SettingsButton
			{disabled}
			on:click={async () => {
				disabled = true;
				await createTag({
					tag: name,
					class: className,
					color: color.toLowerCase()
				})
					.then((e) => {
						if (e.status === 'error') {
							return sendToast({
								type: 'error',
								content: i('tags.new.error.alreadyTaken'),
								timeout: 5_000
							});
						}

						sendToast({
							type: 'success',
							content: i('tags.new.success', { tag: name }),
							timeout: 5_000
						});
						dispatch('create', {
							tag: name,
							color: color.toLowerCase()
						});
					})
					.catch(sendDefaultErrorToast);

				disabled = false;
			}}
		>
			<Store store={i('tags.new.create')} />
		</SettingsButton>
	</div>
</div>

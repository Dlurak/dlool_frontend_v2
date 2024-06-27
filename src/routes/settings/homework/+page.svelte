<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import RangeSettings from '$lib/components/settings/RangeSettings.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { readable } from 'svelte/store';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { AcademicCap, Plus, Trash } from 'svelte-hero-icons';
	import { removeNthElement } from '$lib/utils/arrays/remove';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { onDestroy } from 'svelte';
	import { self } from '$lib/utils/utils';
	import { browser } from '$app/environment';
	import { objectEntries } from '$lib/utils/objects/entries';
	import { replaceKey } from '$lib/utils/objects/replaceKey';
	import { removeKey } from '$lib/utils/objects/removeKey';

	const homeworkTransparency = svocal('settings.homework.transparency');
	const homeworkPresets = svocal('settings.homeworkPresets');
	const defaultSubjects = svocal('settings.homework.defaultSubject');

	onDestroy(() => {
		if (!browser) return;
		homeworkPresets.update((old) => old.map((x) => x.trim()).filter(self));
	});
</script>

<MetaData title={i('settings.assignments.title')} />

<section class="flex flex-col gap-2">
	<h3><Store store={i('settings.assignments')} /></h3>

	<RangeSettings
		label={i('settings.assignments.transparency')}
		bind:value={$homeworkTransparency}
		min={0}
		max={1}
		step={0.05}
		valueFmt={(num) => `${Math.round(num * 100)}%`}
	/>

	<div class="flex justify-between">
		<span><Store store={i('settings.assignments.presets')} /></span>

		<div class="flex flex-col gap-2">
			{#each $homeworkPresets as preset, ind}
				<span class="flex gap-1">
					<TextInput placeholder={readable('')} bind:value={preset} />
					<QuickAction
						icon={Trash}
						on:click={() => homeworkPresets.update((old) => removeNthElement(old, ind))}
					/>
				</span>
			{/each}

			<SettingsButton
				icon={Plus}
				color="green"
				disabled={$homeworkPresets.map((x) => x.trim()).includes('')}
				on:click={() => homeworkPresets.update((old) => ['', ...old])}
			>
				<span><Store store={i('settings.assignments.presets.new')} /></span>
			</SettingsButton>
		</div>
	</div>

	<div>
		<h3><Store store={i('settings.assignments.default')} /></h3>
		<div class="flex flex-col gap-2">
			{#each objectEntries($defaultSubjects) as [className, subject]}
				<div class="wrap flex items-center justify-between gap-2">
					<span class="flex items-center gap-2">
						<QuickAction
							small
							icon={Trash}
							on:click={() => {
								defaultSubjects.update((obj) => removeKey(obj, className));
							}}
						/>
						<TextInput
							placeholder={i('settings.assignments.default.class.placeholder')}
							icon={AcademicCap}
							value={className}
							on:input={({ detail }) => {
								defaultSubjects.update((obj) => replaceKey(obj, className, detail));
							}}
						/>
					</span>

					<span>
						<TextInput
							placeholder={i('settings.assignments.default.class.subject')}
							value={subject}
							on:input={({ detail }) => {
								defaultSubjects.update((old) => {
									old[className] = detail;
									return old;
								});
							}}
						/>
					</span>
				</div>
			{/each}

			<div>
				<QuickAction
					icon={Plus}
					on:click={() => {
						defaultSubjects.update((old) => ({ ...old, '': '' }));
					}}
				/>
			</div>
		</div>
	</div>
</section>

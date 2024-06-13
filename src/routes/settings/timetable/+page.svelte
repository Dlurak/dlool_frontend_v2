<script lang="ts">
	import {
		addRow,
		countMaxLessons,
		getLastLessons,
		removeNthLesson,
		cleanUpTimeTable
	} from '$lib/components/settings/timetable/utils';
	import TextInput from '$lib/components/input/Text.svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { mediaQuery } from 'nutzlich';
	import { DocumentArrowDown, DocumentArrowUp, Icon, Plus, Trash } from 'svelte-hero-icons';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { downloadJSON } from '$lib/utils/files/download';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { loadFromFile } from '$lib/components/settings/timetable/loadFromFile';
	import { WEEKDAYS } from '$lib/components/settings/timetable/weekdays';

	const timetable = svocal('settings.timetable');
	const weekStartsOn = svocal('settings.weekStartsOn');
	const isSmall = mediaQuery('(max-width: 768px)');

	onDestroy(() => {
		if (!browser) return;
		timetable.update(cleanUpTimeTable);
	});
</script>

<MetaData title={i('settings.timetable.title')} />

<div class="flex w-full flex-col gap-2">
	<div class="flex w-full flex-col justify-between gap-2 sm:flex-row">
		<Store store={i('settings.timetable.importAndExport')} />

		<span class="flex gap-2">
			<SettingsButton on:click={loadFromFile}>
				<Icon src={DocumentArrowDown} class="h-5 w-5" />
				<Store store={i('settings.timetable.import')} />
			</SettingsButton>

			<SettingsButton
				color="blue"
				on:click={() => {
					downloadJSON($timetable, 'dlool-timetable.json');
				}}
			>
				<Icon src={DocumentArrowUp} class="h-5 w-5" />
				<Store store={i('settings.timetable.export')} />
			</SettingsButton>
		</span>
	</div>

	<div class="w-full overflow-x-scroll">
		<table class="w-max min-w-full">
			<thead>
				<tr>
					<th />
					{#each { length: 7 } as _, ind}
						<th class="pb-2 text-center">
							<Store
								store={i(
									$isSmall ? 'calendar.weekday.abbr' : 'calendar.weekday',
									{},
									{ count: (ind + $weekStartsOn) % 7 }
								)}
							/>
						</th>
					{/each}
				</tr>
			</thead>

			<tbody>
				{#each { length: countMaxLessons($timetable) } as _, lessonIndex}
					<tr class="border-b border-zinc-300 dark:border-zinc-700">
						<th class="p-2">
							<QuickAction
								icon={Trash}
								on:click={() => {
									timetable.update((t) => removeNthLesson(t, lessonIndex));
								}}
							/>
						</th>

						{#each WEEKDAYS as _, ind}
							{@const day = WEEKDAYS[(ind + $weekStartsOn) % 7]}

							<td class="px-1 py-3">
								<TextInput
									placeholder={i('settings.timetable.subject.placeholder')}
									bind:value={$timetable[day][lessonIndex]}
									on:enter={() => {
										const isOnlyNull = getLastLessons($timetable).every((x) => x === null);
										const hasLessons = countMaxLessons($timetable) > 0;

										if (!(isOnlyNull && hasLessons)) timetable.update(addRow);

										// TODO: Focus the TextInput one below
									}}
								/>
							</td>
						{/each}
					</tr>
				{/each}

				<tr>
					<th class="flex items-center justify-center p-2">
						<QuickAction
							icon={Plus}
							disabled={getLastLessons($timetable).every((x) => x === null) &&
								countMaxLessons($timetable) > 0}
							on:click={() => {
								timetable.update(addRow);
							}}
						/>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</div>

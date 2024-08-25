<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import { i } from '$lib/i18n/store';
	import { asyncRequestAnimationFrame } from '$lib/utils/dom';
	import { svocal } from '$lib/utils/store/svocal';
	import type { TimetableWeekday } from './types';
	import { addRow, countMaxLessons, getLastLessons } from './utils';

	export let isToday: boolean;
	export let elements: Record<string, HTMLInputElement | undefined>;
	export let day: TimetableWeekday;
	export let dayIndex: number;
	export let lessonIndex: number;

	const timetable = svocal('settings.timetable');
</script>

<td
	class="bg-opacity-20 px-1 py-3 dark:bg-opacity-10"
	class:bg-emerald-200={isToday}
	class:dark:bg-emerald-800={isToday}
>
	<TextInput
		minimal
		placeholder={i('settings.timetable.subject.placeholder')}
		value={$timetable[day][lessonIndex] ?? undefined}
		on:input={({ detail }) => {
			$timetable[day][lessonIndex] = detail;
		}}
		on:enter={async () => {
			const isOnlyNull = getLastLessons($timetable).every((x) => x === null);
			const hasLessons = countMaxLessons($timetable) > 0;
			if (!(isOnlyNull && hasLessons)) {
				timetable.update(addRow);
				await asyncRequestAnimationFrame();
			}

			const nextEle = elements[`${lessonIndex + 1}-${dayIndex}`];
			if (!nextEle) return;

			nextEle.focus();
		}}
		bind:element={elements[`${lessonIndex}-${dayIndex}`]}
	/>
</td>

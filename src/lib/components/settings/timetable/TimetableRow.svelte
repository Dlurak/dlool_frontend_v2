<script lang="ts">
	import { svocal } from '$lib/utils/store/svocal';
	import TimetableCell from './TimetableCell.svelte';
	import { WEEKDAYS } from './weekdays';

	export let elements: Record<string, HTMLInputElement | undefined>;
	export let lessonIndex: number;

	const weekStartsOn = svocal('settings.weekStartsOn');
	const showWeekend = svocal('settings.timetable.showWeekend');

	const currentWeekday = WEEKDAYS[new Date().getDay()];
</script>

{#each WEEKDAYS as _, ind}
	{@const day = WEEKDAYS[(ind + $weekStartsOn) % 7]}
	{@const show = $showWeekend ? true : !(day === 'sat' || day === 'sun')}

	{#if show}
		<TimetableCell {day} {elements} {lessonIndex} dayIndex={ind} isToday={currentWeekday === day} />
	{/if}
{/each}

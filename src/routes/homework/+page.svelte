<script lang="ts" context="module">
	async function todoistSync(assignments: Assignment[]) {
		const grouped = groupBy(assignments, ({ subject }) => internalSubjectRepresentation(subject));
		const mapped = mapObject(grouped, self, (group) => group ?? []);
		return Promise.all(
			Object.values(mapped).map(async (group) => {
				const { id: sectionId } = await createSection(group[0].subject);
				return group.map(async ({ description: content, id: dloolId, due }) => {
					const newTask = await createNewTask({
						dloolId,
						due,
						sectionId,
						content
					});
					return [dloolId, newTask.id] satisfies [string, string];
				});
			})
		)
			.then((a) => Promise.all(a.flat()))
			.then(fromEntries);
	}
</script>

<script lang="ts">
	import AssignmentGrid from '$lib/components/assignment/AssignmentGrid/AssignmentGrid.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { Icon, ArrowUpTray } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import Panes from '$lib/components/panes/Panes.svelte';
	import SideMenu from '$lib/components/assignment/SideMenu/SideMenu.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { createAssignment } from '$lib/dlool/assignments/create';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { safeMap } from '$lib/utils/null/safeMap';
	import { currentCustomDate, customDateToNormal, serialize } from '$lib/utils/dates/custom';
	import { wasSuccessfull } from '$lib/components/assignment/SideMenu/CreateAssignmentInner.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { svocal } from '$lib/utils/store/svocal';
	import { groupBy } from '$lib/utils/objects/group';
	import { navHeight } from '$lib/stores';
	import { createSection } from '$lib/utils/todoist/createNewSection';
	import { createNewTask } from '$lib/utils/todoist/createNewTask';
	import { internalSubjectRepresentation } from '$lib/utils/subjects/internal';
	import { mapObject } from '$lib/utils/objects/map';
	import { self } from '$lib/utils/utils';
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { fromEntries } from '$lib/utils/objects/entries';

	export let data: PageData;

	const overdueAfterDays = svocal('settings.homework.overdue');
	const todoistEnabled = svocal('settings.todo.todoist.enabled');
	const todoistTaskIds = svocal('settings.todo.todoist.taskIds');
</script>

<MetaData title={i('title.homework')} />

<Panes min={200} position={300}>
	<div slot="a">
		<SideMenu
			query={data.query ?? {
				school: null,
				classes: [],
				limit: 25,
				offset: 0,
				dueStart: null,
				dueEnd: null,
				fromStart: null,
				fromEnd: null
			}}
			totalAmount={data.data?.then((d) => d?.data.totalCount)}
			on:change={({ detail }) => {
				goto(
					`?${objToQueryParams({
						...detail,
						dueStart: safeMap(detail.dueStart, serialize),
						dueEnd: safeMap(detail.dueEnd, serialize),
						fromStart: safeMap(detail.fromStart, serialize),
						fromEnd: safeMap(detail.fromEnd, serialize)
					})}`
				);
			}}
			on:submit={async ({ detail }) => {
				createAssignment(detail)
					.then(invalidateAll)
					.then(() => {
						sendToast({
							type: 'success',
							content: i('assignments.create.success'),
							timeout: 5_000
						});
						wasSuccessfull.set(true);
					})
					.catch(() => {
						sendToast({
							type: 'error',
							content: i('error'),
							timeout: 5_000
						});
						wasSuccessfull.set(false);
					});
			}}
			on:pageChage={({ detail }) => {
				goto(`?${objToQueryParams({ ...data.query, ...detail })}`);
			}}
		/>
	</div>

	<div slot="b" class="flex w-full items-center justify-center">
		{#if data.data}
			{#await data.data}
				<LoadingCircle />
			{:then assignmentData}
				{#if assignmentData}
					{@const { assignments } = assignmentData.data}
					{@const grouped = groupBy(assignments, (assignment) => {
						const overdueMs =
							customDateToNormal(assignment.due).getTime() -
							customDateToNormal(currentCustomDate()).getTime();
						const overdueInDays = overdueMs / (1000 * 60 * 60 * 24);
						const isOverdue = overdueInDays <= -1 * $overdueAfterDays;
						return isOverdue ? 'overdue' : 'upcoming';
					})}
					<div class="h-full w-full">
						<AssignmentGrid
							assignments={grouped.upcoming ?? []}
							overdueAssignments={grouped.overdue ?? []}
							school={data.query.school}
							on:delete={invalidateAll}
							on:update={invalidateAll}
						/>
					</div>
				{:else}
					<div class="flex items-center justify-center">
						<Store store={i('error')} />
					</div>
				{/if}
			{:catch}
				<Store store={i('error')} />
			{/await}
		{:else if data.message === 'no school/class provided'}
			<Store store={i('assignments.filter.needToSet')} />
		{/if}
	</div>
</Panes>

{#if $todoistEnabled && data.data}
	{#await data.data then assignmentData}
		{#if assignmentData}
			<button
				on:click={async () => {
					try {
						const { assignments } = assignmentData.data;
						const newMappings = await todoistSync(assignmentData.data.assignments);
						const newEntries = Object.entries({ ...$todoistTaskIds, ...newMappings });
						const newTaskIds = fromEntries(newEntries.slice(-75));
						todoistTaskIds.set(newTaskIds);
						sendToast({
							type: 'success',
							content: i('todoist.tasksCreated', {}, { count: assignments.length }),
							timeout: 5_000
						});
					} catch {
						sendDefaultErrorToast();
					}
				}}
				style:--nav-h={`${$navHeight}px`}
				class="
					fixed bottom-[calc(0.5rem+var(--nav-h))] right-2 z-10 h-12 w-12 rounded-full
					bg-neutral-400 bg-opacity-50 px-4 py-2 shadow-md backdrop-blur-lg active:scale-95 sm:bottom-2
					dark:bg-neutral-800 dark:bg-opacity-50 sm:dark:bg-neutral-900 sm:dark:bg-opacity-50
				"
			>
				<Icon src={ArrowUpTray} />
			</button>
		{/if}
	{/await}
{/if}

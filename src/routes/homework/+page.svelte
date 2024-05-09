<script lang="ts">
	import AssignmentGrid from '$lib/components/assignment/AssignmentGrid/AssignmentGrid.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { PageData } from './$types';
	import Panes from '$lib/components/panes/Panes.svelte';
	import SideMenu from '$lib/components/assignment/SideMenu/SideMenu.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { createAssignment } from '$lib/dlool/assignments/create';
	import { sendToast } from '$lib/components/layout/toasts';
	import { safeMap } from '$lib/utils/null/safeMap';
	import { serialize } from '$lib/utils/dates/custom';

	export let data: PageData;

	let sideMenuEle: SideMenu | null = null;
</script>

<Panes minimum={200}>
	<div slot="a">
		<SideMenu
			bind:this={sideMenuEle}
			query={data.query ?? {
				school: null,
				classes: [],
				limit: 5,
				offset: 0,
				dueStart: null,
				dueEnd: null,
				fromStart: null,
				fromEnd: null
			}}
			totalAmount={data.data?.then((d) => d?.data.totalCount)}
			on:filterApply={({ detail }) => {
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
						sideMenuEle?.postCreate(true);
					})
					.catch(() => {
						sendToast({
							type: 'error',
							content: i('error'),
							timeout: 5_000
						});
						sideMenuEle?.postCreate(false);
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
					<div class="h-full w-full">
						<AssignmentGrid
							assignments={assignmentData.data.assignments}
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

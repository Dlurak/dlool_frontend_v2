<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, Clock, Trash, Pencil } from 'svelte-hero-icons';
	import Store from '../../utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { deleteAssignment } from '$lib/dlool/assignments/delete';
	import { createEventDispatcher } from 'svelte';
	import { svocal } from '$lib/utils/store/svocal';
	import { confirm } from '$lib/components/layout/confirmation';
	import { sendToast } from '$lib/components/layout/toasts';

	export let assignment: Assignment;
	export let school: string;

	const userDetails = svocal('dlool.ownUserDetails');

	$: hasEditRights = $userDetails?.classes.some(({ name, school: schoolObj }) => {
		const classMatches = assignment.class.name === name;
		const schoolMatches = school === schoolObj.name;

		return classMatches && schoolMatches;
	});

	const dispatch = createEventDispatcher<{
		delete: null;
	}>();
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<h3>{assignment.subject}</h3>

	<p>{assignment.description}</p>

	<div class="flex items-center gap-1 text-sm">
		<Icon src={Clock} class="h-4 w-4" micro />
		<Store
			store={i('assignments.assignment.date', {
				start: stringify(assignment.from),
				end: stringify(assignment.due)
			})}
		/>
	</div>

	{#if hasEditRights}
		<div class="flex w-full justify-evenly">
			<QuickAction
				icon={Trash}
				on:click={async () => {
					const isConfirmed = !(await confirm({
						desc: i('assignments.delete.desc'),
						ok: i('assignments.delete.ok')
					}));
					if (!isConfirmed) return;

					await deleteAssignment(assignment.id);

					sendToast({
						type: 'success',
						content: i('assignments.delete.success'),
						timeout: 5_000
					});
					dispatch('delete', null);
				}}
				small
				class="text-red-500"
			/>
			<QuickAction
				icon={Pencil}
				small
				class="text-blue-500"
				on:click={() => {
					console.log('not implemented yet');
				}}
			/>
		</div>
	{/if}
</div>

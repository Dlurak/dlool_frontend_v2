<script lang="ts">
	import type { Note } from '$lib/dlool/notes/list';
	import { deepEqual } from '$lib/utils/objects/deepEqual';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';

	export let note: Note;

	const userDetails = svocal('dlool.ownUserDetails');

	const { isLoggedIn } = useAuth();

	$: matchingClass = $userDetails?.classes.find((c) => deepEqual(note.class, c));
	$: matchingSchool = $userDetails?.classes.find(
		({ school }) => school.name === note.class.school.name
	);
	$: isMatchingUser = $userDetails?.username === note.creator.username;

	$: canEdit =
		($isLoggedIn &&
			(isMatchingUser ||
				(matchingClass && (note.editScope === 'School' || note.editScope === 'Class')) ||
				(matchingSchool && note.editScope === 'School'))) ??
		false;
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<a href={`/notes/${note.id}`} class="flex flex-col gap-2 text-black dark:text-white">
		<h3>{note.title}</h3>

		{#if note.summary}
			<p>{note.summary}</p>
		{:else}
			<p class="text-center italic text-gray-600 dark:text-gray-500">No summary provided</p>
		{/if}
	</a>

	{#if canEdit}
		<div class="w-full">
			<!-- Delete and edit... -->
		</div>
	{/if}
</div>

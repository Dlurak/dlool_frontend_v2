<script lang="ts">
	import { i } from '$lib/i18n/store';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { useAuth } from '$lib/utils/store/auth';
	import { animationLength } from '$lib/utils/store/animation';
	import { flip } from 'svelte/animate';
	import { derived, writable } from 'svelte/store';
	import { goto, invalidateAll } from '$app/navigation';
	import TagLabel from '$lib/components/tags/TagLabel.svelte';
	import DeleteButton from '$lib/components/tags/page/DeleteButton.svelte';
	import TagEditModal from '$lib/components/tags/page/TagEditModal.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import School from '$lib/components/input/School.svelte';
	import SingleClass from '$lib/components/input/SingleClass.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { PencilSquare } from 'svelte-hero-icons';
	import type { Tag } from '$lib/components/tags/types';
	import type { PageData } from './$types';
	import { svocalWithFallback } from '$lib/utils/store/svocal';

	export let data: PageData;

	const school = svocalWithFallback('filter.school', data.query.school ?? '');
	let className = data.query.class ?? '';

	let editing: (Tag & { id: string }) | null = null;

	const queryStore = writable({
		school: $school,
		classes: className ? [className] : []
	});
	$: queryStore.set({
		school: $school,
		classes: data.query.class ? [data.query.class] : []
	});

	const { isInClass, isLoggedIn } = useAuth({ query: queryStore });
	const hasEditRights = derived(
		[isInClass, isLoggedIn],
		([classMember, loggedIn]) => classMember && loggedIn
	);
</script>

<MetaData title={i('tags.title')} />

<Panes min={150} position={250}>
	<div slot="a" class="flex flex-col gap-3">
		<School bind:school={$school} />
		<SingleClass school={$school} bind:selectedClass={className} />
		<PrimaryButton
			on:click={() => {
				goto(
					`?${objToQueryParams({
						school,
						class: className
					})}`
				).then(invalidateAll);
			}}
		>
			<Store store={i('assignments.filter.apply')} />
		</PrimaryButton>
	</div>

	<div slot="b" class="grid grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))] gap-2">
		{#each data.data ?? [] as tag (tag.id)}
			<div
				animate:flip={{ duration: $animationLength * 2 }}
				class="flex items-center justify-between rounded px-2 py-1 outline outline-1 outline-zinc-400 dark:outline-zinc-700"
			>
				<TagLabel {tag} />
				{#if $hasEditRights}
					<span class="flex gap-1">
						<QuickAction icon={PencilSquare} color="blue" on:click={() => (editing = tag)} />
						<DeleteButton {tag} />
					</span>
				{/if}
			</div>
		{:else}
			<Store store={i('tags.page.noTags')} />
		{/each}
	</div>
</Panes>

<TagEditModal
	{editing}
	on:close={() => (editing = null)}
	on:edit={() => {
		editing = null;
		invalidateAll();
	}}
/>

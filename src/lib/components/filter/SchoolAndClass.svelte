<script lang="ts">
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import Collapseable from '$lib/components/utils/Collapseable.svelte';
	import School from '../input/School.svelte';
	import Classes from '../input/Classes.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { svocalWithFallback } from '$lib/utils/store/svocal';

	type Query<S> = {
		school: string | S;
		classes: string[];
	};

	type DispatchData = {
		school: string;
		classes: string[];
		emittedBy: 'auto' | 'user';
	};

	export let query: Query<null>;

	const school = svocalWithFallback('filter.school', query.school);
	const classes = svocalWithFallback('filter.classes', query.classes);

	onMount(() => {
		dispatch('change', { school: $school ?? '', classes: $classes ?? [], emittedBy: 'auto' });
	});

	const dispatch = createEventDispatcher<{
		change: DispatchData;
	}>();
</script>

<Collapseable id="school-class-filter">
	<h3 class="pb-3 pt-2" slot="heading"><Store store={i('filter.filter')} /></h3>

	<div class="flex flex-col gap-3" slot="content">
		<School bind:school={$school} />
		<Classes school={$school} bind:classes={$classes} />

		<slot />

		<PrimaryButton
			disabled={!($school && $classes.length >= 1)}
			on:click={() => {
				dispatch('change', { school: $school ?? '', classes: $classes ?? [], emittedBy: 'user' });
			}}
		>
			<Store store={i('assignments.filter.apply')} />
		</PrimaryButton>
	</div>
</Collapseable>

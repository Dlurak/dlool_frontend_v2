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

	export let query: Query<null>;

	const school = svocalWithFallback('filter.school', query.school);
	const classes = svocalWithFallback('filter.classes', query.classes);

	onMount(() => {
		dispatch('change', { school: $school ?? '', classes: $classes ?? [] });
	});

	const dispatch = createEventDispatcher<{
		change: Query<string>;
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
				dispatch('change', { school: $school ?? '', classes: $classes ?? [] });
			}}
		>
			<Store store={i('assignments.filter.apply')} />
		</PrimaryButton>
	</div>
</Collapseable>

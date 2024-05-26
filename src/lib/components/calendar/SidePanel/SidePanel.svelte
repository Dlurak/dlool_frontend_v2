<script lang="ts">
	import Filter from '$lib/components/filter/SchoolAndClass.svelte';
	import { useAuth } from '$lib/utils/store/auth';
	import New from './New.svelte';

	export let query: {
		school: string | null;
		classes: string[];
	} = {
		school: null,
		classes: []
	};

	const { isInClass, isLoggedIn } = useAuth({ query });
</script>

<div class="flex flex-col gap-4">
	<Filter on:change {query} />

	{#if $isInClass && $isLoggedIn && query?.school}
		<New
			query={{
				school: query.school,
				classes: query.classes
			}}
		/>
	{/if}
</div>

<script lang="ts">
	import Filter from '$lib/components/filter/SchoolAndClass.svelte';

	export let query: {
		school: string | null;
		classes: string[];
	} = {
		school: null,
		classes: []
	};
</script>

<Filter on:change {query} />
